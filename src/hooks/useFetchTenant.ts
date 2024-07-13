import { useState, useEffect, use } from "react";
import useCheckSession from "./useCheckSession";
import { supabase } from "@/utils/supabase/supabase";
import { TenantType, UserType } from "@/services/schema/types";

export const useFetchTenant = () => {
  const [tenant, setTenant] = useState<TenantType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useCheckSession();

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        setLoading(true);

        if (!user) {
          throw new Error("User not authenticated");
        }

        // users テーブルから tenant_id を取得
        const { data: userData, error: userError } = await supabase
          .from("users" as never)
          .select("tenant_id")
          .eq("uuid", user.id)
          .single();

        if (userError) throw userError;
        if (!userData.tenant_id)
          throw new Error("Tenant ID not found for the user");

        // tenants テーブルからテナント情報を取得
        const { data: tenantData, error: tenantError } = await supabase
          .from("tenants" as never)
          .select("*")
          .eq("id", userData.tenant_id)
          .single();

        if (tenantError) throw tenantError;

        setTenant(tenantData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [user]);

  return { tenant, loading, error };
};
