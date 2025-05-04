import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';
import { Record, RecordSchema } from './entities/record.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Record.name, schema: RecordSchema },
    ]),
  ],
  controllers: [ReceiverController],
  providers: [ReceiverService],
})
export class ReceiverModule {}