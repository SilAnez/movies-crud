const request = require('supertest');
const app = require('../app');

let id;

test('get /directors debe retornar status 200', async() => { 
    const res = await request(app).get('/directors')
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /directors debe crear un director', async() => { 
    const body = {
        "firstName": "Grecia",
        "lastName": "Illescas",
        "nationality": "Bolivian",
        "image": "URL",
        "birthday": "1989-11-12"
    }
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
  });

test('PUT /directors:id debe actualizar un director', async() => {
    const body = {
        "nationality": "French",
    }
    const res = await request(app).put(`/directors/${id}`).send(body)
    expect(res.status).toBe(200);
    console.log(res.body)
});

test("DELETE /directors/:id debe eliminar un director",async()=>{
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
  });
