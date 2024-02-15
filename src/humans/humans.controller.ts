import { Body, Controller, Get, Post } from '@nestjs/common';
import { Humans } from 'src/interfaces/human.interface';
import { HumansService } from 'src/services/human.service';
import { HumanDto } from './humans.dto';

@Controller('humans')
export class HumansController {
  constructor(private humansService: HumansService) {}

  @Post()
  async create(@Body() humanDto: HumanDto) {
    this.humansService.createHuman(humanDto);
  }

  @Get()
  async findAll(): Promise<Humans[]> {
    return this.humansService.findAllHuman();
  }
}
