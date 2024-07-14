"use client";
import { Header } from "@/layout/Header/page";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState, useEffect } from "react";
import { EventBlock } from "@/components/atoms/EventBlock/page";
import { SwipeableDrawer } from "@/components/organisms/SwipeableDrawer/page";
import { AttendForm } from "@/components/organisms/AttendForm/page";
import { SimpleDialog } from "@/components/organisms/Dialog/page";
import { CreateEventForm } from "@/components/organisms/CreateEventForm/page";
import useCheckSession from "@/hooks/useCheckSession";
import { EventInfo, EventType } from "@/services/schema/types";
import { useFetchEvents } from "@/hooks/useFetchEvents";
import { useFetchEventInfo } from "@/hooks/useFetchEventInfo";
import { useFetchTenantByUserId } from "@/hooks/useFetchTenantByUserId";

export default function Home() {
  const [select, setSelect] = useState<string>("all");
  const [opened, setOpened] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [selectEventId, setSelectEventId] = useState<number>(0);
  const [selectEvent, setSelectEvent] = useState<EventInfo | null>(null);

  const { event } = useFetchEventInfo(selectEventId);

  const handleOpenEvent = useCallback(
    (eventId: number) => {
      setOpened(true);
      setSelectEventId(eventId);
      setSelectEvent(event);
    },
    [setOpened, setSelectEventId, setSelectEvent, event]
  );

  useEffect(() => {
    if (selectEventId) {
      setSelectEvent(event);
      console.log(event);
    }
  }, [selectEventId, event]);

  const handleOpenUserList = useCallback(
    (eventId: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenUserList(true);
      setSelectEventId(eventId);
    },
    [setOpenUserList, setSelectEventId]
  );

  const user = useCheckSession();
  const name = user?.user_metadata.full_name;

  const tenantByUserId = useFetchTenantByUserId();

  const { events } = useFetchEvents();

  return (
    <>
      <Header />
      {/* TODO: データがないときのみjustify-centerをつける */}
      <main className="flex min-h-screen flex-col px-6 mt-20">
        <p className="pt-2 text-lg">{`ようこそ！ ${tenantByUserId.tenantByUserId?.name}：${name}さん`}</p>
        <h1 className="flex pt-6 text-3xl font-bold">イベント一覧</h1>
        <div className="flex items-center gap-2 pt-4">
          <button
            className={`w-1/4 rounded-md px-3 py-1 font-medium ${
              select === "all"
                ? "bg-[#0584c7] text-white border-0"
                : "bg-white text-[#0584c7] border border-[#0584c7]"
            }`}
            onClick={() => setSelect("all")}
          >
            全て
          </button>
          <button
            className={`w-1/4 rounded-md px-3 py-1 font-medium ${
              select === "attend"
                ? "bg-[#0584c7] text-white border-0"
                : "bg-white text-[#0584c7] border border-[#0584c7]"
            }`}
            onClick={() => setSelect("attend")}
          >
            参加
          </button>
          <button
            className={`w-1/4 rounded-md px-3 py-1 font-medium ${
              select === "notAttend"
                ? "bg-[#0584c7] text-white border-0"
                : "bg-white text-[#0584c7] border border-[#0584c7]"
            }`}
            onClick={() => setSelect("notAttend")}
          >
            不参加
          </button>
          <button
            className={`w-1/4 rounded-md px-3 py-1 font-medium ${
              select === "notReply"
                ? "bg-[#0584c7] text-white border-0"
                : "bg-white text-[#0584c7] border border-[#0584c7]"
            }`}
            onClick={() => setSelect("notReply")}
          >
            未回答
          </button>
        </div>
        {events?.length === 0 && (
          <div className="flex flex-1 w-full -mt-[152px] items-center justify-center">
            <div className="text-[#808080] text-center">
              <p className="font-semibold text-2xl">NO EVENT</p>
              <p className="font-semibold text-2xl">NO LIFE</p>
              <p className="pt-4">イベントを作成しましょう！</p>
            </div>
          </div>
        )}
        {events?.map((event: EventType) => (
          <div className="mt-4" key={event.id}>
            <EventBlock
              onClick={() => handleOpenEvent(event.id)}
              handleOpenUserList={handleOpenUserList}
              event={event}
              userId={user?.id}
            />
          </div>
        ))}
        <button
          onClick={() => setOpenCreateEvent(true)}
          className=" fixed right-5 bottom-5 w-16 h-16 rounded-full bg-[#0584c7] text-white shadow-md"
        >
          <AddIcon />
        </button>
        <SwipeableDrawer
          opened={opened}
          speed={300}
          easingType="easeOutCubic"
          onClose={() => setOpened(false)}
        >
          {selectEvent !== null && <AttendForm event={selectEvent} />}
        </SwipeableDrawer>
        <SwipeableDrawer
          opened={openCreateEvent}
          speed={300}
          easingType="easeOutCubic"
          onClose={() => setOpenCreateEvent(false)}
        >
          <CreateEventForm />
        </SwipeableDrawer>
        {selectEvent !== null && (
          <SimpleDialog
            open={openUserList}
            onClose={() => setOpenUserList(false)}
            event={selectEvent}
          />
        )}
      </main>
    </>
  );
}
