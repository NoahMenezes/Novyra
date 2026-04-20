import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    description: v.string(),
    source: v.string(),
    budget: v.optional(v.string()),
    urgency: v.optional(v.string()),
    intent: v.string(),
  }),
});
