"use client";

import { sendSchema, SendSchema } from "@/models/message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function ChatForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SendSchema>({
    defaultValues: {
      authorId: "1",
      content: "",
    },
    resolver: zodResolver(sendSchema),
  });

  const send = useMutation(api.message.sendMessage);
  function onSubmit(data: SendSchema) {
    startTransition(() => {
      try {
        send({ authorId: data.authorId, content: data.content });
        form.reset();
      } catch (error) {
        toast.error(
          (error as Error).message ??
            "Something went wrong while sending the message."
        );
      }
    });
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mt-4 flex items-center gap-3"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <div className="flex-1">
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Enter your message here"
                      className="w-full resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <Button
            type="submit"
            className="rounded-full h-12 w-12 p-0"
            disabled={isPending}
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : <Send />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
