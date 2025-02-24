import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchUser } from "@/hooks/useCheckUser";

export const Header: FC = () => {
  const you = useFetchUser();
  const userRole = you.you?.role_id;

  return (
    <header className="fixed top-0 w-full shadow-md pl-4 pr-6 py-4 flex items-center justify-between bg-white">
      <Link href="/">
        <Image src="/event-matomeru.svg" alt="Logo" width={180} height={50} />
      </Link>
      <div className="flex items-center gap-4">
        {userRole !== 3 ? (
          <Link href="/tenant-owner">
            <button className="flex flex-col items-center gap-1 cursor-pointer">
              <Image src="/admin.svg" alt="Admin" width={24} height={24} />
              <p className="text-[#000000] text-[10px]">管理画面</p>
            </button>
          </Link>
        ) : null}
        <button className="flex flex-col items-center gap-2 cursor-pointer">
          <Image src="/logout.svg" alt="Logout" width={24} height={30} />
          <p className="text-[#000000] text-[10px]">ログアウト</p>
        </button>
      </div>
    </header>
  );
};
