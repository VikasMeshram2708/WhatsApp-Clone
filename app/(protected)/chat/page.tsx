import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleHeart, Send, User } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
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
                <ul className="flex-1 overflow-y-auto space-y-2 pr-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <li key={idx} className="mb-2">
                      <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded">
                        <MessageCircleHeart />
                        Message - {new Date(Date.now()).getMilliseconds()}
                      </div>
                      <span className="text-xs text-muted-foreground ml-4">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Message input form */}
                <form action="" className="mt-4 flex items-center gap-3">
                  <Textarea
                    placeholder="Enter your message here..."
                    rows={3}
                    className="flex-1 resize-none"
                  />
                  <Button type="submit" className="rounded-full h-12 w-12 p-0">
                    <Send />
                  </Button>
                </form>
              </aside>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
