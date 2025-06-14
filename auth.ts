import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  theme: {
    brandColor: "#25D366", // WhatsApp green color
    buttonText: "#ffffff",
    logo: "https://placehold.co/400x400",
  },
  providers: [Google],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        // check user
        const userExist = await db.query.usersTable.findFirst({
          where: (f, { eq }) => eq(f.email, user?.email as string),
        });

        if (!userExist) {
          // store it and send mail
          await db.insert(usersTable).values({
            email: user?.email ?? "",
            name: user?.name ?? "",
            picture: user?.image,
          });
          // TODO: send mail
        }
        // update the last login
        await db
          .update(usersTable)
          .set({
            lastLogin: new Date(),
          })
          .where(eq(usersTable.email, user?.email as string));
        // TODO: send the mail
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
