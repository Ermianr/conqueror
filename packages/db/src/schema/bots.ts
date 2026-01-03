import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const bots = pgTable("bots", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  username: varchar("name", { length: 32 }).notNull(),
  botDiscordId: text("bot_discord_id").unique(),
  token: text("token").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
