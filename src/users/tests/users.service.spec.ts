import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { Role } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

const mockUser = {
  id: '123user',
  firstName: 'Evelyn',
  lastName: 'Sun',
  email: 'evelynsun166@gmail.com',
  phoneNumber: '4373407590',
  password: 'testpassword123',
  fullName: 'Evelyn Sun',
  role: Role.MANAGER,
  createdAt: new Date(),
  updatedAt: new Date(),
  hash: 'testpassword123hashed',
  isActive: true,
  address: 'test address',
  remarks: 'test remarks',
};
const mockId = '123user';
const mockPrismaService = {
  create: jest.fn(),
  findMany: jest.fn(),
  findFirst: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: mockPrismaService,
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create new user', async () => {
    jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);
    const result = await service.create(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should find all users', async () => {
    jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([mockUser]);
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('should find one user', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);
    const result = await service.findOne(mockId);
    expect(result).toEqual(mockUser);
  });

  it('should update user', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
    jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);
    const result = await service.update(mockId, mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should remove user', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
    jest.spyOn(prismaService.user, 'delete').mockResolvedValue(null);
    await expect(service.remove('123user')).resolves.not.toThrow();
  });

  it('should throw ForbiddenException when updating non-existing user', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    await expect(service.update('1', mockUser)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should throw ForbiddenException when removing non-existing user', async () => {
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
    await expect(service.remove('1')).rejects.toThrow(ForbiddenException);
  });
});
