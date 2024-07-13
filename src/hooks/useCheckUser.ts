import { useState, useEffect, use } from "react";
import useCheckSession from "./useCheckSession";
import { supabase } from "@/utils/supabase/supabase";
import { TenantType, UserType } from "@/services/schema/types";

export const useFetchUser = () => {
    const [you, setYou] = useState<null>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useCheckSession();

    useEffect(() => {
        const fetchUser = async () => {
        try {
            setLoading(true);

            if (!user) {
            throw new Error("User not authenticated");
            }

            // users テーブルから tenant_id を取得
            const { data: userData, error: userError } = await supabase
            .from("users" as never)
            .select("*")
            .eq("uuid", user.id)
            .single();

            if (userError) throw userError;
            if (!userData)
            throw new Error("Tenant ID not found for the user");

            setYou(userData);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
        };

        fetchUser();
    }, [user]);

    return { you, loading, error };
};
