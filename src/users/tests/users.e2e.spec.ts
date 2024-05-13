import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { Role } from '@prisma/client';

const mockUser = {
  id: '123user',
  firstName: 'Evelyn',
  lastName: 'Sun',
  email: 'evelynsun166@gmail.com',
  password: 'testpassword123',
  role: Role.MANAGER,
  phoneNumber: '4373407590',
  remarks: 'test remarks',
};
const mockId = '123user';

describe('UsersModule', () => {
  let app: INestApplication;
  const usersService = {
    create: jest.fn().mockReturnValue(mockUser),
    findAll: jest.fn().mockReturnValue([mockUser]),
    findOne: jest.fn().mockReturnValue(mockUser),
    update: jest.fn().mockReturnValue(mockUser),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([mockUser]);
  });

  it(`/GET users/:id`, () => {
    return request(app.getHttpServer())
      .get(`/users/${mockId}`)
      .expect(200)
      .expect(mockUser);
  });

  it('/POST user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .expect(201)
      .expect(mockUser);
  });

  it('/PUT user', () => {
    return request(app.getHttpServer())
      .put(`/users/${mockId}`)
      .expect(200)
      .expect(mockUser);
  });

  it('/DELETE user', () => {
    return request(app.getHttpServer()).delete(`/users/${mockId}`).expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
