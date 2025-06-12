import { pgTable, serial, text, pgEnum, timestamp } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('role', ['ADMIN', 'BASIC']);

export const timestamps = {
	createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow()
};

export const userTable = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password'),
	picture: text('picture'),
	lastLogin: timestamp('last_login'),
	role: userRole().default('BASIC'),
	...timestamps
});
