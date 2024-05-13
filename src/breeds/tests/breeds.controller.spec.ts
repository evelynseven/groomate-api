import { Test, TestingModule } from '@nestjs/testing';
import { BreedsController } from '../breeds.controller';
import { BreedsService } from '../breeds.service';
import { BreedType } from '@prisma/client';

const mockId = '123breed';
const mockBreed = {
  id: '123breed',
  name: 'Husky',
  type: BreedType.DOG,
  coefficient: 1,
  remarks: 'test remarks',
};

const mockBreedService = {
  create: jest.fn().mockReturnValue(mockBreed),
  findAll: jest.fn().mockReturnValue([mockBreed]),
  findOne: jest.fn().mockReturnValue(mockBreed),
  update: jest.fn().mockReturnValue(mockBreed),
  remove: jest.fn(),
};

describe('BreedsController', () => {
  let controller: BreedsController;
  let service: BreedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreedsController],
      providers: [
        {
          provide: BreedsService,
          useValue: mockBreedService,
        },
      ],
    }).compile();

    controller = module.get<BreedsController>(BreedsController);
    service = module.get<BreedsService>(BreedsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create breed data', async () => {
    const expectedOutput = await controller.create(mockBreed);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockBreed);
    expect(expectedOutput).toEqual(mockBreed);
  });

  it('should find all breed data', async () => {
    const expectedOutput = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual([mockBreed]);
  });

  it('should find breed data by id', async () => {
    const expectedOutput = await controller.findOne(mockId);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockBreed);
  });

  it('should update breed data by id and payload', async () => {
    const expectedOutput = await controller.update(mockId, mockBreed);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(mockId, mockBreed);
    expect(expectedOutput).toEqual(mockBreed);
  });

  it('should delete breed data by id', async () => {
    await controller.remove(mockId);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(mockId);
  });
});
