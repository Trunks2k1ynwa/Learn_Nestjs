export class CreateCatDto {
  id: number;
  name: string;
  age: number;
  breed: string;
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
