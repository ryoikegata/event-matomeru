import {
  TenantSchema,
  UserSchema,
  CreateTenantFormSchema,
  EventSchema,
  CategorySchema,
  GetEventSchema,
} from ".";

export type TenantType = Zod.infer<typeof TenantSchema>;
export type UserType = Zod.infer<typeof UserSchema>;
export type CreateTenantFormType = Zod.infer<typeof CreateTenantFormSchema>;
export type EventType = Zod.infer<typeof GetEventSchema>;
export type CategoryType = Zod.infer<typeof CategorySchema>;
export type EventInfo = EventType & {
  event_category: { category: CategoryType }[];
  user_event: { is_attend: boolean; user: UserType }[];
};
