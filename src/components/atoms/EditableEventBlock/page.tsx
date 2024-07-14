import Link from "next/link";

export const EditableEventBlock = () => {
  return (
    // TODO: 各値はpropsで受け取る
    <div className="border-t-2 border-r-2 border-b-2 border-l-4 border-[#0584c7] py-2 px-4 rounded-lg cursor-pointer flex justify-between">
      <div>
        <div className="flex justify-between">
          <h2 className="font-semibold">課題サポ 6/24 10:00</h2>
        </div>
        <p className="text-sm pt-2">2023年6月24日（水）</p>
        <p className="text-xs pt-2">10:00-12:00</p>
        <div className="flex justify-between items-end pt-2">
          {/* TODO: カテゴリの個数によって変更（mapを使う） */}
          <div className="flex items-center gap-3">
            <div className="bg-[#0584c7] rounded-sm">
              <p className="text-xs pt-2 text-white px-2 py-1">オンライン</p>
            </div>
            <div className="bg-[#0584c7] rounded-sm">
              <p className="text-xs pt-2 text-white px-2 py-1">機械学習</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-4 mt-4">
        <Link href={"/tenant-owner/userStatus"}>
          <button className="text-xs underline">参加者一覧を見る</button>
        </Link>
        <button className="text-xs underline">編集</button>
        <button className="text-xs underline">削除</button>
      </div>
    </div>
  );
};
