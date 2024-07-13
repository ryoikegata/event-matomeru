"use client";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import { EditableEventBlock } from "@/components/atoms/EditableEventBlock/page";
import { SwipeableDrawer } from "@/components/organisms/SwipeableDrawer/page";
import { AttendForm } from "@/components/organisms/AttendForm/page";
import { SimpleDialog } from "@/components/organisms/Dialog/page";
import Link from "next/link";
import { TenantHeader } from "@/layout/TenantHeader/Page";

export default function Home() {
  return (
    <>
      <TenantHeader />
      {/* TODO: データがないときのみjustify-centerをつける */}
      <main className="flex min-h-screen flex-col px-6 mt-20">
        <p className="pt-2 text-lg">ようこそ！ テナント名：本松達裕さん</p>
        <h1 className="flex pt-6 text-3xl font-bold">イベント一覧</h1>
        {/* TODO: データを取得したらコメントアウト解除 */}
        {/* <div className="flex flex-1 w-full -mt-[152px] items-center justify-center">
          <div className="text-[#808080] text-center">
            <p className="font-semibold text-2xl">NO EVENT</p>
            <p className="font-semibold text-2xl">NO LIFE</p>
            <p className="pt-4">イベントを作成しましょう！</p>
          </div>
        </div> */}
        <div className="mt-4">
          {/* FIXME: 一旦コメントアウト */}
          {/* <EditableEventBlock /> */}
        </div>
      </main>
    </>
  );
}
