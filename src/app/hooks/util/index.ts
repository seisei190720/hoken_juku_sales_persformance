import dayjs from "dayjs";
import { useState } from "react";

export const calcPercent = (
  child: number,
  parent: number,
  exceedHundred: boolean
) => {
  const percent = (child / parent) * 100;
  const resultPercent = Math.round(percent * 10) / 10;
  if (isNaN(resultPercent)) {
    return 0;
  }
  if (exceedHundred) {
    return resultPercent;
  }
  return resultPercent > 100 ? 100 : resultPercent;
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

  // 次の6月30日
  let nextJune30 = today.month(5).date(30);
  // 次の6月30日が今日より前なら、来年の6月30日を設定
  if (today.isAfter(nextJune30)) {
    nextJune30 = nextJune30.add(1, "year");
  }
  const lastDays = nextJune30.diff(today, "day");
  // 経過率を計算
  const progressDays = 365 - lastDays;
  const progressRate = (progressDays / 365) * 100;

  return {
    lastDays,
    progressRate: progressRate.toFixed(1),
  };
};

export const useBoolean = (defaultBool: boolean) => {
  const [bool, setBool] = useState(defaultBool);
  const handleTrue = () => {
    setBool(true);
  };
  const handleFalse = () => {
    setBool(false);
  };

  const handleToggle = () => {
    setBool((pre) => !pre);
  };
  return {
    bool,
    setBool,
    handleTrue,
    handleFalse,
    handleToggle,
  };
};
