import {
  CompanyMst,
  IndividualSalesResult,
  ProductMst,
  StatusMst,
  UpdateApplication,
} from "@/app/types";
import { SelectChangeEvent } from "@mui/material/Select";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_APPLICATION_DATA } from "../../visitorList/hooks/useNewApplications";

export const useUpdateApplications = (
  salesResult: IndividualSalesResult | undefined,
  productMst: ProductMst[],
  companyMst: CompanyMst[],
  statusMst: StatusMst[],
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>
) => {
  const [updatedApplications, setUpdatedApplications] = useState<
    UpdateApplication[]
  >([]);
  const [thankyouState, setThankyouState] = useState<boolean>(false);
  const [newRemarks, setNewRemarks] = useState<string>("");

  useEffect(() => {
    if (salesResult) {
      setUpdatedApplications(
        salesResult.applications.map((a) => {
          return {
            applicationDate: a.applicationDate,
            product: productMst.find((p) => p.id === a.product) || null,
            company: companyMst.find((c) => c.id === a.company) || null,
            firstYearFee: a.firstYearFee,
            insuranceFee: a.insuranceFee,
            status: statusMst.find((s) => s.id === a.status) || null,
            establishDate: a.establishDate,
          };
        })
      );
      setThankyouState(salesResult.thankyou);
      setNewRemarks(salesResult.remarks === null ? "" : salesResult.remarks);
    }
  }, [salesResult, setUpdatedApplications, setThankyouState]);

  const addApplication = useCallback(() => {
    setUpdatedApplications([
      ...updatedApplications,
      {
        ...DEFAULT_APPLICATION_DATA,
        status: statusMst.find((s) => s.name === "未成立") || null,
        firstYearFee: null,
        establishDate: null,
      },
    ]);
  }, [updatedApplications, setUpdatedApplications]);

  const deleteApplication = useCallback(
    (targetIdx: number) => {
      setUpdatedApplications((pre) =>
        pre.filter((app, index) => index !== targetIdx)
      );
    },
    [setUpdatedApplications]
  );

  const updateApplicationDate = useCallback(
    (newData: string, targetIdx: number) => {
      setUpdatedApplications(
        updatedApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              applicationDate: newData,
            };
          }
          return v;
        })
      );
    },
    [updatedApplications, setUpdatedApplications]
  );

  const updateProduct = useCallback(
    (e: SelectChangeEvent, targetIdx: number) => {
      if (!productMst) return;
      setUpdatedApplications(
        updatedApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              product: productMst.find((r) => e.target.value === r.id) || null,
            };
          }
          return v;
        })
      );
    },
    [productMst, updatedApplications, setUpdatedApplications]
  );

  const updateCompany = useCallback(
    (e: SelectChangeEvent, targetIdx: number) => {
      if (!companyMst) return;
      setUpdatedApplications(
        updatedApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              company: companyMst.find((r) => e.target.value === r.id) || null,
            };
          }
          return v;
        })
      );
    },
    [companyMst, updatedApplications, setUpdatedApplications]
  );

  const updateStatus = useCallback(
    (e: SelectChangeEvent, targetIdx: number) => {
      setUpdatedApplications(
        updatedApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              status: statusMst.find((s) => e.target.value === s.id) || null,
            };
          }
          return v;
        })
      );
    },
    [updatedApplications, setUpdatedApplications]
  );

  const updateFirstYearFee = useCallback(
    (newData: number, targetIdx: number) => {
      setUpdatedApplications(
        updatedApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              firstYearFee: newData,
            };
          }
          return v;
        })
      );
    },
    [updatedApplications, setUpdatedApplications]
  );

  const updateInsuranceFee = useCallback(
    (newData: number, targetIdx: number) => {
      setUpdatedApplications(
        updatedApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              insuranceFee: newData,
            };
          }
          return v;
        })
      );
    },
    [updatedApplications, setUpdatedApplications]
  );

  const updateEstablishDate = useCallback(
    (newData: string, targetIdx: number) => {
      setUpdatedApplications(
        updatedApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              establishDate: newData,
            };
          }
          return v;
        })
      );
    },
    [updatedApplications, setUpdatedApplications]
  );

  const updateRemarks = useCallback(
    (v: string) => {
      setNewRemarks(v);
    },
    [setNewRemarks]
  );

  const submitUpdatedApplications = useCallback(() => {
    //TODO: validationを実装する
    if (!salesResult) return;
    updateApplicationsData({
      ...salesResult,
      remarks: newRemarks === "" ? null : newRemarks,
      thankyou: thankyouState,
      applications: updatedApplications.map((v) => {
        return {
          userId: salesResult.userId,
          applicationDate: v.applicationDate,
          product: v.product?.id || "",
          company: v.company?.id || "",
          firstYearFee: v.firstYearFee,
          insuranceFee: v.insuranceFee,
          status: v.status?.id || "",
          establishDate: v.establishDate,
        };
      }),
    });
  }, [updatedApplications, updateApplicationsData, thankyouState, newRemarks]);

  return {
    updatedApplications,
    addApplication,
    deleteApplication,
    updateApplicationDate,
    updateProduct,
    updateCompany,
    updateStatus,
    updateFirstYearFee,
    updateInsuranceFee,
    updateEstablishDate,
    thankyouState,
    setThankyouState,
    newRemarks,
    updateRemarks,
    submitUpdatedApplications,
  };
};
