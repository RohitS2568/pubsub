import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';
import { createClient } from 'redis';

@Injectable()
export class ReceiverService {
  private redisClient;

  constructor(
    @InjectModel(Record.name) private recordModel: Model<Record>,
    private configService: ConfigService,
  ) {
    this.initializeRedisClient();
  }

  private async initializeRedisClient() {
    const redisHost = this.configService.get<string>('redis.host');
    const redisPort = this.configService.get<number>('redis.port');

    this.redisClient = createClient({
      url: `redis://${redisHost}:${redisPort}`,
      username: '',
      password: ''
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis client error', err);
    });

    await this.redisClient.connect();
  }

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    // Generate a new UUID
    const id = uuidv4();
    const inserted_at = new Date();

    // Create the record with all fields
    const newRecord = new this.recordModel({
      id,
      ...createRecordDto,
      inserted_at,
    });

    // Save the record to the database
    const savedRecord = await newRecord.save();

    // Publish the event to Redis
    await this.publishEvent(savedRecord);

    return savedRecord;
  }

  private async publishEvent(record: Record) {
    try {
      await this.redisClient.publish(
        'record-created',
        JSON.stringify({
          id: record.id,
          user: record.user,
          class: record.class,
          age: record.age,
          email: record.email,
          inserted_at: record.inserted_at,
        }),
      );
      console.log(`Published event for record: ${record.id} ${record.user} ${record.class} ${record.age} ${record.email} ${record.inserted_at}`);
    } catch (error) {
      console.error('Error publishing event:', error);
    }
  }
}