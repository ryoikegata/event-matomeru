import dayjs from "dayjs";

export const formatDate = (date: string) => {
  //曜日も日本語にする
  const day = ["日", "月", "火", "水", "木", "金", "土"];
  return `${dayjs(date).format("YYYY年MM月DD日")}(${day[dayjs(date).day()]})`;
};
export const formatDateTime = (date: string) => {
  return dayjs(date).format("HH:mm");
}
