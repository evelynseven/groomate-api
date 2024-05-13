import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { BaseServicesController } from '../baseServices.controller';
import { BaseServicesService } from '../baseServices.service';

const mockId = '123baseService';
const mockBaseService = {
  id: '123baseService',
  name: 'Bath and Brush',
  nameAbbrev: 'B&B',
  basePrice: 30,
  remarks: 'test remarks',
};

const mockBaseServiceService = {
  create: jest.fn().mockReturnValue(mockBaseService),
  findAll: jest.fn().mockReturnValue([mockBaseService]),
  findOne: jest.fn().mockReturnValue(mockBaseService),
  update: jest.fn().mockReturnValue(mockBaseService),
  remove: jest.fn(),
};

describe('BaseServicesController', () => {
  let controller: BaseServicesController;
  let service: BaseServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [BaseServicesController],
      providers: [
        {
          provide: BaseServicesService,
          useValue: mockBaseServiceService,
        },
      ],
    }).compile();

    controller = module.get<BaseServicesController>(BaseServicesController);
    service = module.get<BaseServicesService>(BaseServicesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create baseService data', async () => {
    const expectedOutput = await controller.create(mockBaseService);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockBaseService);
    expect(expectedOutput).toEqual(mockBaseService);
  });

  it('should find all baseService data', async () => {
    const expectedOutput = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual([mockBaseService]);
  });

  it('should find baseService data by id', async () => {
    const expectedOutput = await controller.findOne(mockId);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockBaseService);
  });

  it('should update baseService data by id and payload', async () => {
    const expectedOutput = await controller.update(mockId, mockBaseService);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(mockId, mockBaseService);
    expect(expectedOutput).toEqual(mockBaseService);
  });

  it('should delete baseService data by id', async () => {
    await controller.remove(mockId);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(mockId);
  });
});
