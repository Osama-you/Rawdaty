const request = require('supertest');
const { connection, dbBuild } = require('../server/database/data');
const app = require('../server/app');
const {
  getKindergartenById,
  addCommentsQuery,
  getCommentsQuery,
} = require('../server/database/queries');

beforeAll(() => dbBuild());
afterAll(() => connection.end());

describe('Get all users', () => {
  test('Route /users status 200, json header', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/users')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.data).toHaveLength(11);
  });
});

// test the database query
describe('Testing get kindergarten by id query', () => {
  test('Should return data length 1 when given id 1', async () => {
    const { rows } = await getKindergartenById(1);
    return expect(rows).toHaveLength(1);
  });

  test('Should return kindergarten name is روضة البسمة الجميلة when given id 2', async () => {
    const { rows } = await getKindergartenById(2);
    return expect(rows[0].kindergarten_name).toBe('روضة البسمة الجميلة');
  });

  test('Should return kindergarten full data when given id 1', async () => {
    const { rows } = await getKindergartenById(1);
    return expect(rows[0]).toEqual({
      kindergarten_name: 'روضة المتميزون الحديثة',
      cover_image:
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/127563203_2816927261908481_825163598039189311_o.jpg?_nc_cat=100&ccb=2&_nc_sid=e3f864&_nc_ohc=EOam1iTQLIcAX8jrnEj&_nc_ht=scontent.fgza2-1.fna&oh=e1cef81bf1cebbd72a6c1f1af651e01f&oe=604638FB',
      description:
        'نعملُ على إنشاء جيل رائع من خلال تطوير كافة مهاراتهم الفكرية والنفسية بأساليب علمية وتربوية',
      phone_number: '0599123456',
      min_price: 1000,
      max_price: 2000,
      periods: [['7:00', '11:00']],
      image_gallery: [
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/126072436_2810042115930329_426976181002437064_o.jpg?_nc_cat=105&ccb=2&_nc_sid=730e14&_nc_ohc=UX2zxNzPBTYAX_XAYLE&_nc_ht=scontent.fgza2-1.fna&oh=72a8ef5d8369f7e183116f4423bad872&oe=604613F1',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-0/p526x395/126362711_2810037339264140_8115186378406081155_o.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=1pa0nWqLMVQAX8xj-8Z&_nc_ht=scontent.fgza2-1.fna&tp=6&oh=43ba32d04a1478c83ca4cee8950955f9&oe=6045D9DF',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-0/p180x540/125246489_2806470342954173_5557632858147020336_o.jpg?_nc_cat=106&ccb=2&_nc_sid=e3f864&_nc_ohc=ZGPkuyaJoUEAX9lkFkC&_nc_ht=scontent.fgza2-1.fna&tp=6&oh=0a5795c9d04ed69df0ecf950260a8240&oe=60475C85',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/127711338_2816934215241119_820060672107449619_o.jpg?_nc_cat=110&ccb=2&_nc_sid=730e14&_nc_ohc=lj0hKeD_FswAX-IthGI&_nc_ht=scontent.fgza2-1.fna&oh=ff73fc70463202e07ef1ab8945b1aaf6&oe=6047D28E',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/125969111_2810046942596513_7374678634903478541_o.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=26lBVKEuxXgAX-LkaQx&_nc_ht=scontent.fgza2-1.fna&oh=98b4dfd19c0ec101fab0c68fcafb2ed7&oe=60489661',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-0/p526x395/126221172_2810852509182623_3908586823989526775_o.jpg?_nc_cat=104&ccb=2&_nc_sid=730e14&_nc_ohc=r4JC03VXovYAX-ZDyZv&_nc_ht=scontent.fgza2-1.fna&tp=6&oh=a04d43782df65a5367387fa7d876a6cc&oe=6047FCA7',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/126420691_2810858432515364_8382015493325068832_o.jpg?_nc_cat=102&ccb=2&_nc_sid=730e14&_nc_ohc=8m_uU2uLr9kAX-TeYbI&_nc_ht=scontent.fgza2-1.fna&oh=8b17321eb157fe3c7a9d7c09ba6182bc&oe=604782E5',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/126361201_2810861959181678_2949636133222938705_o.jpg?_nc_cat=107&ccb=2&_nc_sid=e3f864&_nc_ohc=xj63fLB5DpYAX8g2PTJ&_nc_ht=scontent.fgza2-1.fna&oh=88ac8fb67a2c9c87ee2ed8940f2c14fb&oe=60451FF9',
      ],
      location_sub: 'الرمال الجنوبي',
      location_main: 'غزة',
      rating_count: '4',
      rating_average: '4',
    });
  });
});

// test the route /kindergarten/:kindergartenId
describe('Test the route /kindergarten/:kindergartenId', () => {
  test('should return status code 200 and data length 1 when given GET  /kindergarten/1', async () => {
    expect.assertions(1);
    const res = await request(app).get('/api/v1/kindergarten/1').expect(200);
    expect(res.body.data.length).toBe(1);
  });

  test('should return status code 400 given GET  /kindergarten/text', async () => {
    expect.assertions(1);
    const res = await request(app).get('/api/v1/kindergarten/text').expect(400);
    expect(res.body.error).toBe('Validation Error');
  });

  test('should return status code 400 given GET  /kindergarten/-1', async () => {
    expect.assertions(1);
    const res = await request(app).get('/api/v1/kindergarten/-1').expect(400);
    expect(res.body.error).toBe('Validation Error');
  });

  test('should return status code 400 given GET  /kindergarten/0', async () => {
    expect.assertions(1);
    const res = await request(app).get('/api/v1/kindergarten/0').expect(400);
    expect(res.body.error).toBe('Validation Error');
  });

  test('should return status code 404 given GET  /kindergarten/17', async () => {
    expect.assertions(1);
    const res = await request(app).get('/api/v1/kindergarten/17').expect(404);
    expect(res.body.error).toBe('Page Not Found');
  });
});

// Test the route 'Get'  /kindergarten
describe('Get all kindergartens', () => {
  test('Route /kindergarten status 200, json header', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/kindergarten')
      .expect(200)
      .expect('Content-Type', /json/);
    const { data } = res.body;
    expect(data).toHaveLength(9);
  });
  test('Route /kindergarten status 200, json header, data[0]= testData', async () => {
    expect.assertions(1);
    const testData = {
      id: 1,
      kindergarten_name: 'روضة المتميزون الحديثة',
      user_id: 1,
      cover_image:
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/127563203_2816927261908481_825163598039189311_o.jpg?_nc_cat=100&ccb=2&_nc_sid=e3f864&_nc_ohc=EOam1iTQLIcAX8jrnEj&_nc_ht=scontent.fgza2-1.fna&oh=e1cef81bf1cebbd72a6c1f1af651e01f&oe=604638FB',
      description:
        'نعملُ على إنشاء جيل رائع من خلال تطوير كافة مهاراتهم الفكرية والنفسية بأساليب علمية وتربوية',
      location_id: 1,
      phone_number: '0599123456',
      latitude: null,
      longitude: null,
      min_price: 1000,
      max_price: 2000,
      periods: [['7:00', '11:00']],
      image_gallery: [
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/126072436_2810042115930329_426976181002437064_o.jpg?_nc_cat=105&ccb=2&_nc_sid=730e14&_nc_ohc=UX2zxNzPBTYAX_XAYLE&_nc_ht=scontent.fgza2-1.fna&oh=72a8ef5d8369f7e183116f4423bad872&oe=604613F1',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-0/p526x395/126362711_2810037339264140_8115186378406081155_o.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=1pa0nWqLMVQAX8xj-8Z&_nc_ht=scontent.fgza2-1.fna&tp=6&oh=43ba32d04a1478c83ca4cee8950955f9&oe=6045D9DF',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-0/p180x540/125246489_2806470342954173_5557632858147020336_o.jpg?_nc_cat=106&ccb=2&_nc_sid=e3f864&_nc_ohc=ZGPkuyaJoUEAX9lkFkC&_nc_ht=scontent.fgza2-1.fna&tp=6&oh=0a5795c9d04ed69df0ecf950260a8240&oe=60475C85',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/127711338_2816934215241119_820060672107449619_o.jpg?_nc_cat=110&ccb=2&_nc_sid=730e14&_nc_ohc=lj0hKeD_FswAX-IthGI&_nc_ht=scontent.fgza2-1.fna&oh=ff73fc70463202e07ef1ab8945b1aaf6&oe=6047D28E',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/125969111_2810046942596513_7374678634903478541_o.jpg?_nc_cat=106&ccb=2&_nc_sid=730e14&_nc_ohc=26lBVKEuxXgAX-LkaQx&_nc_ht=scontent.fgza2-1.fna&oh=98b4dfd19c0ec101fab0c68fcafb2ed7&oe=60489661',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-0/p526x395/126221172_2810852509182623_3908586823989526775_o.jpg?_nc_cat=104&ccb=2&_nc_sid=730e14&_nc_ohc=r4JC03VXovYAX-ZDyZv&_nc_ht=scontent.fgza2-1.fna&tp=6&oh=a04d43782df65a5367387fa7d876a6cc&oe=6047FCA7',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/126420691_2810858432515364_8382015493325068832_o.jpg?_nc_cat=102&ccb=2&_nc_sid=730e14&_nc_ohc=8m_uU2uLr9kAX-TeYbI&_nc_ht=scontent.fgza2-1.fna&oh=8b17321eb157fe3c7a9d7c09ba6182bc&oe=604782E5',
        'https://scontent.fgza2-1.fna.fbcdn.net/v/t1.0-9/126361201_2810861959181678_2949636133222938705_o.jpg?_nc_cat=107&ccb=2&_nc_sid=e3f864&_nc_ohc=xj63fLB5DpYAX8g2PTJ&_nc_ht=scontent.fgza2-1.fna&oh=88ac8fb67a2c9c87ee2ed8940f2c14fb&oe=60451FF9',
      ],
      request_status: 'approved',
      is_enable: 'true',
      rating_average: '4.2500000000000000',
      rating_count: '4',
    };
    const res = await request(app)
      .get('/api/v1/kindergarten')
      .expect(200)
      .expect('Content-Type', /json/);
    const { data } = res.body;
    expect(data[0]).toEqual(testData);
  });
});

// test the route /locations
describe('Get locations', () => {
  test('Route /users status 200, json header', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/locations')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.data).toHaveLength(23);
  });

  test('should return an object contains id, sub and main locations', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/locations')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(res.body.data[0]).toEqual({
      id: 1,
      location_sub: 'الرمال الجنوبي',
      location_main: 'غزة',
    });
  });
});

// test the database query
describe('Testing post comments to kindergarten id query', () => {
  test('Should return data length 4 when given id 1', () =>
    addCommentsQuery(2, 'حنين', 'هذه روضة رائعة', 4)
      .then((result) => expect(result.rows).toHaveLength(1))
      .catch());
});
describe('Testing get comments by kindergarten id query', () => {
  test('Should return data length 4 when given id 1', () =>
    getCommentsQuery(1)
      .then((result) => expect(result.rows).toHaveLength(4))
      .catch());
});

// test the route /kindergarten/:kindergartenId/comments
describe('Test the route POST /kindergarten/:kindergartenId/comments', () => {
  test('should return status code 201 and data length 1 when given POST  /kindergarten/2/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/api/v1/kindergarten/2/comments')
      .send({ userName: 'محمد', comment: 'هذه روضة مميزة', rating: 4 })
      .expect(201);
    const { data } = res.body;
    expect(data).toHaveLength(1);
  });

  test('should return status code 201 required username when given POST  /kindergarten/2/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/api/v1/kindergarten/2/comments')
      .send({ userName: 'محمد', comment: 'هذه روضة مميزة', rating: 4 })
      .expect(201);
    const { data } = res.body;
    expect(data[0].user_name).toBe('محمد');
  });

  test('should return status code 400 and validation error message when given rating not number POST  /kindergarten/2/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/api/v1/kindergarten/2/comments')
      .send({ userName: 'محمد', comment: 'هذه روضة مميزة', rating: 'good' })
      .expect(400);
    const { error } = res.body;
    expect(error).toBe('Validation Error');
  });
});
describe('Test the route /kindergarten/:kindergartenId/comments', () => {
  test('should return status code 200 and data length 2 when given GET  /kindergarten/2/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/kindergarten/2/comments')
      .expect(200);
    const { data } = res.body;
    expect(data).toHaveLength(5);
  });

  test('should return status code 200 and expected data when given GET  /kindergarten/1/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/kindergarten/1/comments')
      .expect(200);
    const { data } = res.body;
    expect(data[0].comment).toBe(
      'هذه روضة رائعة وأتمنى لها دوام التميز والنجاح'
    );
  });

  test('should return status code 400 given GET  /kindergarten/text/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/kindergarten/text/comments')
      .expect(400);
    const { error } = res.body;
    expect(error).toBe('Validation Error');
  });

  test('should return status code 400 and Bad Request error  when given kindergarten id not exist in database POST  /kindergarten/2/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/api/v1/kindergarten/19/comments')
      .send({ userName: 'محمد', comment: 'هذه روضة مميزة', rating: 4 })
      .expect(400);
    const { error } = res.body;
    expect(error).toBe('Bad Request');
  });

  test('should return status code 400 and validation error  when given kindergarten id not valid POST  /kindergarten/2/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post('/api/v1/kindergarten/0/comments')
      .send({ userName: 'محمد', comment: 'هذه روضة مميزة', rating: 4 })
      .expect(400);
    const { error } = res.body;
    expect(error).toBe('Validation Error');
  });
  test('should return status code 400 given GET  /kindergarten/-1/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/kindergarten/-1/comments')
      .expect(400);
    const { error } = res.body;
    expect(error).toBe('Validation Error');
  });

  test('should return status code 400 given GET  /kindergarten/0/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/kindergarten/0/comments')
      .expect(400);
    const { error } = res.body;
    expect(error).toBe('Validation Error');
  });

  test('should return status code 404 given GET  /kindergarten/17/comments', async () => {
    expect.assertions(1);
    const res = await request(app)
      .get('/api/v1/kindergarten/17/comments')
      .expect(404);
    const { message } = res.body;
    expect(message).toBe('There is no comments for this id');
  });
});
