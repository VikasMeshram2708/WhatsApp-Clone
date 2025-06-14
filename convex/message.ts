import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// fetch messages
export const fetchMessages = query({
  args: { authorId: v.string() },
  handler: async (ctx, { authorId }) => {
    try {
      const messages = await ctx.db
        .query("messages")
        .filter((m) => m.eq(m.field("authorId"), authorId))
        .collect();
      return messages;
    } catch (error) {
      console.error(error);
      throw new ConvexError(
        (error as Error)?.message ?? "Failed to fetch messages"
      );
    }
  },
});

// send message
export const sendMessage = mutation({
  args: { authorId: v.string(), content: v.string() },
  handler: async (ctx, { authorId, content }) => {
    try {
      const message = { content, authorId };
      const res = await ctx.db.insert("messages", message);
      return res;
    } catch (error) {
      console.error(error);
      throw new ConvexError(
        (error as Error)?.message ?? "Failed to send message"
      );
    }
  },
});
