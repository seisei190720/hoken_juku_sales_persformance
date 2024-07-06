import {
  applicationStatus,
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
  useEffect(() => {
    if (!salesResult) setNewApplications([]);
  }, []);

  const addProduct = useCallback(() => {
    setNewApplications([...newApplications, DEFAULT_APPLICATION_DATA]);
  }, [newApplications, setNewApplications]);

  const deleteProduct = useCallback(
    (targetIdx: number) => {
      setNewApplications(
        newApplications.filter((app, index) => index !== targetIdx)
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

  const submitNewApplications = useCallback(() => {
    //TODO: validationを実装する
    console.log(newApplications);
    if (!salesResult) return;
    updateApplicationsData({
      ...salesResult,
      applications: newApplications.map((v) => {
        return {
          applicationDate: v.applicationDate,
          product: v.product?.name || "",
          company: v.company?.name || "",
          firstYearFee: null,
          status: "未成立",
          establishDate: null,
        };
      }),
    });
  }, [newApplications, updateApplicationsData]);

  return {
    newApplications,
    updateApplicationDate,
    updateProduct,
    updateCompany,
    addProduct,
    deleteProduct,
    submitNewApplications,
  };
};
