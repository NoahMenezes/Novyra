// @ts-nocheck
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("leads").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    description: v.string(),
    source: v.string(),
    budget: v.optional(v.string()),
    urgency: v.optional(v.string()),
    intent: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      description: args.description,
      source: args.source,
      budget: args.budget,
      urgency: args.urgency,
      intent: args.intent,
    });
  },
});
