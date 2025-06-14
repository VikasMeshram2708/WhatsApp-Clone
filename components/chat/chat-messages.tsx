"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export default function ChatMessages({ authorId }: { authorId: string }) {
  const messageList = useQuery(api.message.fetchMessages, {
    authorId: decodeURIComponent(String(authorId)),
  });
  console.log("messageList", JSON.stringify(messageList));

  return (
    <ul className="space-y-4">
      <Suspense
        fallback={
          <p>
            <LoaderCircle className="animate-spin" />
          </p>
        }
      >
        {messageList?.map((msg, idx) => (
          <li key={msg._id ?? idx} className="bg-muted rounded p-2">
            <p>{msg.content}</p>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 self-end">
                {new Date(msg._creationTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </li>
        ))}
      </Suspense>
    </ul>
  );
}
