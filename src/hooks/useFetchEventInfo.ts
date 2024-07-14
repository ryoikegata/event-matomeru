import { supabase } from "@/utils/supabase/supabase";
import { use, useEffect, useState } from "react";
import { CategoryType, EventInfo, EventType, UserType } from "@/services/schema/types";

export const useFetchEventInfo = async (eventId: number): Promise<EventInfo | null> => {
      try {
        // イベント情報を取得
        const { data: eventData, error: eventError } = await supabase
          .from("events" as never)
          .select(`
            *,
            event_category (
              category: categories (id, name)
            ),
            user_event (
            is_attend,
              user: users (uuid, name, email)
            )
          `)
          .match({ id: eventId, "user_event.is_attend": true })
          .single();

        if (eventError) throw eventError;
        return eventData as EventInfo;
      } catch (e: any) {
        console.error("Error fetching event info:", e.message);
        throw e;
      }
};
