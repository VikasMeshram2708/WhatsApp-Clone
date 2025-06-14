import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { mailOnLogin } from "./utils/mailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  secret: process.env.AUTH_SECRET,
  theme: {
    brandColor: "#25D366", // WhatsApp green color
    buttonText: "#ffffff",
    logo: "https://placehold.co/400x400",
  },
  providers: [Google],
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth;
    },
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
          // send mail
          await mailOnLogin({ clientMail: user?.email as string });
        }
        // update the last login
        await db
          .update(usersTable)
          .set({
            lastLogin: new Date(),
          })
          .where(eq(usersTable.email, user?.email as string));
        // send the mail
        await mailOnLogin({ clientMail: user?.email as string });
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // fetch the user
        const userExist = await db.query.usersTable.findFirst({
          where: (f, { eq }) => eq(f.email, user?.email as string),
        });
        // token.email = user.email;
        token.id = userExist?.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
