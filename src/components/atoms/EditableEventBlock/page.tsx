import { EventType } from "@/services/schema/types";
import Link from "next/link";
import { FC } from "react";
import dayjs from "dayjs";
import { useFetchCategoriesByEvent } from "@/hooks/useFetchCategoriesByEvent";
import "dayjs/locale/ja";

type Props = {
  event: EventType;
};

export const EditableEventBlock: FC<Props> = ({ event }) => {
  dayjs.locale("ja");
  const categoryList = useFetchCategoriesByEvent(event.id);
  const categories = categoryList.categories;
  const startDate = dayjs(event.start_at).format("M/D");
  const startDateKana = dayjs(event.start_at).format("MM月DD日");
  const startTime = dayjs(event.start_at).format("HH:mm");
  const endTime = dayjs(event.end_at).format("HH:mm");
  const day = dayjs().format("ddd");

  return (
    <div className="border-t-2 border-r-2 border-b-2 border-l-4 border-[#0584c7] py-2 px-4 rounded-lg cursor-pointer flex justify-between">
      <div>
        <div className="flex justify-between">
          <h2 className="font-semibold">{`${event.name} ${startDate} ${startTime}`}</h2>
        </div>
        <p className="text-sm pt-2">{`${startDateKana}（${day}）`}</p>
        <p className="text-xs pt-2">{`${startTime}-${endTime}`}</p>
        <div className="flex justify-between items-end pt-2">
          <div className="flex items-center gap-3">
            {categories.map((category) => (
              <div key={category.id} className="bg-[#0584c7] rounded-sm">
                <p className="text-xs pt-2 text-white px-2 py-1">{`${category.name}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-4 mt-4">
        <Link href={"/tenant-owner/userStatus"}>
          <button className="text-xs underline">参加者一覧を見る</button>
        </Link>
        <button className="text-xs underline">編集</button>
        <button className="text-xs underline">削除</button>
      </div>
    </div>
  );
};
