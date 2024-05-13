import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Role } from '@prisma/client';

const mockId = '123user';
const mockUser = {
  id: '123user',
  firstName: 'Evelyn',
  lastName: 'Sun',
  email: 'evelynsun166@gmail.com',
  phoneNumber: '4373407590',
  fullName: 'Evelyn Sun',
  password: 'testpassword123',
  role: Role.MANAGER,
  address: 'test address',
  remarks: 'test remarks',
};

const mockUserService = {
  create: jest.fn().mockReturnValue(mockUser),
  findAll: jest.fn().mockReturnValue([mockUser]),
  findOne: jest.fn().mockReturnValue(mockUser),
  update: jest.fn().mockReturnValue(mockUser),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create user data', async () => {
    const expectedOutput = await controller.create(mockUser);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockUser);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should find all user data', async () => {
    const expectedOutput = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual([mockUser]);
  });

  it('should find user data by id', async () => {
    const expectedOutput = await controller.findOne(mockId);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should update user data by id and payload', async () => {
    const expectedOutput = await controller.update(mockId, mockUser);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(mockId, mockUser);
    expect(expectedOutput).toEqual(mockUser);
  });

  it('should delete user data by id', async () => {
    await controller.remove(mockId);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(mockId);
  });
});
