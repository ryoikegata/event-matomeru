import React, { FC } from "react";

export const AttendForm: FC = () => {
  return (
    <form action="" className="bg-white px-3 pt-4 pb-6">
      <div className="pb-3 border-b border-[#cccccc]">
        <p className="font-semibold">課題サポ 6/24 10:00</p>
        <p className="text-sm pt-2">2023年6月24日（水）</p>
        <p className="text-xs pt-2">10:00-12:00</p>
        <div className="flex justify-between items-end pt-2">
          <div className="flex items-center gap-3">
            <div className="bg-[#0584c7] rounded-sm">
              <p className="text-xs pt-2 text-white px-2 py-1">オンライン</p>
            </div>
            <div className="bg-[#0584c7] rounded-sm">
              <p className="text-xs pt-2 text-white px-2 py-1">機械学習</p>
            </div>
          </div>
          <button className="text-sm">12人参加</button>
        </div>
      </div>
      <div className="border-b border-[#cccccc]">
        <p className="py-5 text-sm">
          明日は課題サポート会！
          新人ハッカソンを全力で駆け抜けるためにも対策をしっかりとしましょう！
          3期生一同待っています✨
        </p>
      </div>
      <div className="pt-5 flex flex-col gap-2">
        <label className="font-semibold text-base">備考（任意）</label>
        <input
          type="text"
          className="border border-[#cccccc] rounded-sm px-3 py-2"
          placeholder="例） 14:30から遅れて参加します。。"
        />
        <div className="pt-4 text-center">
          <p className="text-[#808080] font-semibold">未回答</p>
          <p className="text-xs pt-2 text-[#808080]">
            参加可否を回答しましょう！
          </p>
        </div>
      </div>
      <div className="pt-4 flex items-center gap-2">
        <button className="w-1/2 border border-[#c74502] text-[#c74502] rounded-full px-4 py-1">
          不参加
        </button>
        <button className="w-1/2 border border-[#21c702] text-[#21c702] rounded-full px-4 py-1">
          参加
        </button>
      </div>
    </form>
  );
};
