import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BaseServicesModule } from '../baseServices.module';
import { BaseServicesService } from '../baseServices.service';

const mockBaseService = {
  id: '123baseService',
  name: 'Bath and Brush',
  nameAbbrev: 'B&B',
  basePrice: 30,
  remarks: 'test remarks',
};
const mockId = '123baseService';

describe('BaseServicesModule', () => {
  let app: INestApplication;
  const baseServicesService = {
    create: jest.fn().mockReturnValue(mockBaseService),
    findAll: jest.fn().mockReturnValue([mockBaseService]),
    findOne: jest.fn().mockReturnValue(mockBaseService),
    update: jest.fn().mockReturnValue(mockBaseService),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [BaseServicesModule],
    })
      .overrideProvider(BaseServicesService)
      .useValue(baseServicesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET baseServices`, () => {
    return request(app.getHttpServer())
      .get('/services')
      .expect(200)
      .expect([mockBaseService]);
  });

  it(`/GET baseServices/:id`, () => {
    return request(app.getHttpServer())
      .get(`/services/${mockId}`)
      .expect(200)
      .expect(mockBaseService);
  });

  it('/POST baseService', () => {
    return request(app.getHttpServer())
      .post('/services')
      .expect(201)
      .expect(mockBaseService);
  });

  it('/PUT baseService', () => {
    return request(app.getHttpServer())
      .put(`/services/${mockId}`)
      .expect(200)
      .expect(mockBaseService);
  });

  it('/DELETE baseService', () => {
    return request(app.getHttpServer())
      .delete(`/services/${mockId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
