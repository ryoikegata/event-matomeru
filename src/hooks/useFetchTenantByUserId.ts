import { useState, useEffect } from "react";
import useCheckSession from "./useCheckSession";
import { supabase } from "@/utils/supabase/supabase";
import { TenantType } from "@/services/schema/types";

export const useFetchTenantByUserId = () => {
  const [tenantByUserId, setTenantByUserId] = useState<TenantType>();
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
          .from("users")
          .select("tenant_id")
          .eq("uuid", user.id)
          .single();

        if (userError) throw userError;
        if (!userData.tenant_id)
          throw new Error("Tenant ID not found for the user");

        // tenants テーブルからテナント情報を取得
        const { data: tenantData, error: tenantError } = await supabase
          .from("tenants")
          .select("*")
          .eq("id", userData.tenant_id)
          .single();

        if (tenantError) throw tenantError;

        setTenantByUserId(tenantData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [user]);

  return { tenantByUserId, loading, error };
};
