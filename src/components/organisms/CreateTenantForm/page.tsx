import { FC, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTenantFormSchema } from "@/services/schema";
import { supabase } from "@/utils/supabase/supabase";
import { CreateTenantFormType } from "@/services/schema/types";
import axios from "axios";

export const CreateTenantForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTenantFormType>({
    resolver: zodResolver(CreateTenantFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role_id: 2,
    },
  });

  const role_id = 2;

  const inviteUser = useCallback(
    async (email: string, tenant_id: number, role_id: number) => {
      try {
        await axios.post("/api/invite-user", {
          email,
          tenant_id,
          role_id,
        });
      } catch (error) {
        console.error("Failed to send invitation:", error);
        alert("Failed to send invitation. Please try again.");
      }
    },
    []
  );

  const onSubmit = useCallback(
    async (formData: CreateTenantFormType) => {
      setIsLoading(true);

      try {
        const { error: createTenantError } = await supabase
          .from("tenants")
          .insert([
            {
              name: formData.name,
            },
          ]);

        const { data: createdTenant } = await supabase
          .from("tenants")
          .select("id")
          .eq("name", formData.name)
          .single();

        inviteUser(formData.email, createdTenant?.id, role_id);

        if (createTenantError) {
          alert("エラーが発生しました。");
        } else {
          alert("テナントが正常に作成されました。");
        }
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [inviteUser]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-3 pt-4 pb-6">
      <h1 className="font-bold text-xl">テナント作成</h1>
      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="w-full">
          <label className="font-bold text-sm">
            テナント名<span className="text-red-500"> *</span>
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="テナント名を入力してください"
            className="border px-3 py-2 mt-1 w-full rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-xs pt-1">テナント名は必須です。</p>
          )}
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            テナントオーナーメールアドレス
            <span className="text-red-500"> *</span>
          </label>
          <input
            {...register("email", { required: true })}
            type="text"
            placeholder="メールアドレスを入力してください"
            className="border px-3 py-2 mt-1 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs pt-1">
              メールアドレスは必須です。
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-[#0584c7] rounded-full w-72 text-lg font-bold py-2"
        >
          {isLoading ? "処理中..." : "作成"}
        </button>
      </div>
    </form>
  );
};
