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
        <h1 className="flex pt-6 text-3xl font-bold">イベント作成</h1>
        <div className="flex flex-col items-center gap-4 pt-4">
          <div className="">
            <h2 className="font-bold">イベント名<span className="text-red-500"> *</span></h2>
            <input type="text" placeholder="イベント名を入力してください" className="border p-1 rounded w-300"/>
          </div>
          <div className="">
            <h2 className="font-bold">開始日時<span className="text-red-500"> *</span></h2>
            <input type="datetime-local" placeholder="イベント名を入力してください" className="border p-1 rounded w-300"/>
          </div>
          <div className="">
            <h2 className="font-bold">終了日時<span className="text-red-500"> *</span></h2>
            <input type="datetime-local" placeholder="イベント名を入力してください" className="border p-1 rounded w-300"/>
          </div>
          <div className="">
            <h2 className="font-bold">イベント詳細</h2>
            <textarea name="" id="" placeholder="イベントの詳細を入力してください" className="border p-1 rounded w-300 resize-none" rows={7}></textarea>
          </div>
          <button className="text-white bg-blue-500 rounded-full w-72 text-lg font-bold py-2">作成</button>
        </div>
      </main>
    </>
  );
}
