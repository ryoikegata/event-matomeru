import {
  TenantSchema,
  UserSchema,
  CreateTenantFormSchema,
  EventSchema,
  CategorySchema,
} from ".";

export type TenantType = Zod.infer<typeof TenantSchema>;
export type UserType = Zod.infer<typeof UserSchema>;
export type CreateTenantFormType = Zod.infer<typeof CreateTenantFormSchema>;
export type EventType = Zod.infer<typeof EventSchema>;
export type CategoryType = Zod.infer<typeof CategorySchema>;
