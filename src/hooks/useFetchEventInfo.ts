import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState, useCallback } from "react";
import { EventInfo } from "@/services/schema/types";

export const useFetchEventInfo = (eventId: number) => {
  const [event, setEvent] = useState<EventInfo | null>(null);

  const fetchEvent = useCallback(async () => {
    try {
      const { data: eventData, error: eventError } = await supabase
        .from("events" as never)
        .select(
          `
          *,
          event_category (
            category: categories (id, name)
          ),
          user_event (
          is_attend,
            user: users (uuid, name, email)
          )
        `
        )
        .match({ id: eventId, "user_event.is_attend": true })
        .single();

      if (eventError) throw eventError;
      if (!eventData) throw new Error("Event not found");

      setEvent(eventData as EventInfo);
    } catch (e: any) {
      console.error("Error fetching event info:", e.message);
      throw e;
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { event };
};
