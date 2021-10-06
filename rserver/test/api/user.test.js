const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

describe('Signup success', () => {
    it('Testing a signup now', (done) =>{
        request(app).post('/user/UserSignup')
        .send({
                "username": "test"+Date.now(),
                "password": "123456"
        })
        .then((res) =>{
            const body = res.body;
            expect(body).to.contain.property('success');
            expect(body.success).equal(true);
            done();
        })
    });
});

describe('Signup failed', () => {
    it('Testing a duplicated signup now', (done) =>{
        request(app).post('/user/UserSignup')
        .send({
                "username": "test",
                "password": "123456"
        })
        .then((res) =>{
            const body = res.body;
            expect(body).to.contain.property('success');
            expect(body.success).equal(false);
            done();
        })
    });
});