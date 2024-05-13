import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AddOnServicesModule } from '../addOnServices.module';
import { AddOnServicesService } from '../addOnServices.service';

const mockAddOnService = {
  id: '123addOnService',
  name: 'Nail Grinding',
  nameAbbrev: 'NG',
  price: 30,
  remarks: 'test remarks',
};
const mockId = '123addOnService';

describe('AddOnServicesModule', () => {
  let app: INestApplication;
  const addOnServicesService = {
    create: jest.fn().mockReturnValue(mockAddOnService),
    findAll: jest.fn().mockReturnValue([mockAddOnService]),
    findOne: jest.fn().mockReturnValue(mockAddOnService),
    update: jest.fn().mockReturnValue(mockAddOnService),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AddOnServicesModule],
    })
      .overrideProvider(AddOnServicesService)
      .useValue(addOnServicesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET addOnServices`, () => {
    return request(app.getHttpServer())
      .get('/addOns')
      .expect(200)
      .expect([mockAddOnService]);
  });

  it(`/GET addOnServices/:id`, () => {
    return request(app.getHttpServer())
      .get(`/addOns/${mockId}`)
      .expect(200)
      .expect(mockAddOnService);
  });

  it('/POST addOnService', () => {
    return request(app.getHttpServer())
      .post('/addOns')
      .expect(201)
      .expect(mockAddOnService);
  });

  it('/PUT addOnService', () => {
    return request(app.getHttpServer())
      .put(`/addOns/${mockId}`)
      .expect(200)
      .expect(mockAddOnService);
  });

  it('/DELETE addOnService', () => {
    return request(app.getHttpServer()).delete(`/addOns/${mockId}`).expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
