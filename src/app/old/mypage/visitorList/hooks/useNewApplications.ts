import {
  CompanyMst,
  IndividualSalesResult,
  NewApplication,
  ProductMst,
} from "@/app/types";
import { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const DEFAULT_APPLICATION_DATA = {
  applicationDate: dayjs().format("YYYY-MM-DD"),
  product: null,
  company: null,
  firstYearFee: null,
  insuranceFee: null,
};
export const useNewApplications = (
  salesResult: IndividualSalesResult | undefined,
  productMst: ProductMst[],
  companyMst: CompanyMst[],
  updateApplicationsData: (newData: IndividualSalesResult) => Promise<void>
) => {
  const [newApplications, setNewApplications] = useState<NewApplication[]>([
    DEFAULT_APPLICATION_DATA,
  ]);
  const [newRemarks, setNewRemarks] = useState<string>("");

  useEffect(() => {
    if (!salesResult) {
      setNewApplications([]);
    } else {
      setNewRemarks(salesResult.remarks === null ? "" : salesResult.remarks);
    }
  }, [salesResult, setNewApplications, setNewRemarks]);

  const addProduct = useCallback(() => {
    setNewApplications([...newApplications, DEFAULT_APPLICATION_DATA]);
  }, [newApplications, setNewApplications]);

  const deleteProduct = useCallback(
    (targetIdx: number) => {
      setNewApplications((pre) =>
        pre.filter((app, index) => index !== targetIdx)
      );
    },
    [newApplications, setNewApplications]
  );

  const updateApplicationDate = useCallback(
    (newDate: string, targetIdx: number) => {
      setNewApplications(
        newApplications.map((v, i) => {
          if (i === targetIdx) {
            return {
              ...v,
              applicationDate: newDate,
            };
          }
          return v;
        })
      );
    },
    [newApplications, setNewApplications]
  );

  const updateProduct = useCallback(
    (e: SelectChangeEvent, targetIdx: number) => {
      if (!productMst) return;
      setNewApplications(
        newApplications.map((v, i) => {
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
    [productMst, newApplications, setNewApplications]
  );

  const updateCompany = useCallback(
    (e: SelectChangeEvent, targetIdx: number) => {
      if (!companyMst) return;
      setNewApplications(
        newApplications.map((v, i) => {
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
    [companyMst, newApplications, setNewApplications]
  );

  const updateFirstYearFee = useCallback(
    (newData: number, targetIdx: number) => {
      setNewApplications(
        newApplications.map((v, i) => {
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
    [newApplications, setNewApplications]
  );

  const updateInsuranceFee = useCallback(
    (newData: number, targetIdx: number) => {
      setNewApplications(
        newApplications.map((v, i) => {
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
    [newApplications, setNewApplications]
  );

  const updateRemarks = useCallback(
    (v: string) => {
      setNewRemarks(v);
    },
    [setNewRemarks]
  );

  const submitNewApplications = useCallback(() => {
    //TODO: validationを実装する
    if (!salesResult) return;
    updateApplicationsData({
      ...salesResult,
      remarks: newRemarks === "" ? null : newRemarks,
      applications: newApplications.map((v) => {
        return {
          userId: salesResult.userId,
          applicationDate: v.applicationDate,
          product: v.product?.id || "",
          company: v.company?.id || "",
          firstYearFee: v.firstYearFee,
          insuranceFee: v.insuranceFee,
          status: "1",
          establishDate: null,
        };
      }),
    });
  }, [newApplications, updateApplicationsData, newRemarks]);

  return {
    newApplications,
    updateApplicationDate,
    updateProduct,
    updateCompany,
    updateFirstYearFee,
    updateInsuranceFee,
    updateRemarks,
    newRemarks,
    addProduct,
    deleteProduct,
    submitNewApplications,
  };
};
