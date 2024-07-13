"use client";
import { Header } from "@/layout/Header/page";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { EventBlock } from "@/components/atoms/EventBlock/page";

export default function Home() {
  const [select, setSelect] = useState<string>("all");
  return (
    <>
      <Header />
      {/* TODO: データがないときのみjustify-centerをつける */}
      <main className="flex min-h-screen flex-col px-6">
        <p className="pt-2 text-lg">ようこそ！ テナント名：本松達裕さん</p>
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
        {/* <div className="flex flex-1 w-full -mt-[152px] items-center justify-center">
          <div className="text-[#808080] text-center">
            <p className="font-semibold text-2xl">NO EVENT</p>
            <p className="font-semibold text-2xl">NO LIFE</p>
            <p className="pt-4">イベントを作成しましょう！</p>
          </div>
        </div> */}
        <div className="mt-4">
          <EventBlock />
        </div>
        <button className="absolute right-5 bottom-5 w-16 h-16 rounded-full bg-[#0584c7] text-white shadow-md">
          <AddIcon />
        </button>
      </main>
    </>
  );
}
