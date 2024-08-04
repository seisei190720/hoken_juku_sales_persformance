import {
  ConsultContentMst,
  IndividualSalesResult,
  NewVisitor,
  RouteMst,
} from "@/app/types";
import { SelectChangeEvent } from "@mui/material/Select";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useUpdateVisitor = (
  salesResultData: IndividualSalesResult | undefined,
  updateSalesResultData: (newData: IndividualSalesResult) => Promise<void>,
  routeMst: RouteMst[],
  consultContentMst: ConsultContentMst[]
) => {
  const [updatedVisitorData, setUpdatedVisitorData] = useState<
    NewVisitor | undefined
  >(undefined);

  useEffect(() => {
    if (!salesResultData) return;
    setUpdatedVisitorData({
      firstVisitDate: salesResultData.firstVisitDate,
      visitRoute:
        routeMst.find((r) => r.id === salesResultData.visitRoute) || null,
      name: salesResultData.name,
      nextAppointment: salesResultData.nextAppointment,
      consultContent:
        consultContentMst.find(
          (c) => c.id === salesResultData.consultContent
        ) || null,
      remarks: salesResultData.remarks === null ? "" : salesResultData.remarks,
    });
  }, [salesResultData, setUpdatedVisitorData, routeMst, consultContentMst]);

  const updateName = useCallback(
    (v: string) => {
      if (!updatedVisitorData) return;
      setUpdatedVisitorData({
        ...updatedVisitorData,
        name: v,
      });
    },
    [updatedVisitorData, setUpdatedVisitorData]
  );

  const updateRoute = useCallback(
    (e: SelectChangeEvent) => {
      if (!routeMst || !updatedVisitorData) return;
      setUpdatedVisitorData({
        ...updatedVisitorData,
        visitRoute: routeMst.find((r) => e.target.value === r.id) || null,
      });
    },
    [routeMst, updatedVisitorData, setUpdatedVisitorData]
  );

  const updateConsultContent = useCallback(
    (e: SelectChangeEvent) => {
      if (!consultContentMst || !updatedVisitorData) return;
      setUpdatedVisitorData({
        ...updatedVisitorData,
        consultContent:
          consultContentMst.find((r) => e.target.value === r.id) || null,
      });
    },
    [consultContentMst, updatedVisitorData, setUpdatedVisitorData]
  );

  const updateNextAppointment = useCallback(
    (checked: boolean) => {
      if (!updatedVisitorData) return;
      setUpdatedVisitorData({
        ...updatedVisitorData,
        nextAppointment: checked,
      });
    },
    [updatedVisitorData, setUpdatedVisitorData]
  );

  const updateRemarks = useCallback(
    (v: string) => {
      if (!updatedVisitorData) return;
      setUpdatedVisitorData({
        ...updatedVisitorData,
        remarks: v,
      });
    },
    [updatedVisitorData, setUpdatedVisitorData]
  );

  const enableSaveButton = useMemo(
    () =>
      updatedVisitorData !== undefined &&
      updatedVisitorData.firstVisitDate !== null &&
      updatedVisitorData.firstVisitDate !== "" &&
      updatedVisitorData.name !== null &&
      updatedVisitorData.name !== "" &&
      updatedVisitorData.consultContent !== null &&
      updatedVisitorData.visitRoute !== null,
    [updatedVisitorData]
  );

  const nameErrorMessage = useMemo(() => {
    if (
      updatedVisitorData === undefined ||
      updatedVisitorData.name === null ||
      updatedVisitorData.name === ""
    )
      return "お名前を入力してください。";
    return;
  }, [updatedVisitorData]);

  const submitUpdatedVisitor = useCallback(() => {
    //TODO: validationを実装する
    if (!salesResultData || !updatedVisitorData) return;
    updateSalesResultData({
      ...salesResultData,
      firstVisitDate: updatedVisitorData.firstVisitDate || "",
      visitRoute: updatedVisitorData.visitRoute?.id || "",
      name: updatedVisitorData.name || "",
      nextAppointment: updatedVisitorData.nextAppointment,
      consultContent: updatedVisitorData.consultContent?.id || "",
      remarks:
        updatedVisitorData.remarks === "" ? null : updatedVisitorData.remarks,
    });
  }, [updateSalesResultData, updatedVisitorData, salesResultData]);

  return {
    updatedVisitorData,
    updateName,
    updateRoute,
    updateConsultContent,
    updateNextAppointment,
    updateRemarks,
    submitUpdatedVisitor,
    nameErrorMessage,
    enableSaveButton,
  };
};
