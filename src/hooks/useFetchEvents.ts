import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { CategoryType, EventType, UserType } from "@/services/schema/types";
import { useFetchTenantByUserId } from "./useFetchTenantByUserId";

export const useFetchEvents = () => {
  const [events, setEvents] = useState<EventType[]>();
  const [loading, setLoading] = useState(true);
  const tenantByUserId = useFetchTenantByUserId();
  console.log(tenantByUserId?.tenantByUserId?.id);

  useEffect(() => {
    //イベントをテナントidで取得
    const fetchEvents = async () => {
      try {
        setLoading(true);

        //関連するカテゴリも一緒に取得
        const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select(`
          *,
          event_category (
            category: categories (id, name)
          )
        `)
        .eq("tenant_id", tenantByUserId?.tenantByUserId?.id);

        if (!eventsData) throw new Error("Events not found");

        if (eventsError) throw eventsError;

        setEvents(eventsData);
      } catch (e: any) {
        console.error("Error fetching events:", e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [tenantByUserId?.tenantByUserId?.id]);

  return { events, loading };
};
