import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  Member,
  ProductMst,
  RouteMst,
  StatusMst,
} from "@/app/types";
import { useCallback, useMemo } from "react";

export type VisitorAndAppointmentType = {
  name: string;
  新規数: number;
  既契約数: number;
  次アポ数: number;
  nextAppointmentPercent: number;
};
export type CountAndPercentType = {
  name: string;
  件数: number;
  全体: number;
  率: number;
};

export const useStoreAchievementData = (
  results: IndividualSalesResult[] | undefined,
  members: Member[],
  routeMst: RouteMst[],
  consultContentMst: ConsultContentMst[],
  productMst: ProductMst[],
  companyMst: CompanyMst[],
  statusMst: StatusMst[]
) => {
  const resolveRouteKind = useCallback(
    (v: string) => {
      return routeMst.find((r) => r.id == v)?.kind;
    },
    [routeMst]
  );

  const newVisitor = useCallback(
    (targetResults: IndividualSalesResult[]) =>
      targetResults?.filter((v) => resolveRouteKind(v.visitRoute) === "new"),
    [resolveRouteKind]
  );

  const existVisitor = useCallback(
    (targetResults: IndividualSalesResult[]) =>
      targetResults.filter((v) => resolveRouteKind(v.visitRoute) === "exist"),
    [resolveRouteKind]
  );

  const nextAppointor = useCallback(
    (targetResults: IndividualSalesResult[]) =>
      targetResults.filter((v) => v.nextAppointment),
    []
  );
  const visitorAndAppointmentData: VisitorAndAppointmentType[] | undefined =
    useMemo(() => {
      if (!results) return;
      return members.map((m) => {
        const targetResults = results.filter((r) => r.userId === m.id);
        const nextAppointmentCount = nextAppointor(targetResults).length;
        const nextAppointmentPercent =
          (nextAppointmentCount / targetResults.length) * 100;
        const resultPercent = Math.round(nextAppointmentPercent * 10) / 10;
        return {
          name: m.name,
          新規数: newVisitor(targetResults).length,
          既契約数: existVisitor(targetResults).length,
          次アポ数: nextAppointmentCount,
          nextAppointmentPercent: isNaN(resultPercent) ? 0 : resultPercent,
        };
      });
    }, [results, newVisitor, existVisitor, nextAppointor]);

  const constractCountAndPercentData: CountAndPercentType[] | undefined =
    useMemo(() => {
      if (!results) return;
      return members.map((m) => {
        const targetResults = results.filter((r) => r.userId === m.id);
        const targetNewVisitor = newVisitor(targetResults);
        const constractedPersonCount = targetNewVisitor.filter(
          (t) => t.applications.length > 0
        ).length;
        const constractPercent =
          (constractedPersonCount / targetNewVisitor.length) * 100;
        const resultPercent = Math.round(constractPercent * 10) / 10;
        return {
          name: m.name,
          件数: constractedPersonCount,
          全体: targetNewVisitor.length,
          率: isNaN(resultPercent) ? 0 : resultPercent,
        };
      });
    }, [results, newVisitor]);

  const thankyouCountAndPercentData: CountAndPercentType[] | undefined =
    useMemo(() => {
      if (!results) return;
      return members.map((m) => {
        const targetResults = results.filter((r) => r.userId === m.id);
        const thankyouCount = targetResults.filter((r) => r.thankyou).length;
        const applicatorCount = targetResults.filter(
          (r) => r.applications.length > 0
        ).length;
        const thankyouPercent = (thankyouCount / applicatorCount) * 100;
        const resultPercent = Math.round(thankyouPercent * 10) / 10;
        return {
          name: m.name,
          件数: thankyouCount,
          全体: applicatorCount,
          率: isNaN(resultPercent) ? 0 : resultPercent,
        };
      });
    }, [results]);
  return {
    visitorAndAppointmentData,
    constractCountAndPercentData,
    thankyouCountAndPercentData,
  };
};
