import { createFileRoute } from "@tanstack/react-router";
import ky from "ky";
import { catchAsync } from "@/lib/catchAsync";
import type {
  DiscordApiResponse,
  DiscordCheckTokenResponse,
} from "@/routes/bots/-interfaces";

export const Route = createFileRoute("/api/check-token")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { token } = await request.json();

        const [badRequest, response] = await catchAsync(
          ky
            .get<DiscordApiResponse>("https://discord.com/api/v10/users/@me", {
              headers: { Authorization: `Bot ${token}` },
            })
            .json(),
        );

        if (badRequest) {
          return Response.json(
            { valid: false } satisfies DiscordCheckTokenResponse,
            { status: 401 },
          );
        }

        return Response.json(
          {
            valid: true,
            botDiscordId: response.id,
            username: response.username,
          } satisfies DiscordCheckTokenResponse,
          { status: 200 },
        );
      },
    },
  },
});
