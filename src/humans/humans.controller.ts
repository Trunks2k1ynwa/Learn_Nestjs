import { Body, Controller, Get, Post } from '@nestjs/common';
import { Humans } from 'src/humans/interfaces/human.interface';
import { HumansService } from 'src/humans/human.service';
import { HumanDto } from './dto/humans.dto';
import { CatsService } from './../cats/cat.service';

@Controller('humans')
export class HumansController {
  constructor(
    private humansService: HumansService,
    protected catsService: CatsService,
  ) {}

  @Post()
  async create(@Body() humanDto: HumanDto) {
    this.humansService.createHuman(humanDto);
    console.log(this.catsService.findAllCat());
    return 'Add human successfully';
  }

  @Get()
  async findAll(): Promise<Humans[]> {
    return this.humansService.findAllHuman();
  }
}
