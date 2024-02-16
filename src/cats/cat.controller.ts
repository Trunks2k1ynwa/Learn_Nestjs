import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto, ListAllEntities } from './dto/create-cat.dto';
import { Response } from 'express';
import { CatsService } from './cat.service';
import { ForbiddenException } from 'src/forbidden.exception';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('get-cats')
  findAllCat(): Observable<string[]> {
    try {
      return of(['cat black', 'cat white']);
    } catch (error) {
      throw new ForbiddenException();
    }
  }
  @Post('test-dto')
  async create(@Body() catProps: CreateCatDto) {
    return `This action adds a new cat ${catProps.age}`;
  }
  @Get('test-query')
  findAll(
    @Query() query: ListAllEntities,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.setHeader('X-Custom-Header', 'Hello, NestJS!');
    res.cookie('myCookie', 'NestJS is awesome!');
    // res.status(HttpStatus.OK).json({
    //   data: ['cat1', 'cat2'],
    //   title: 'Data response successfully',
    // });
    return { message: 'Response modified successfully.' };
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.CREATED).send('Create cat successfully');
    return `This action get will returns a id=${id} cat`;
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
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
}
