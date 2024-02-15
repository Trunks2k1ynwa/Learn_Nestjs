import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import {
  Cats,
  CreateCatDto,
  ListAllEntities,
  updateCatDto,
} from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get('get-cats')
  findAllCat(): Observable<string[]> {
    return of(['cat black', 'cat white']);
  }
  @Post('test-dto')
  async create(@Body() catProps: CreateCatDto) {
    return `This action adds a new cat ${catProps.age}`;
  }
  @Get('test-query')
  findAll(@Query() query: ListAllEntities): string {
    return `This action returns all cat(limit: ${query.limit}) items`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action get will returns a id=${id} cat`;
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: Cats) {
    const listCat = new Cats();
    return {
      title: `This action updates a id=${id} cat with name ${updateCatDto.name}`,
      content: listCat.updateCat(parseInt(id)),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a id=${id} cat`;
  }
}
