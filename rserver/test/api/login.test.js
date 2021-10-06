const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../app');

describe('Login success', () => {
    it('Testing a successful login now', (done) =>{
        request(app).post('/user/UserLogin')
        .send({
                "username": "test",
                "password": "123456"
        })
        .then((res) =>{
            const body = res.body;
            expect(body).to.contain.property('token');
            expect(body).to.contain.property('username');
            done();
        })
        
    });
});

describe('Login failed', () => {
    it('Testing a failed login now', (done) =>{
        request(app).post('/user/UserLogin')
        .send({
                "username": "notauser",
                "password": "123456"
        })
        .then((res) =>{
            const body = res.body;
            expect(body).to.contain.property('error_code');
            expect(body).to.contain.property('status_code');
            done();
        })
    });
});
