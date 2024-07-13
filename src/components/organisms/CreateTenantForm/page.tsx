import { FC } from "react";

export const CreateTenantForm: FC = () => {
  return (
    <form action="" className="bg-white px-3 pt-4 pb-6">
      <h1 className="font-bold text-xl">テナント作成</h1>
      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="w-full">
          <label className="font-bold text-sm">
            テナント名<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            placeholder="テナント名を入力してください"
            className="border px-3 py-2 mt-1 w-full rounded"
          />
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            メールアドレス<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            placeholder="メールアドレスを入力してください"
            className="border px-3 py-2 mt-1 w-full rounded"
          />
        </div>
        <button className="text-white bg-[#0584c7] rounded-full w-72 text-lg font-bold py-2">
          作成
        </button>
      </div>
    </form>
  );
};
