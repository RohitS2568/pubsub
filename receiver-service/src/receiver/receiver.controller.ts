import { 
  Controller, 
  Post, 
  Body, 
  HttpStatus, 
  HttpCode 
} from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { CreateRecordDto } from './dto/create-record.dto';

@Controller('receiver')
export class ReceiverController {
  constructor(private readonly receiverService: ReceiverService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRecordDto: CreateRecordDto) {
    const record = await this.receiverService.create(createRecordDto);
    return {
      message: 'Record created successfully',
      id: record.id,
    };
  }
}