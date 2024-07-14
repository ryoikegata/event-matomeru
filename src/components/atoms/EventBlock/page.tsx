"use client";
import { FC } from "react";
import Image from "next/image";
import { EventType } from "@/services/schema/types";
import { formatDate, formatDateTime } from "@/utils/dayjs";
import { useUserEventAttend } from "@/hooks/useUserEventAttend";
import { useFetchCategoriesByEvent } from "@/hooks/useFetchCategoriesByEvent";

type Props = {
  onClick: () => void;
  handleOpenUserList: (eventId: number, e: React.MouseEvent) => void;
  event: EventType;
  userId: string | undefined;
};

export const EventBlock: FC<Props> = ({
  onClick,
  handleOpenUserList,
  event,
  userId,
}) => {
  const categoryList = useFetchCategoriesByEvent(event.id);
  const categories = categoryList.categories;

  const userEventAttend = useUserEventAttend(event.id, userId);

  const attendStatus = () => {
    if (userEventAttend.userEventAttend) {
      return (
        <div className="flex items-center gap-1">
          <Image src="/attend-check-icon.svg" alt="" width={20} height={20} />
          <span className="text-[#21c702] text-xs">参加</span>
        </div>
      );
    } else if (userEventAttend.userEventAttend === null) {
      return (
        <div className="flex items-center gap-1">
          <Image
            src="/notAnswer-check-icon.svg"
            alt=""
            width={20}
            height={20}
          />
          <span className="text-[#808080] text-xs">未回答</span>
        </div>
      );
    } else if (!userEventAttend.userEventAttend) {
      return (
        <div className="flex items-center gap-1">
          <Image
            src="/notAttend-check-icon.svg"
            alt=""
            width={20}
            height={20}
          />
          <span className="text-[#C74502] text-xs">不参加</span>
        </div>
      );
    }
  };
  return (
    // TODO: 各値はpropsで受け取る
    <div
      className="border-t-2 border-r-2 border-b-2 border-l-4 border-[#0584c7] py-2 px-4 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between">
        <h2 className="font-semibold">{event.name}</h2>
        {attendStatus()}
      </div>
      <p className="text-sm pt-2">{formatDate(event.start_at)}</p>
      <p className="text-xs pt-2">
        {formatDateTime(event.start_at)}-{formatDateTime(event.end_at)}
      </p>
      <div className="flex justify-between items-end pt-2">
        <div className="flex items-center gap-3">
          {categories.map((category) => (
            <div key={category.id} className="bg-[#0584c7] rounded-sm">
              <p className="text-xs pt-2 text-white px-2 py-1">
                {category.name}
              </p>
            </div>
          ))}
        </div>

        <button
          className="text-xs underline"
          onClick={(e) => handleOpenUserList(event.id, e)}
        >
          参加者一覧を見る
        </button>
      </div>
    </div>
  );
};
