import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCatDto, ICatProp } from './dto/create-cat.dto';
import { CommonService } from 'src/common/common.service';
import { LazyModuleLoader } from '@nestjs/core';
import { HumansController } from 'src/humans/humans.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cats } from 'src/entities/cat.entity';
@Injectable()
export class CatsService {
  private service: HumansController;
  protected readonly listCat: ICatProp[] = [
    {
      id: 22324,
      name: 'Tiger',
      age: 3,
      breed: 'red',
    },
    { id: 24324, name: 'Cats Pink', age: 2, breed: 'Pink' },
    { id: 24345, name: 'Frog', age: 5, breed: 'green' },
    { id: 23024, name: 'Pig', age: 2, breed: 'blue' },
  ];
  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
    private lazyModuleLoader: LazyModuleLoader,
    @InjectRepository(Cats)
    private catsRepository: Repository<Cats>,
  ) {}

  updateCat(idCat: number) {
    const cat = this.listCat.find((cat) => cat.id === idCat);
    this.commonService.testFuncton();
    return cat;
  }
  findAllCat(): ICatProp[] {
    return this.listCat;
  }
  //CRUD
  createCat(cat: CreateCatDto) {
    this.catsRepository.create(cat);
  }
}
