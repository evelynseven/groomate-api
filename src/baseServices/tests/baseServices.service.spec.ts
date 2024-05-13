import { Test, TestingModule } from '@nestjs/testing';
import { BaseServicesService } from '../baseServices.service';
import { Service } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

const mockBaseService = {
  id: '123baseService',
  name: 'Bath and Brush',
  nameAbbrev: 'B&B',
  basePrice: 30,
  remarks: 'test remarks',
} as Service;
const mockId = '123baseService';
const mockPrismaService = {
  create: jest.fn(),
  findMany: jest.fn(),
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('BaseServicesService', () => {
  let service: BaseServicesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseServicesService,
        {
          provide: PrismaService,
          useValue: {
            service: mockPrismaService,
          },
        },
      ],
    }).compile();

    service = module.get<BaseServicesService>(BaseServicesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new baseService', async () => {
    jest
      .spyOn(prismaService.service, 'create')
      .mockResolvedValue(mockBaseService);
    const result = await service.create(mockBaseService);
    expect(result).toEqual(mockBaseService);
  });

  it('should find all baseServices', async () => {
    jest
      .spyOn(prismaService.service, 'findMany')
      .mockResolvedValue([mockBaseService]);
    const result = await service.findAll();
    expect(result).toEqual([mockBaseService]);
  });

  it('should find one baseService', async () => {
    jest
      .spyOn(prismaService.service, 'findFirst')
      .mockResolvedValue(mockBaseService);
    const result = await service.findOne(mockId);
    expect(result).toEqual(mockBaseService);
  });

  it('should update baseService', async () => {
    jest
      .spyOn(prismaService.service, 'findUnique')
      .mockResolvedValue(mockBaseService);
    jest
      .spyOn(prismaService.service, 'update')
      .mockResolvedValue(mockBaseService);
    const result = await service.update(mockId, mockBaseService);
    expect(result).toEqual(mockBaseService);
  });

  it('should remove baseService', async () => {
    jest
      .spyOn(prismaService.service, 'findUnique')
      .mockResolvedValue(mockBaseService);
    jest.spyOn(prismaService.service, 'delete').mockResolvedValue(null);
    await expect(service.remove('123baseService')).resolves.not.toThrow();
  });

  it('should throw ForbiddenException when updating non-existing baseService', async () => {
    jest.spyOn(prismaService.service, 'findUnique').mockResolvedValue(null);
    await expect(service.update('1', mockBaseService)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw ForbiddenException when removing non-existing baseService', async () => {
    jest.spyOn(prismaService.service, 'findUnique').mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow(ForbiddenException);
  });
});
