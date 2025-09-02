import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();
const loginDto: AuthDto = {
    login: 'a2@a.ru',
    password: '1',
};

interface ReviewResponse {
    _id: string;
}

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'Заголовок',
    description: 'Описание тестовое',
    raiting: 5,
    productId,
};

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    let createdId: string;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
        token = body.access_token;
    });

    it('/review/create (POST) - success', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send(testDto)
            .expect(201)
            .then((res: request.Response) => {
                const body: ReviewResponse = res.body as ReviewResponse;
                createdId = body._id;
                expect(createdId).toBeDefined();
            });
    });

    it('/review/create (POST) - faild', async () => {
        return request(app.getHttpServer())
            .post('/review/create')
            .send({ ...testDto, raiting: 0 })
            .expect(400)
            .then(({ body }: request.Response) => {
                console.log(body);
            });
    });

    it('/review/byProduct/:productId (GET)', async () => {
        return request(app.getHttpServer())
            .get('/review/byProduct/' + productId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.length).toBe(1);
            });
    });

    it('/review/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .set('Authorization', 'Bearer ' + token)
            .expect(200);
    });

    afterAll(() => {
        disconnect();
    });
});
