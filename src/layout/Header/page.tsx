import { FC } from "react";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <header className="fixed top-0 w-full shadow-md px-6 py-4 flex items-center justify-between bg-white">
      <Image src="/logo.svg" alt="Logo" width={140} height={50} />
      <div className="flex items-center gap-4">
        <button className="flex flex-col items-center gap-1 cursor-pointer">
          <Image src="/admin.svg" alt="Admin" width={24} height={24} />
          <p className="text-[#000000] text-[10px]">管理画面</p>
        </button>
        <button className="flex flex-col items-center gap-2 cursor-pointer">
          <Image src="/logout.svg" alt="Logout" width={24} height={30} />
          <p className="text-[#000000] text-[10px]">ログアウト</p>
        </button>
      </div>
    </header>
  );
};
