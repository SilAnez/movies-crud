const request = require('supertest');
const app = require('../app');

let id;

test('get /actors debe retornar status 200', async() => { 
    const res = await request(app).get('/actors')
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /artist debe crear un actor', async() => { 
    const body = {
        "firstName": "Silver",
        "lastName": "Añez",
        "nationality": "Bolivian",
        "image": 'URL',
        "birthday": "1993-06-11"
    }
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
  });

test('PUT /artists:id debe actualizar un actor', async() => {
    const body = {
        "firstName": "Silvestre",
    }
    const res = await request(app).put(`/actors/${id}`).send(body)
    expect(res.status).toBe(200);
    console.log(res.body)
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /artists/:id debe eliminar un actor",async()=>{
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
  });

