/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary();
        table.integer('project_id').unsigned().notNullable()
            .references('id').inTable('projects').onDelete('CASCADE');
        table.string('title', 160).notNullable();
        table.text('description').nullable();
        table.enum('status', ['todo', 'doing', 'done']).defaultTo('todo');
        table.enum('priority', ['low', 'medium', 'high']).defaultTo('medium');
        table.date('due_date').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tasks');
};
