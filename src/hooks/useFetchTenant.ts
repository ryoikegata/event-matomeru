import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { TenantType } from "@/services/schema/types";

export const useFetchTenant = () => {
  const [tenant, setTenant] = useState<TenantType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        setLoading(true);

        // tenants テーブルからテナント情報を取得
        const { data: tenantData, error: tenantError } = await supabase
          .from("tenants" as never)
          .select("*");

        if (tenantError) throw tenantError;

        setTenant(tenantData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, []);

  return { tenant, loading, error };
};
