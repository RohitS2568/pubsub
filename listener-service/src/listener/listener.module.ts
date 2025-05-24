import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListenerService } from './listener.service';
import { ExtendedRecord, ExtendedRecordSchema } from './entities/extended-record.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: ExtendedRecord.name, schema: ExtendedRecordSchema },
    ]),
  ],
  providers: [ListenerService],
})
export class ListenerModule {}