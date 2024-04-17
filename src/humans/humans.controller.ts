import { Body, Controller, Get, Post } from '@nestjs/common';
import { Humans } from 'src/humans/interfaces/human.interface';
import { HumansService } from 'src/humans/human.service';
import { HumanDto } from './dto/humans.dto';
import { CatsService } from './../cats/cat.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('humans')
export class HumansController {
  constructor(
    // @InjectRepository(User)
    private humansService: HumansService,
    protected catsService: CatsService,
    // private usersRepository: Repository<User>,
  ) {}
  @ApiTags('Humans')
  @Post()
  async create(@Body() humanDto: HumanDto) {
    this.humansService.createHuman(humanDto);
    return 'Add human successfully';
  }
  @ApiTags('Humans')
  @Get('get-all')
  async findAll(): Promise<Humans[]> {
    return this.humansService.findAllHuman();
  }
  // @Get('users')
  // findAllUsers(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }
  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
