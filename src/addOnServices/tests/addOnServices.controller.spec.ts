import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';
import { AddOnServicesController } from '../addOnServices.controller';
import { AddOnServicesService } from '../addOnServices.service';

const mockId = '123addOnService';
const mockAddOnService = {
  id: '123addOnService',
  name: 'Nail Grinding',
  nameAbbrev: 'NG',
  price: 30,
  remarks: 'test remarks',
};

const mockAddOnServiceService = {
  create: jest.fn().mockReturnValue(mockAddOnService),
  findAll: jest.fn().mockReturnValue([mockAddOnService]),
  findOne: jest.fn().mockReturnValue(mockAddOnService),
  update: jest.fn().mockReturnValue(mockAddOnService),
  remove: jest.fn(),
};

describe('AddOnServicesController', () => {
  let controller: AddOnServicesController;
  let service: AddOnServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [AddOnServicesController],
      providers: [
        {
          provide: AddOnServicesService,
          useValue: mockAddOnServiceService,
        },
      ],
    }).compile();

    controller = module.get<AddOnServicesController>(AddOnServicesController);
    service = module.get<AddOnServicesService>(AddOnServicesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create addOnService data', async () => {
    const expectedOutput = await controller.create(mockAddOnService);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockAddOnService);
    expect(expectedOutput).toEqual(mockAddOnService);
  });

  it('should find all addOnService data', async () => {
    const expectedOutput = await controller.findAll();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual([mockAddOnService]);
  });

  it('should find addOnService data by id', async () => {
    const expectedOutput = await controller.findOne(mockId);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(mockId);
    expect(expectedOutput).toEqual(mockAddOnService);
  });

  it('should update addOnService data by id and payload', async () => {
    const expectedOutput = await controller.update(mockId, mockAddOnService);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(mockId, mockAddOnService);
    expect(expectedOutput).toEqual(mockAddOnService);
  });

  it('should delete addOnService data by id', async () => {
    await controller.remove(mockId);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(mockId);
  });
});
