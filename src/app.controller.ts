import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getName(): number {
    return this.appService.getAge();
  }
  getHello(): string {
    return this.appService.getHello();
  }
}
@Controller('test')
export class testController {
  @Get('docs')
  @Header('catch-header', 'no value header')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    } else {
      return 'method get and no redirect';
    }
  }
  ////////
  @Get(':userId')
  getUsersId(@Param() param: { userId: number }): string {
    console.log('userId', param.userId);
    return `user Id is: ${param.userId}`;
  }

  ///////
  @Delete('delete')
  deleteCat(): void {
    console.log('route for delete cat');
  }
  //////
  @Post('post')
  @HttpCode(300)
  postCat(): void {
    console.log('post for catf');
  }
}
