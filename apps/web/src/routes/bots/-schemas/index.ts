import z from "zod";

export const BotStartSchema = z.object({
  botId: z.uuidv7(),
});

export const MockBotSchema = z.object({
  token: z.string(),
});

export const botCreateSchemaForm = z.object({
  token: z.string().min(59, "Token is invalid"),
});

export const botCreateSchemaAction = z.object({
  botDiscordId: z.string(),
  token: z.string().min(59, "Token is invalid"),
  username: z.string().min(2).max(32),
});
