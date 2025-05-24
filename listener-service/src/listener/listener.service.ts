import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { ExtendedRecord } from './entities/extended-record.entity';
import { Record } from './interfaces/record.interface';
import { createClient } from 'redis';

@Injectable()
export class ListenerService implements OnModuleInit {
  private redisClient;

  constructor(
    @InjectModel(ExtendedRecord.name) private extendedRecordModel: Model<ExtendedRecord>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.initializeRedisClient();
    await this.subscribeToEvents();
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

  private async subscribeToEvents() {
    const subscriber = this.redisClient.duplicate();
    await subscriber.connect();

    await subscriber.subscribe('record-created', (message) => {
      try {
        const recordData = JSON.parse(message);
        this.processRecord(recordData);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    console.log('Subscribed to record-created events');
  }

  private async processRecord(recordData: Record) {
    try {
      // Convert the current time to ISO string with timezone
      const modified_at = new Date().toISOString();
      
      // Create the extended record with all fields including modified_at
      const extendedRecord = new this.extendedRecordModel({
        ...recordData,
        modified_at,
      });

      // Save the extended record to the database
      await extendedRecord.save();
      
      // console.log(`Successfully processed record: ${recordData.id}`);
      // console.log(`Original inserted_at: ${recordData.inserted_at}`);
      // console.log(`New modified_at: ${modified_at}`);
    } catch (error) {
      // console.error('Error processing record:', error);
      // console.error('Record data:', JSON.stringify(recordData, null, 2));
      throw error; // Re-throw to ensure the error is properly logged
    }
  }
}