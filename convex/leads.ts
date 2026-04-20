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

export const addBatch = mutation({
  args: {
    leads: v.array(
      v.object({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        description: v.string(),
        source: v.string(),
        budget: v.optional(v.string()),
        urgency: v.optional(v.string()),
        intent: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    for (const lead of args.leads) {
      const existing = await ctx.db
        .query("leads")
        .filter((q) => q.eq(q.field("description"), lead.description))
        .first();

      if (!existing) {
        await ctx.db.insert("leads", {
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          description: lead.description,
          source: lead.source,
          budget: lead.budget,
          urgency: lead.urgency,
          intent: lead.intent,
        });
      }
    }
  },
});
