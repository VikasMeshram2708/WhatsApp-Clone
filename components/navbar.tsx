import { auth, signOut } from "@/auth";
import { LogOut, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="bg-background w-full p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-medium">
            <MessageCircle />
            <Link href="/">WhastApp Clone</Link>
          </h2>
          <div>
            {session && session.user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <h2 className="text-2xl font-medium">
                      Hello, {session?.user?.name}
                    </h2>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/chat">Chat</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button variant={"destructive"}>
                    <LogOut />
                    Logout
                  </Button>
                </form>
              </div>
            ) : (
              <Button variant={"link"}>
                <Link href="/api/auth/signin">Continue with Google</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
