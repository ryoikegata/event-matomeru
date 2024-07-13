"use client";
import { Header } from "@/layout/Header/page";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useState } from "react";
import { EditableEventBlock, EventBlock } from "@/components/atoms/EventBlock/page";
import { SwipeableDrawer } from "@/components/organisms/SwipeableDrawer/page";
import { AttendForm } from "@/components/organisms/AttendForm/page";
import { SimpleDialog } from "@/components/organisms/Dialog/page";
import Link from "next/link";

export default function Home() {
  const [select, setSelect] = useState<string>("all");
  const [opened, setOpened] = useState(false);
  const [openUserList, setOpenUserList] = useState(false);

  const handleOpenUserList = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setOpenUserList(true);
    },
    []
  );

  return (
    <>
      <Header />
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
          <EditableEventBlock
            onClick={() => setOpened(true)}
            handleOpenUserList={handleOpenUserList}
          />
        </div>
        <SwipeableDrawer
          opened={opened}
          speed={300}
          easingType="easeOutCubic"
          onClose={() => setOpened(false)}
        >
          <AttendForm />
        </SwipeableDrawer>
        <SimpleDialog
          open={openUserList}
          onClose={() => setOpenUserList(false)}
        />
      </main>
    </>
  );
}
