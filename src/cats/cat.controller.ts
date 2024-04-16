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
import { CreateCatDto } from './dto/createCat.dto';
import { Response } from 'express';
import { CatsService } from './cat.service';
import { Roles } from 'src/roles.decorator';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/utils/constants';
import { ListAllEntities } from './dto/utils';
import { Cats } from 'src/entities/cat.entity';
@Controller('api/v1/cats')
@Public()
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(
    private catsService: CatsService,

    private configService: ConfigService,
  ) {}
  @ApiTags('Cats')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiOperation({ description: 'You will never walk alone' })
  @Get('test-env')
  getEnvCat() {
    const test_env = this.configService.get<string>('cat.test_env');
    const cat_port = this.configService.get<number>('cat.port_cat');
    if (!test_env && !cat_port) return 'Not find value from env file';
    return {
      env: test_env,
      port: cat_port,
    };
  }

  @ApiTags('Cats')
  @Post('test-dto')
  async create(@Body() catProps: CreateCatDto) {
    return `This action adds a new cat ${catProps.number}`;
  }

  @ApiTags('Cats')
  @Get('test-query')
  findAll(
    @Query() query: ListAllEntities,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.setHeader('X-Custom-Header', 'Hello, NestJS!');
    res.cookie('myCookie', 'NestJS is awesome!');
    return { message: 'Response modified successfully.' };
  }

  @ApiTags('Cats')
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.CREATED).send('Create cat successfully');
    return `This action get will returns a id=${id} cat`;
  }
  @ApiTags('Cats')
  @Get('get-all-cats')
  findAllCat() {
    console.log('config', this.configService.get<string>('database.host'));
    return this.catsService.findAllCat();
  }
  @ApiTags('Cats')
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

  @ApiTags('Cats')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a id=${id} cat`;
  }
  //CRUD
  @ApiTags('Cats')
  @Post('create-cat')
  @ApiCreatedResponse({
    type: Cats,
  })
  createCat(@Body() catProp: CreateCatDto): Cats {
    return this.catsService.createCat(catProp);
  }
}
