// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3777,
    user: 'root',
    password: '123456',
    database: 'test',
  },
});

export const create = async () => {
  try {
    const res = await knex.schema.hasTable('user').then(function (exists) {
      console.log('exists--', exists);

      if (!exists) {
        return knex.schema.createTable('user', function (t) {
          t.increments('id').primary();
          t.string('first_name', 100);
          t.string('last_name', 100);
          t.text('bio');
        });
      }
    });
    console.log('res?', res);

    return res;
  } catch (error) {
    console.log('error', error);
  }
};

export const drop = () => {
  return knex.schema.dropTable('user');
};
