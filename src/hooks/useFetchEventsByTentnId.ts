import { useState, useEffect, useCallback } from "react";
import { EventType } from "@/services/schema/types";
import { supabase } from "@/utils/supabase/supabase";

export const useFetchEventsByTenantId = (tenantId: number | undefined) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!tenantId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data: fetchedEvents, error: fetchError } = await supabase
        .from("events")
        .select("*")
        .eq("tenant_id", tenantId);

      if (fetchError) {
        throw new Error(fetchError.message);
      }

      setEvents(fetchedEvents as EventType[]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error };
};
