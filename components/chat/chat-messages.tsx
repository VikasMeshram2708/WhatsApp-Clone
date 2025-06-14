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
          <li
            key={msg._id ?? idx}
            className={`flex ${
              msg.senderId === authorId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`bg-muted rounded p-2 max-w-[70%] ${
                msg.senderId === authorId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{msg.content}</p>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">
                  {new Date(msg._creationTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </li>
        ))}
      </Suspense>
    </ul>
  );
}
