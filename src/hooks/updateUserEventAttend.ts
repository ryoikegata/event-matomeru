import { supabase } from "@/utils/supabase/supabase";
import { toast } from "react-toastify";

export const updateUserEventAttend = async (
  userId: string | undefined,
  eventId: number,
  attend: boolean
) => {
  try {
    //あるかどうかの確認
    const { data: userEventAttendData } = await supabase
    .from("user_event" as never)
    .select("id")
    .eq("event_id", eventId)
    .eq("uuid", userId)
    .single();


    if (userEventAttendData) {
      //ある場合は更新
      const { error: updatedUserEventAttendError } = await supabase
      .from("user_event" as never)
      .update({ is_attend: attend })
      .eq("id", userEventAttendData.id);

      if (updatedUserEventAttendError) {
        console.error("Error updating user event attend status:", updatedUserEventAttendError);
      }
    } else {
      //ない場合は新規作成
      const {  error: newUserEventAttendError } = await supabase
      .from("user_event" as never)
      .insert([{ event_id: eventId, uuid: userId, is_attend: attend }]);

      if (newUserEventAttendError) {
        console.error("Error creating user event attend status:", newUserEventAttendError);
      }
    }
    return;
  } catch (error) {
    console.error("Error updating user event attend status:", error);
    throw error;
  }
}
