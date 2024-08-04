import { ConsultContentMst, NewVisitor, RouteMst } from "@/app/types";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";

export const useNewVisitor = (
  postVisitorData: (newData: NewVisitor) => Promise<void>,
  routeMst: RouteMst[],
  consultContentMst: ConsultContentMst[]
) => {
  const today = dayjs().format("YYYY-MM-DD");

  const [newVisitorData, setNewVisitorData] = useState<NewVisitor>({
    firstVisitDate: today,
    visitRoute: null,
    name: null,
    nextAppointment: false,
    consultContent: null,
    remarks: null,
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

  const updateRemarks = useCallback(
    (v: string) => {
      setNewVisitorData({
        ...newVisitorData,
        remarks: v,
      });
    },
    [newVisitorData, setNewVisitorData]
  );

  const enableSaveButton = useMemo(
    () =>
      newVisitorData.firstVisitDate !== null &&
      newVisitorData.firstVisitDate !== "" &&
      newVisitorData.name !== null &&
      newVisitorData.name !== "" &&
      newVisitorData.consultContent !== null &&
      newVisitorData.visitRoute !== null,
    [newVisitorData]
  );

  const firstVisitDateErrorMessage = useMemo(() => {
    if (
      newVisitorData.firstVisitDate === null ||
      newVisitorData.firstVisitDate === ""
    )
      return "来店日を入力してください。";
    return;
  }, [newVisitorData]);

  const nameErrorMessage = useMemo(() => {
    if (newVisitorData.name === null || newVisitorData.name === "")
      return "お名前を入力してください。";
    return;
  }, [newVisitorData]);

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
    updateRemarks,
    submitNewVisitor,
    firstVisitDateErrorMessage,
    nameErrorMessage,
    enableSaveButton,
  };
};
