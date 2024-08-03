import dayjs from "dayjs";

export const calcPercent = (child: number, parent: number) => {
  const percent = (child / parent) * 100;
  const resultPercent = Math.round(percent * 10) / 10;
  const resultPercentUnderHundred = resultPercent > 100 ? 100 : resultPercent;
  return isNaN(resultPercent) ? 0 : resultPercentUnderHundred;
};

export const useCountDownMonthDate = () => {
  const today = dayjs();
  // 今月の日数を取得
  const daysInMonth = today.daysInMonth();
  // 今日が今月の何日目かを取得
  const dayOfMonth = today.date();
  // 経過率を計算
  const progressRate = (dayOfMonth / daysInMonth) * 100;
  return {
    lastDays: today.endOf("month").diff(dayjs(), "day"),
    progressRate: progressRate.toFixed(1),
  };
};

export const useCountDownYearDate = () => {
  const today = dayjs();
  // 今日が今月の何日目かを取得
  const dayOfMonth = today.date();
  // 経過率を計算
  const progressRate = (dayOfMonth / 365) * 100;

  // 次の6月30日
  let nextJune30 = today.month(5).date(30);
  // 次の6月30日が今日より前なら、来年の6月30日を設定
  if (today.isAfter(nextJune30)) {
    nextJune30 = nextJune30.add(1, "year");
  }
  return {
    lastDays: nextJune30.diff(today, "day"),
    progressRate: progressRate.toFixed(1),
  };
};
