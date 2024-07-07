import { IndividualSalesResult, RouteMst } from "@/app/types";
import {
  amber,
  deepOrange,
  green,
  lightGreen,
  orange,
  teal,
} from "@mui/material/colors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { VisitorBarChartType } from "../visitor/VisitorBarChart";

export const useVisitorSummaryComposition = (
  results: IndividualSalesResult[] | undefined,
  routeMst: RouteMst[]
) => {
  const [salesData, setSalesData] = useState<
    IndividualSalesResult[] | undefined
  >(undefined);
  useEffect(() => {
    setSalesData(results);
  }, [results]);

  const resolveRouteKind = useCallback(
    (v: string) => {
      return routeMst.find((r) => r.name == v)?.kind;
    },
    [routeMst]
  );

  const newVisitor = useMemo(
    () => salesData?.filter((v) => resolveRouteKind(v.visitRoute) === "new"),
    [salesData, resolveRouteKind]
  );

  const existVisitor = useMemo(
    () => salesData?.filter((v) => resolveRouteKind(v.visitRoute) === "exist"),
    [salesData, resolveRouteKind]
  );

  const visitorCount = useMemo(() => {
    if (!salesData || !newVisitor || !existVisitor) return;

    return {
      all: salesData.length,
      new: newVisitor.length,
      exist: existVisitor.length,
    };
  }, [salesData]);

  const nextAppointment = useMemo(() => {
    if (!salesData) return;
    const nextAppointmentCount = salesData.filter(
      (v) => v.nextAppointment
    ).length;
    const nextAppointmentPercent =
      (nextAppointmentCount / salesData?.length) * 100;
    const resultPercent = Math.round(nextAppointmentPercent * 10) / 10;
    return {
      pecent: isNaN(resultPercent) ? 0 : resultPercent,
      count: nextAppointmentCount,
    };
  }, [salesData]);

  const consultContent = useMemo(() => {
    if (!newVisitor || !existVisitor) return;
    return {
      life: {
        new: newVisitor.filter((v) => v.consultContent === "生保").length,
        exist: existVisitor.filter((v) => v.consultContent === "生保").length,
      },
      nonLife: {
        new: newVisitor.filter((v) => v.consultContent === "損保").length,
        exist: existVisitor.filter((v) => v.consultContent === "損保").length,
      },
    };
  }, [newVisitor, existVisitor]);

  const getRouteCountByName = useCallback(
    (name: string) => {
      if (!salesData) return;
      return salesData.filter((v) => v.visitRoute === name).length;
    },
    [salesData]
  );

  const routeBarChartData: VisitorBarChartType[] | undefined = useMemo(() => {
    if (!salesData || routeMst.length === 0) return;
    return routeMst.map((r) => {
      return {
        name: r.name,
        人数: getRouteCountByName(r.name) || 0,
        color: r.kind === "new" ? green[400] : orange[400],
      };
    });
  }, [salesData, getRouteCountByName, routeMst]);

  const consultContentPieChartData = useMemo(() => {
    if (!consultContent || !newVisitor || !existVisitor) return;
    return [
      { name: "[新規]生保", value: consultContent.life.new, color: green[400] },
      {
        name: "[新規]損保",
        value: consultContent.nonLife.new,
        color: lightGreen[400],
      },
      {
        name: "[新規]その他",
        value: newVisitor.filter((v) => v.consultContent === "その他").length,
        color: teal[400],
      },
      {
        name: "[既契約]生保",
        value: consultContent.life.exist,
        color: deepOrange[400],
      },
      {
        name: "[既契約]損保",
        value: consultContent.nonLife.exist,
        color: orange[400],
      },
      {
        name: "[既契約]その他",
        value: existVisitor.filter((v) => v.consultContent === "その他").length,
        color: amber[400],
      },
    ];
  }, [consultContent, newVisitor, existVisitor]);

  const closedConstractData = useMemo(() => {
    if (!newVisitor) return;
    const constractCount = newVisitor.filter(
      (v) => v.applications.length > 0
    ).length;
    const constractPercent = (constractCount / newVisitor.length) * 100;
    const resultPercent = Math.round(constractPercent * 10) / 10;
    return {
      percent: isNaN(resultPercent) ? 0 : resultPercent,
      count: constractCount,
      all: newVisitor.length,
    };
  }, [newVisitor]);

  return {
    visitorCount,
    nextAppointment,
    consultContent,
    routeBarChartData,
    consultContentPieChartData,
    closedConstractData,
  };
};
