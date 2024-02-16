import { Injectable } from '@nestjs/common';
import { ICatProp } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
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
  updateCat(idCat: number) {
    const cat = this.listCat.find((cat) => cat.id === idCat);
    return cat;
  }
  findAllCat(): ICatProp[] {
    return this.listCat;
  }
}
