export class CreateCatDto {
  id: number;
  name: string;
  age: number;
  breed: string;
}
export class Cats {
  name: string;
  private listCat: ICatProp[] = [
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
  updateCat(idCat: number): ICatProp {
    const cat = this.listCat.find((cat) => cat.id === idCat);
    return cat;
  }
}
export class ListAllEntities {
  type: string;
  number: number;
  color: string;
  limit: number;
}
export class updateCatDto {
  name: string;
  updateCat(): void {
    console.log('Update cat');
  }
}
export interface ICatProp {
  id: number;
  name: string;
  age: number;
  breed: string;
}
