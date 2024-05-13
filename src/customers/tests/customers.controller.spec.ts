import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';

const mockId = '123customer';
const mockCustomer = {
  id: '123customer',
  firstName: 'Evelyn',
  lastName: 'Sun',
  email: 'evelynsun166@gmail.com',
  phoneNumber: '4373407590',
  remarks: 'test remarks',
};

const mockCustomerService = {
  create: jest.fn().mockReturnValue(mockCustomer),
  findAll: jest.fn().mockReturnValue([mockCustomer]),
  findOne: jest.fn().mockReturnValue(mockCustomer),
  update: jest.fn().mockReturnValue(mockCustomer),
  remove: jest.fn(),
};

describe('CustomersController', () => {
  let controller: CustomersController;
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<CustomersService>(CustomersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create customer data', async () => {
    const expectedOutput = await controller.create(mockCustomer);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockCustomer);
    expect(expectedOutput).toEqual(mockCustomer);
  });

  it('should find all customer data', async () => {
    const expectedOutput = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual([mockCustomer]);
  });

  it('should find customer data by id', async () => {
    const expectedOutput = await controller.findOne(mockId);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockCustomer);
  });

  it('should update customer data by id and payload', async () => {
    const expectedOutput = await controller.update(mockId, mockCustomer);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(mockId, mockCustomer);
    expect(expectedOutput).toEqual(mockCustomer);
  });

  it('should delete customer data by id', async () => {
    await controller.remove(mockId);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(mockId);
  });
});
