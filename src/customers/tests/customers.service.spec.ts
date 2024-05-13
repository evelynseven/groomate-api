import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../customers.service';
import { Customer } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

const mockCustomer = {
  id: '123customer',
  firstName: 'Evelyn',
  lastName: 'Sun',
  email: 'evelynsun166@gmail.com',
  phoneNumber: '4373407590',
  remarks: 'test remarks',
} as Customer;
const mockId = '123customer';
const mockPrismaService = {
  create: jest.fn(),
  findMany: jest.fn(),
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CustomersService', () => {
  let service: CustomersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: PrismaService,
          useValue: {
            customer: mockPrismaService,
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new customer', async () => {
    jest
      .spyOn(prismaService.customer, 'create')
      .mockResolvedValue(mockCustomer);
    const result = await service.create(mockCustomer);
    expect(result).toEqual(mockCustomer);
  });

  it('should find all customers', async () => {
    jest
      .spyOn(prismaService.customer, 'findMany')
      .mockResolvedValue([mockCustomer]);
    const result = await service.findAll();
    expect(result).toEqual([mockCustomer]);
  });

  it('should find one customer', async () => {
    jest
      .spyOn(prismaService.customer, 'findFirst')
      .mockResolvedValue(mockCustomer);
    const result = await service.findOne(mockId);
    expect(result).toEqual(mockCustomer);
  });

  it('should update customer', async () => {
    jest
      .spyOn(prismaService.customer, 'findUnique')
      .mockResolvedValue(mockCustomer);
    jest
      .spyOn(prismaService.customer, 'update')
      .mockResolvedValue(mockCustomer);
    const result = await service.update(mockId, mockCustomer);
    expect(result).toEqual(mockCustomer);
  });

  it('should remove customer', async () => {
    jest
      .spyOn(prismaService.customer, 'findUnique')
      .mockResolvedValue(mockCustomer);
    jest.spyOn(prismaService.customer, 'delete').mockResolvedValue(null);
    await expect(service.remove('123customer')).resolves.not.toThrow();
  });

  it('should throw ForbiddenException when updating non-existing customer', async () => {
    jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(null);
    await expect(service.update('1', mockCustomer)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw ForbiddenException when removing non-existing customer', async () => {
    jest.spyOn(prismaService.customer, 'findUnique').mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow(ForbiddenException);
  });
});
