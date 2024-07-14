import { CategorySchema, EventSchema, TenantSchema, UserSchema } from ".";

export type TenantType = Zod.infer<typeof TenantSchema>;
export type UserType = Zod.infer<typeof UserSchema>;
export type EventType = Zod.infer<typeof EventSchema>;
export type CategoryType = Zod.infer<typeof CategorySchema>;
export type EventInfo = EventType & {
  event_category: { category: CategoryType }[];
  user_event: { is_attend: boolean; user: UserType }[];
};
