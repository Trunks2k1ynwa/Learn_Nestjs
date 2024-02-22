import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto, ListAllEntities } from './dto/create-cat.dto';
import { Response } from 'express';
import { CatsService } from './cat.service';
import { Roles } from 'src/roles.decorator';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from 'src/entities/cat.entity';
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(
    private catsService: CatsService,
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
  ) {}

  @Get('get-all-cats')
  async findAllCat() {
    return await this.catsRepository.find();
  }
  @Post('test-dto')
  async create(@Body() catProps: CreateCatDto) {
    return `This action adds a new cat ${catProps.number}`;
  }
  @Get('test-query')
  findAll(
    @Query() query: ListAllEntities,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.setHeader('X-Custom-Header', 'Hello, NestJS!');
    res.cookie('myCookie', 'NestJS is awesome!');
    return { message: 'Response modified successfully.' };
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.CREATED).send('Create cat successfully');
    return `This action get will returns a id=${id} cat`;
  }
  @Put(':id')
  @Roles(['admin'])
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateCatDto: CreateCatDto,
  ) {
    return {
      title: `This action updates a id=${id} cat with name ${updateCatDto.name}`,
      content: this.catsService.updateCat(id),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a id=${id} cat`;
  }
  //CRUD
  @Post('create-cat')
  createCat(@Body() catProp: CreateCatDto) {
    return this.catsService.createCat(catProp);
  }
}
