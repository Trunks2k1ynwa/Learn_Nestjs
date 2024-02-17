import { Test, TestingModule } from '@nestjs/testing';
import { HumansController } from './humans.controller';

describe('HumansController', () => {
  let controller: HumansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HumansController],
    }).compile();

    controller = module.get<HumansController>(HumansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
