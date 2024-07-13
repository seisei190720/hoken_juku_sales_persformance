import { IndividualSalesResult, RouteMst } from "@/app/types";
import {
  amber,
  deepOrange,
  green,
  lightGreen,
  orange,
  teal,
} from "@mui/material/colors";
import { useMemo } from "react";

export const useStoreAchievementData = (
  results: IndividualSalesResult[] | undefined
) => {
  const visitorAndAppointment = useMemo(() => {
    return [
      {
        name: "江澤誠哉",
        新規数: 24,
        既契約数: 18,
        次アポ取得数: 30,
        nextAppointMentPercent: 43,
      },
      {
        name: "野比のび太",
        新規数: 14,
        既契約数: 35,
        次アポ取得数: 31,
        nextAppointMentPercent: 39,
      },
      {
        name: "源しずか",
        新規数: 28,
        既契約数: 12,
        次アポ取得数: 20,
        nextAppointMentPercent: 31,
      },
      {
        name: "剛田武",
        新規数: 28,
        既契約数: 12,
        次アポ取得数: 20,
        nextAppointMentPercent: 31,
      },
      {
        name: "骨川スネ夫",
        新規数: 28,
        既契約数: 12,
        次アポ取得数: 20,
        nextAppointMentPercent: 31,
      },
      {
        name: "出来杉英才",
        新規数: 28,
        既契約数: 12,
        次アポ取得数: 20,
        nextAppointMentPercent: 31,
      },
      {
        name: "ドラえもん",
        新規数: 28,
        既契約数: 12,
        次アポ取得数: 20,
        nextAppointMentPercent: 31,
      },
    ];
  }, [results]);

  const countAndPercentData = [
    {
      name: "江澤誠哉",
      件数: 53,
      率: 70,
    },
    {
      name: "野比のび太",
      件数: 12,
      率: 32,
    },
    {
      name: "源しずか",
      件数: 25,
      率: 87,
    },
    {
      name: "剛田武",
      件数: 76,
      率: 70,
    },
    {
      name: "骨川スネ夫",
      件数: 23,
      率: 64,
    },
    {
      name: "出来杉英才",
      件数: 16,
      率: 23,
    },
    {
      name: "ドラえもん",
      件数: 23,
      率: 45,
    },
  ];
  return { visitorAndAppointment, countAndPercentData };
};
