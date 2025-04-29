import { pgTable, serial, varchar, boolean, timestamp, integer, text } from 'drizzle-orm/pg-core'

import { relations } from 'drizzle-orm'


const bread = pgTable('bread', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  price: integer('price').notNull(),
  image: varchar('image', { length: 256 }).notNull(),

})