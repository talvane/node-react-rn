const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('shuld be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "JEST",
            email: "contato@fest.com",
            whatsapp: "8100000000",
            city: "Jaboatao",
            uf: "PE"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});