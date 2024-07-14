import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";

export type UserEventAttendState = {
  id: number;
  event_id: number;
  user_id: string;
  is_attend: boolean;
};

export const useUserEventAttend = (
  event_id: number,
  userId: string | undefined
) => {
  const [userEventAttend, setUserEventAttend] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUserEventAttend = async () => {
      try {
        const { data: userEventAttend, error: userEventAttendError } =
          await supabase
            .from("user_event" as never)
            .select("is_attend")
            .eq("event_id", event_id)
            .eq("uuid", userId)
            .single();

        console.log("userEventAttend:", userEventAttend);

        if (userEventAttendError) {
          console.error(
            "Error fetching user event attend status:",
            userEventAttendError
          );
          setUserEventAttend(null);
          return;
        }

        setUserEventAttend(userEventAttend?.is_attend);
      } catch (error) {
        console.error("Error fetching user event attend status:", error);
        setUserEventAttend(null);
      }
    };

    fetchUserEventAttend();
  }, [userId, event_id]);

  return { userEventAttend };
};
