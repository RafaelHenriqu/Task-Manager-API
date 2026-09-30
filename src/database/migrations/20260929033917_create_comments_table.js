/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary();
        table.integer('task_id').unsigned().notNullable()
            .references('id').inTable('tasks').onDelete('CASCADE');
        table.integer('author_id').unsigned().notNullable()
            .references('id').inTable('users').onDelete('CASCADE');
        table.text('body').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comments');
};
