exports.up = function (knex) {
  console.log('enter migrate-up');
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('sex', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
