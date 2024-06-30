import { ConsultContentMst, NewVisitor, RouteMst } from "@/app/types";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import { useCallback, useState } from "react";

export const useNewVisitor = (
  postVisitorData: (newData: NewVisitor) => Promise<void>,
  routeMst: RouteMst[],
  consultContentMst: ConsultContentMst[]
) => {
  const today = dayjs().format("YYYY-MM-DD");

  const [newVisitorData, setNewVisitorData] = useState<NewVisitor>({
    firstVisitDate: today, //今日の日付を入れる
    visitRoute: null,
    name: null,
    nextAppointment: false,
    consultContent: null,
  });

  const updateFirstVisitDate = useCallback(
    (v: string) => {
      setNewVisitorData({
        ...newVisitorData,
        firstVisitDate: v,
      });
    },
    [newVisitorData, setNewVisitorData]
  );

  const updateName = useCallback(
    (v: string) => {
      setNewVisitorData({
        ...newVisitorData,
        name: v,
      });
    },
    [newVisitorData, setNewVisitorData]
  );

  const updateRoute = useCallback(
    (e: SelectChangeEvent) => {
      if (!routeMst) return;
      setNewVisitorData({
        ...newVisitorData,
        visitRoute: routeMst.find((r) => e.target.value === r.id) || null,
      });
    },
    [routeMst, newVisitorData, setNewVisitorData]
  );

  const updateConsultContent = useCallback(
    (e: SelectChangeEvent) => {
      if (!consultContentMst) return;
      setNewVisitorData({
        ...newVisitorData,
        consultContent:
          consultContentMst.find((r) => e.target.value === r.id) || null,
      });
    },
    [consultContentMst, newVisitorData, setNewVisitorData]
  );

  const updateNextAppointment = useCallback(
    (checked: boolean) => {
      setNewVisitorData({
        ...newVisitorData,
        nextAppointment: checked,
      });
    },
    [newVisitorData, setNewVisitorData]
  );

  const submitNewVisitor = useCallback(() => {
    //TODO: validationを実装する
    postVisitorData(newVisitorData);
  }, [newVisitorData, postVisitorData]);

  return {
    newVisitorData,
    updateFirstVisitDate,
    updateName,
    updateRoute,
    updateConsultContent,
    updateNextAppointment,
    submitNewVisitor,
  };
};
