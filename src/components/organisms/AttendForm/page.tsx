import { updateUserEventAttend } from "@/hooks/updateUserEventAttend";
import { useFetchEventInfo } from "@/hooks/useFetchEventInfo";
import { EventInfo, EventType } from "@/services/schema/types";
import { formatDate, formatDateTime } from "@/utils/dayjs";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type Props = {
  event: EventInfo;
  userId: string | undefined;
};

type AttendFormType = {
  is_attend: boolean;
};
export const AttendForm:FC<Props> = ({ event, userId }) => {
  const { handleSubmit, setValue } = useForm<AttendFormType>();


  const onSubmit = async (data: AttendFormType) => {
    await updateUserEventAttend(userId, event?.id, data.is_attend);
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="bg-white px-3 pt-4 pb-6">
      <div className="pb-3 border-b border-[#cccccc]">
        <p className="font-semibold">{event?.name}</p>
        <p className="text-sm pt-2">{formatDate(event?.start_at)}</p>
        <p className="text-xs pt-2">{formatDateTime(event?.start_at)}-{formatDateTime(event?.end_at)}</p>
        <div className="flex justify-between items-end pt-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#0584c7] rounded-sm">
              <p className="text-xs pt-2 text-white px-2 py-1">{event?.event_category[0]?.category?.name}</p>
            </div>
          </div>
          <button className="text-sm">{event?.user_event.length}人参加</button>
        </div>
      </div>
      <div className="border-b border-[#cccccc]">
        <p className="py-5 text-sm">
          {event?.description}
        </p>
      </div>
      <div className="pt-5 flex flex-col gap-2">
        <div className="pt-4 text-center">
          <p className="text-[#808080] font-semibold">未回答</p>
          <p className="text-xs pt-2 text-[#808080]">
            参加可否を回答しましょう！
          </p>
        </div>
      </div>
      <div className="pt-4 flex items-center gap-2">
        <button type="submit" className="w-1/2 border border-[#c74502] text-[#c74502] rounded-full px-4 py-1" onClick={() => setValue("is_attend", false)}>
          不参加
        </button>
        <button type="submit" className="w-1/2 border border-[#21c702] text-[#21c702] rounded-full px-4 py-1" onClick={() => setValue("is_attend", true)}>
          参加
        </button>
      </div>
    </form>
  );
};
