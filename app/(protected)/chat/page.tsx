import { auth } from "@/auth";
import ChatForm from "@/components/chat/chat-form";
import ChatMessages from "@/components/chat/chat-messages";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";

export default async function ChatPage() {
  const session = await auth();
  return (
    <div className="bg-background p-5">
      <div className="max-w-7xl mx-auto">
        <Card className="max-w-5xl mx-auto">
          <CardContent>
            <div className="flex w-full h-[calc(100vh-12rem)] gap-4">
              {/* Sidebar */}
              <aside className="bg-primary/20 w-56 h-full p-5 space-y-4">
                <header className="p-2 border-b text-xl font-medium">
                  WhatsApp Clone
                </header>
                <ul className="space-y-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <li key={idx}>
                      <Link
                        className="flex items-center gap-2 px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground"
                        href={`/chat/${idx + 1}`}
                      >
                        <User />
                        {`User - ${idx + 1}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Chat area */}
              <aside className="flex-1 h-full p-5 flex flex-col justify-between">
                {/* Message list (optional, empty or commented out) */}
                <ChatMessages
                  authorId={encodeURIComponent(session?.user?.id ?? "")}
                />

                {/* Message input form */}
                <ChatForm
                  userId={encodeURIComponent(session?.user?.id ?? "")}
                />
              </aside>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
