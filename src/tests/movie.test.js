const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test('get /movies debe retornar status 200', async() => { 
    const res = await request(app).get('/movies')
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /movies debe crear una pelìcula', async() => { 
    const body = {
        "name":"A cat named Yuno",
        "image":"URl",
        "synopsis":"sadasdas",
        "releaseYear":2016
    }
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
  });

test('PUT /movies:id debe actualizar una pelìcula', async() => {
    const body = {
        "synopsis":"A movie about self superation"
    }
    const res = await request(app).put(`/movies/${id}`).send(body)
    expect(res.status).toBe(200);
    console.log(res.body)
});


test('POST /movies/:id/genres debe insertar nuevos datos', async () => { 
    const genre = await Genre
        .create({ name: 'Drama'});
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    console.log(res.body)
 
 })

 test('POST /movies/:id/actors debe insertar nuevos datos', async () => { 
    const actor = await Actor
        .create({
            "firstName": "Silver",
            "lastName": "Añez",
            "nationality": "Bolivian",
            "image": 'URL',
            "birthday": "1993-06-11"
        });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    console.log(res.body)
 
 })

 test('POST /movies/:id/directors debe insertar nuevos datos', async () => { 
    const director = await Director
        .create({
            "firstName": "Grecia",
            "lastName": "Illescas",
            "nationality": "Bolivian",
            "image": "URL",
            "birthday": "1989-11-12"
        });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id])
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    console.log(res.body)
 
 })

test("DELETE /movies/:id debe eliminar una pelìcula",async()=>{
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
  });