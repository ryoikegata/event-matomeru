import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase";
import { CategoryType, EventType, UserType } from "@/services/schema/types";
import useCheckSession from "./useCheckSession";
import { useFetchTenant } from "./useFetchTenant";

export const useFetchEvents = () => {
  const [events, setEvents] = useState<EventType[]>();
  const [loading, setLoading] = useState(true);
  const tenant = useFetchTenant();
  const tenantId = tenant?.tenant?.id;

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
        .eq("tenant_id", tenantId);

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
  }, [tenant?.tenant?.id]);

  return { events, loading };
};
