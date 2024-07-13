import { FC } from "react";

export const CreateEventForm: FC = () => {
  return (
    <form action="" className="bg-white px-3 pt-4 pb-6">
      <h1 className="flex pt-6 text-xl font-bold">イベント作成</h1>
      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="w-full">
          <label className="font-bold text-sm">
            イベント名<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            placeholder="イベント名を入力してください"
            className="border px-3 py-2 mt-1 w-full rounded"
          />
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            開始日時<span className="text-red-500"> *</span>
          </label>
          <input
            type="datetime-local"
            placeholder="イベント名を入力してください"
            className="border px-3 py-2 mt-1 rounded w-full"
          />
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            終了日時<span className="text-red-500"> *</span>
          </label>
          <input
            type="datetime-local"
            placeholder="イベント名を入力してください"
            className="border px-3 py-2 mt-1 rounded w-full"
          />
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            イベント詳細<span className="text-red-500"> *</span>
          </label>
          <textarea
            name=""
            id=""
            placeholder="イベントの詳細を入力してください"
            className="border px-3 py-2 mt-1 rounded w-full resize-none"
            rows={7}
          ></textarea>
        </div>
        <button className="text-white bg-[#0584c7] rounded-full w-72 text-lg font-bold py-2">
          作成
        </button>
      </div>
    </form>
  );
};
