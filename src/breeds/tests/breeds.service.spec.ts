import { Test, TestingModule } from '@nestjs/testing';
import { BreedsService } from '../breeds.service';
import { Breed } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

const mockBreed = {
  id: '123breed',
  name: 'Husky',
  remarks: 'test remarks',
} as Breed;
const mockId = '123breed';
const mockPrismaService = {
  create: jest.fn(),
  findMany: jest.fn(),
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('BreedsService', () => {
  let service: BreedsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BreedsService,
        {
          provide: PrismaService,
          useValue: {
            breed: mockPrismaService,
          },
        },
      ],
    }).compile();

    service = module.get<BreedsService>(BreedsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new breed', async () => {
    jest.spyOn(prismaService.breed, 'create').mockResolvedValue(mockBreed);
    const result = await service.create(mockBreed);
    expect(result).toEqual(mockBreed);
  });

  it('should find all breeds', async () => {
    jest.spyOn(prismaService.breed, 'findMany').mockResolvedValue([mockBreed]);
    const result = await service.findAll();
    expect(result).toEqual([mockBreed]);
  });

  it('should find one breed', async () => {
    jest.spyOn(prismaService.breed, 'findFirst').mockResolvedValue(mockBreed);
    const result = await service.findOne(mockId);
    expect(result).toEqual(mockBreed);
  });

  it('should update breed', async () => {
    jest.spyOn(prismaService.breed, 'findUnique').mockResolvedValue(mockBreed);
    jest.spyOn(prismaService.breed, 'update').mockResolvedValue(mockBreed);
    const result = await service.update(mockId, mockBreed);
    expect(result).toEqual(mockBreed);
  });

  it('should remove breed', async () => {
    jest.spyOn(prismaService.breed, 'findUnique').mockResolvedValue(mockBreed);
    jest.spyOn(prismaService.breed, 'delete').mockResolvedValue(null);
    await expect(service.remove('123breed')).resolves.not.toThrow();
  });

  it('should throw ForbiddenException when updating non-existing breed', async () => {
    jest.spyOn(prismaService.breed, 'findUnique').mockResolvedValue(null);
    await expect(service.update('1', mockBreed)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw ForbiddenException when removing non-existing breed', async () => {
    jest.spyOn(prismaService.breed, 'findUnique').mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow(ForbiddenException);
  });
});
