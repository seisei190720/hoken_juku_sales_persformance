import { CountAndPercentType } from "@/app/store/hooks/useStoreAchievementData";
import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  Member,
  ProductMst,
  RouteMst,
  StatusMst,
  yearMonth,
} from "@/app/types";
import { useCallback, useMemo } from "react";

export type YearlyVisitorAndNextAppointmentType = {
  name: string;
  新規数: number;
  既契約数: number;
  全体数: number;
  次アポ数: number;
  nextAppointmentPercent: number;
};

export const useYearlyAchievementComposition = (
  results: IndividualSalesResult[] | undefined,
  // members: Member[],
  routeMst: RouteMst[]
  // consultContentMst: ConsultContentMst[],
  // productMst: ProductMst[],
  // companyMst: CompanyMst[],
  // statusMst: StatusMst[]
) => {
  const resolveRouteKind = useCallback(
    (v: string) => {
      return routeMst.find((r) => r.id == v)?.kind;
    },
    [routeMst]
  );

  const getTargetMonthData = useCallback(
    (target: IndividualSalesResult[], month: string) =>
      target.filter((r) => r.firstVisitDate.indexOf(month) !== -1),
    []
  );

  const newVisitor = useCallback(
    (target: IndividualSalesResult[]) =>
      target.filter((v) => resolveRouteKind(v.visitRoute) === "new"),
    [resolveRouteKind]
  );

  const existVisitor = useCallback(
    (target: IndividualSalesResult[]) =>
      target.filter((v) => resolveRouteKind(v.visitRoute) === "exist"),
    [resolveRouteKind]
  );

  const nextAppointor = useCallback(
    (target: IndividualSalesResult[]) =>
      target.filter((v) => v.nextAppointment),
    []
  );

  const visitorAndNextAppointmentData:
    | YearlyVisitorAndNextAppointmentType[]
    | undefined = useMemo(() => {
    if (!results) return;
    return yearMonth.map((y) => {
      const targetMonth = getTargetMonthData(results, y.keyMonthDate);
      const nextAppointmentCount = nextAppointor(targetMonth).length;
      const nextAppointmentPercent =
        (nextAppointmentCount / targetMonth.length) * 100;
      const resultPercent = Math.round(nextAppointmentPercent * 10) / 10;
      return {
        name: y.name,
        新規数: newVisitor(targetMonth).length,
        既契約数: existVisitor(targetMonth).length,
        全体数: targetMonth.length,
        次アポ数: nextAppointor(targetMonth).length,
        nextAppointmentPercent: isNaN(resultPercent) ? 0 : resultPercent,
      };
    });
  }, [results, newVisitor, existVisitor, nextAppointor]);

  const constractCountAndPercentData: CountAndPercentType[] | undefined =
    useMemo(() => {
      if (!results) return;
      return yearMonth.map((y) => {
        const targetMonth = getTargetMonthData(results, y.keyMonthDate);
        const targetNewVisitor = newVisitor(targetMonth);
        const constractedPersonCount = targetNewVisitor.filter(
          (t) => t.applications.length > 0
        ).length;
        const constractPercent =
          (constractedPersonCount / targetNewVisitor.length) * 100;
        const resultPercent = Math.round(constractPercent * 10) / 10;
        return {
          name: y.name,
          件数: constractedPersonCount,
          全体: targetNewVisitor.length,
          率: isNaN(resultPercent) ? 0 : resultPercent,
        };
      });
    }, [results, newVisitor]);

  const thankyouCountAndPercentData: CountAndPercentType[] | undefined =
    useMemo(() => {
      if (!results) return;
      return yearMonth.map((y) => {
        const targetMonth = getTargetMonthData(results, y.keyMonthDate);
        const thankyouCount = targetMonth.filter((r) => r.thankyou).length;
        const applicatorCount = targetMonth.filter(
          (r) => r.applications.length > 0
        ).length;
        const thankyouPercent = (thankyouCount / applicatorCount) * 100;
        const resultPercent = Math.round(thankyouPercent * 10) / 10;
        return {
          name: y.name,
          件数: thankyouCount,
          全体: applicatorCount,
          率: isNaN(resultPercent) ? 0 : resultPercent,
        };
      });
    }, [results, getTargetMonthData]);
  return {
    visitorAndNextAppointmentData,
    constractCountAndPercentData,
    thankyouCountAndPercentData,
  };
};
