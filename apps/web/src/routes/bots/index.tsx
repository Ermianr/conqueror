import { createFileRoute } from "@tanstack/react-router";
import { BotCreateForm } from "./-components/bot-create-form";

export const Route = createFileRoute("/bots/")({
  component: BotsPage,
  ssr: false,
});

function BotsPage() {
  return <BotCreateForm />;
}
