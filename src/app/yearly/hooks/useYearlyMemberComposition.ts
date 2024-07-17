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
  month: string;
  新規数: number;
  既契約数: number;
  全体数: number;
  次アポ数: number;
};

export const useYearlyMemberComposition = (
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
      const targetMonth = getTargetMonthData(results, y.keyMonth);
      const newVisitorCount = newVisitor(targetMonth).length;
      const existVisitorCount = existVisitor(targetMonth).length;
      return {
        month: y.name,
        新規数: newVisitorCount,
        既契約数: existVisitorCount,
        全体数: newVisitorCount + existVisitorCount,
        次アポ数: nextAppointor(targetMonth).length,
      };
    });
  }, [results, newVisitor, existVisitor, nextAppointor]);

  const constractCountAndPercentData: CountAndPercentType[] | undefined =
    useMemo(() => {
      if (!results) return;
      return yearMonth.map((y) => {
        const targetMonth = getTargetMonthData(results, y.keyMonth);
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
        const targetMonth = getTargetMonthData(results, y.keyMonth);
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
