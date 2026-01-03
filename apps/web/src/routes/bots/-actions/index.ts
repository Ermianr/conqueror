import { db, eq } from "@conqueror/db";
import { bots } from "@conqueror/db/schema/bots";
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { botCreateSchemaAction, MockBotSchema } from "@/routes/bots/-schemas";
import type { WorkerAction, WorkerResponse } from "@/routes/bots/-worker";

const getBotByBotDiscordId = createServerOnlyFn(async ({ botDiscordId }) => {
  return (
    await db
      .select()
      .from(bots)
      .where(eq(bots.botDiscordId, botDiscordId))
      .limit(1)
  ).at(0);
});

export const createBot = createServerFn({ method: "POST" })
  .inputValidator(botCreateSchemaAction)
  .handler(async ({ data }) => {
    if (await getBotByBotDiscordId({ botDiscordId: data.botDiscordId })) {
      throw new Error("Bot already exists");
    }

    const newBot = (
      await db
        .insert(bots)
        .values({
          username: data.username,
          token: data.token,
          botDiscordId: data.botDiscordId,
        })
        .returning()
    ).at(0);

    return newBot;
  });

export const startWorker = createServerFn({ method: "POST" })
  .inputValidator(MockBotSchema)
  .handler(async ({ data }) => {
    const worker = new Worker(new URL("../-worker/index.ts", import.meta.url));

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const { type, payload } = event.data;
      switch (type) {
        case "READY": {
          console.log(`Bot ejecutanodse ${payload.userTag}`);
        }
      }
    };

    const payload: WorkerAction = {
      type: "START",
      payload: {
        token: data.token,
      },
    };

    worker.postMessage(payload);

    return { succes: true };
  });
