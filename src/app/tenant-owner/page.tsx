"use client";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import { EditableEventBlock } from "@/components/atoms/EditableEventBlock/page";
import { SwipeableDrawer } from "@/components/organisms/SwipeableDrawer/page";
import { AttendForm } from "@/components/organisms/AttendForm/page";
import { SimpleDialog } from "@/components/organisms/Dialog/page";
import Link from "next/link";
import { TenantHeader } from "@/layout/TenantHeader/Page";
import useCheckSession from "@/hooks/useCheckSession";
import { useFetchTenantByUserId } from "@/hooks/useFetchTenantByUserId";
import { useFetchEventsByTenantId } from "@/hooks/useFetchEventsByTentnId";

export default function Home() {
  const user = useCheckSession();
  const name = user?.user_metadata.full_name;

  const { tenantByUserId, loading: tenantLoading } = useFetchTenantByUserId();
  const tenantName = tenantByUserId?.name;
  const tenantId = tenantByUserId?.id as number | undefined;

  const { events, loading: eventLoading } = useFetchEventsByTenantId(tenantId);

  if (tenantLoading || eventLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <TenantHeader />
      <main
        className={`${
          events.length === 0 ? "justify-center" : ""
        } flex min-h-screen flex-col px-6 mt-20`}
      >
        <p className="pt-2 text-lg">{`ようこそ！ ${tenantName}：${name}さん`}</p>
        <h1 className="flex pt-6 text-3xl font-bold">イベント一覧</h1>
        {events.length === 0 && (
          <div className="flex flex-1 w-full -mt-[152px] items-center justify-center">
            <div className="text-[#808080] text-center">
              <p className="font-semibold text-2xl">NO EVENT</p>
              <p className="font-semibold text-2xl">NO LIFE</p>
              <p className="pt-4">イベントを作成しましょう！</p>
            </div>
          </div>
        )}
        <div className="mt-4 flex flex-col w-full gap-2">
          {events.map((event) => (
            <EditableEventBlock key={event.id} event={event} />
          ))}
        </div>
      </main>
    </>
  );
}
