import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/wedding/info (GET)', () => {
    return request(app.getHttpServer())
      .get('/wedding/info')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('bride');
        expect(res.body).toHaveProperty('groom');
        expect(res.body).toHaveProperty('date');
      });
  });

  it('/confirmation (POST)', () => {
    return request(app.getHttpServer())
      .post('/confirmation')
      .send({ name: 'João Silva', guests: 2 })
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
      });
  });

  it('/payments/gifts (GET)', () => {
    return request(app.getHttpServer())
      .get('/payments/gifts')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('gifts');
        expect(Array.isArray(res.body.gifts)).toBe(true);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
