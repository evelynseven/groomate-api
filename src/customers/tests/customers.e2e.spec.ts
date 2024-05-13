import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CustomersModule } from '../customers.module';
import { CustomersService } from '../customers.service';

const mockCustomer = {
  id: '123customer',
  firstName: 'Evelyn',
  lastName: 'Sun',
  email: 'evelynsun166@gmail.com',
  phoneNumber: '4373407590',
  remarks: 'test remarks',
};
const mockId = '123customer';

describe('CustomersModule', () => {
  let app: INestApplication;
  const customersService = {
    create: jest.fn().mockReturnValue(mockCustomer),
    findAll: jest.fn().mockReturnValue([mockCustomer]),
    findOne: jest.fn().mockReturnValue(mockCustomer),
    update: jest.fn().mockReturnValue(mockCustomer),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CustomersModule],
    })
      .overrideProvider(CustomersService)
      .useValue(customersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET customers`, () => {
    return request(app.getHttpServer())
      .get('/customers')
      .expect(200)
      .expect([mockCustomer]);
  });

  it(`/GET customers/:id`, () => {
    return request(app.getHttpServer())
      .get(`/customers/${mockId}`)
      .expect(200)
      .expect(mockCustomer);
  });

  it('/POST customer', () => {
    return request(app.getHttpServer())
      .post('/customers')
      .expect(201)
      .expect(mockCustomer);
  });

  it('/PUT customer', () => {
    return request(app.getHttpServer())
      .put(`/customers/${mockId}`)
      .expect(200)
      .expect(mockCustomer);
  });

  it('/DELETE customer', () => {
    return request(app.getHttpServer())
      .delete(`/customers/${mockId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
