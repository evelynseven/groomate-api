import { Test, TestingModule } from '@nestjs/testing';
import { AddOnServicesService } from '../addOnServices.service';
import { AddOn } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

const mockAddOnService = {
  id: '123addOnService',
  name: 'Nail Grinding',
  nameAbbrev: 'NG',
  price: 30,
  remarks: 'test remarks',
} as AddOn;
const mockId = '123addOnService';
const mockPrismaService = {
  create: jest.fn(),
  findMany: jest.fn(),
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('AddOnServicesService', () => {
  let service: AddOnServicesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddOnServicesService,
        {
          provide: PrismaService,
          useValue: {
            addOn: mockPrismaService,
          },
        },
      ],
    }).compile();

    service = module.get<AddOnServicesService>(AddOnServicesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new addOnService', async () => {
    jest
      .spyOn(prismaService.addOn, 'create')
      .mockResolvedValue(mockAddOnService);
    const result = await service.create(mockAddOnService);
    expect(result).toEqual(mockAddOnService);
  });

  it('should find all addOnServices', async () => {
    jest
      .spyOn(prismaService.addOn, 'findMany')
      .mockResolvedValue([mockAddOnService]);
    const result = await service.findAll();
    expect(result).toEqual([mockAddOnService]);
  });

  it('should find one addOnService', async () => {
    jest
      .spyOn(prismaService.addOn, 'findFirst')
      .mockResolvedValue(mockAddOnService);
    const result = await service.findOne(mockId);
    expect(result).toEqual(mockAddOnService);
  });

  it('should update addOnService', async () => {
    jest
      .spyOn(prismaService.addOn, 'findUnique')
      .mockResolvedValue(mockAddOnService);
    jest
      .spyOn(prismaService.addOn, 'update')
      .mockResolvedValue(mockAddOnService);
    const result = await service.update(mockId, mockAddOnService);
    expect(result).toEqual(mockAddOnService);
  });

  it('should remove addOnService', async () => {
    jest
      .spyOn(prismaService.addOn, 'findUnique')
      .mockResolvedValue(mockAddOnService);
    jest.spyOn(prismaService.addOn, 'delete').mockResolvedValue(null);
    await expect(service.remove('123addOnService')).resolves.not.toThrow();
  });

  it('should throw ForbiddenException when updating non-existing addOnService', async () => {
    jest.spyOn(prismaService.addOn, 'findUnique').mockResolvedValue(null);
    await expect(service.update('1', mockAddOnService)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw ForbiddenException when removing non-existing addOnService', async () => {
    jest.spyOn(prismaService.addOn, 'findUnique').mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow(ForbiddenException);
  });
});
