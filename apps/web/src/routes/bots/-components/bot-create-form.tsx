import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { toast } from "sonner";
import { FieldInfo } from "@/components/field-info";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catchAsync } from "@/lib/catchAsync";
import { createBot } from "@/routes/bots/-actions";
import type { DiscordCheckTokenResponse } from "@/routes/bots/-interfaces";
import { botCreateSchemaForm } from "@/routes/bots/-schemas";

export function BotCreateForm() {
  const mutation = useMutation({
    mutationFn: createBot,
    mutationKey: ["bots"],
    onSuccess: () => {
      toast.success("Bot created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      token: "",
    },
    validators: {
      onChange: botCreateSchemaForm,
    },
    onSubmit: async ({ value }) => {
      const [badRequest, response] = await catchAsync(
        ky
          .post<DiscordCheckTokenResponse>("api/check-token", {
            json: { token: value.token },
          })
          .json(),
      );

      if (badRequest) {
        toast.error("Invalid Token");
        return;
      }

      if (!response?.botDiscordId || !response?.username) {
        toast.error("Internal Error");
        return;
      }

      const { botDiscordId, username } = response;

      await mutation.mutateAsync({
        data: { token: value.token, botDiscordId, username },
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new bot</CardTitle>
        <CardDescription>Deploy a new Discord bot.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="token"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Token</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "Creating..." : "Create Bot"}
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
