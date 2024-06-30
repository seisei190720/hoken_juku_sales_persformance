import {
  CompanyMst,
  IndividualSalesResult,
  NewApplication,
  ProductMst,
} from "@/app/types";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

export const useNewApplications = (
  salesResult: IndividualSalesResult | undefined,
  productMst: ProductMst[],
  companyMst: CompanyMst[],
  updateApplicationsData: (newData: NewApplication[]) => Promise<void>
) => {
  const today = dayjs().format("YYYY-MM-DD");
  const defaultApplicationData = {
    applicationDate: today,
    product: null,
    company: null,
  };

  const [newApplications, setNewApplications] = useState<NewApplication[]>([
    defaultApplicationData,
  ]);

  useEffect(() => {
    console.log(salesResult);
    console.log(newApplications);
    if (!salesResult) setNewApplications([]);
    setNewApplications([defaultApplicationData]);
    console.log(newApplications);
  }, [salesResult]);

  const addProduct = useCallback(() => {
    setNewApplications([...newApplications, defaultApplicationData]);
  }, []);

  const submitNewVisitor = useCallback(() => {
    //TODO: validationを実装する
    updateApplicationsData(newApplications);
  }, [newApplications, updateApplicationsData]);

  return { newApplications, addProduct, submitNewVisitor };
};
