import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/services/schema";
import { EventType } from "@/services/schema/types";
import { supabase } from "@/utils/supabase/supabase";
import { useFetchTenant } from "@/hooks/useFetchTenant";

export const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventType>({
    resolver: zodResolver(EventSchema),
  });

  const { tenant } = useFetchTenant();
  const tenant_id = tenant?.[0].id;

  const onSubmit = async (data: EventType) => {
    const { data: event, error } = await supabase
      .from("events")
      .insert({ tenant_id: tenant_id, ...data });
    if (error) {
      console.log(error);
    } else {
      console.log("Event created successfully:", event);
      window.location.reload(); // ページをリロードする
    }
  };

  return (
    <form
      action=""
      className="bg-white px-3 pt-4 pb-6"
      onSubmit={handleSubmit(onSubmit)}
    >
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
            {...register("name", { required: "入力が必須の項目です。" })}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            開始日時<span className="text-red-500"> *</span>
          </label>
          <input
            type="datetime-local"
            placeholder="イベント名を入力してください"
            className="border px-3 py-2 mt-1 rounded w-full"
            {...register("start_at", { required: "入力が必須の項目です。" })}
          />
          <p>{errors.start_at?.message}</p>
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            終了日時<span className="text-red-500"> *</span>
          </label>
          <input
            type="datetime-local"
            placeholder="イベント名を入力してください"
            className="border px-3 py-2 mt-1 rounded w-full"
            {...register("end_at", { required: "入力が必須の項目です。" })}
          />
          <p>{errors.end_at?.message}</p>
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            募集締切日<span className="text-red-500"> *</span>
          </label>
          <input
            type="datetime-local"
            placeholder="イベント名を入力してください"
            className="border px-3 py-2 mt-1 rounded w-full"
            {...register("exp_at", { required: "入力が必須の項目です。" })}
          />
          <p>{errors.exp_at?.message}</p>
        </div>
        <div className="w-full">
          <label className="font-bold text-sm">
            イベント詳細<span className="text-red-500"> *</span>
          </label>
          <textarea
            id=""
            placeholder="イベントの詳細を入力してください"
            className="border px-3 py-2 mt-1 rounded w-full resize-none"
            rows={7}
            {...register("description", { required: "入力が必須の項目です。" })}
          ></textarea>
          <p>{errors.description?.message}</p>
        </div>
        <button className="text-white bg-[#0584c7] rounded-full w-72 text-lg font-bold py-2">
          作成
        </button>
      </div>
    </form>
  );
};
