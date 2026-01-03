import { Client, Events, GatewayIntentBits } from "discord.js";

export type WorkerAction = { type: "START"; payload: { token: string } };
export type WorkerResponse = { type: "READY"; payload: { userTag: string } };

self.addEventListener("message", (event: MessageEvent<WorkerAction>) => {
  const { type, payload } = event.data;

  switch (type) {
    case "START": {
      const client = new Client({ intents: [GatewayIntentBits.Guilds] });
      client.once(Events.ClientReady, (readyClient) => {
        self.postMessage({
          type: "READY",
          payload: { userTag: readyClient.user.tag },
        });
      });
      client.login(payload.token);
      break;
    }
  }
});
