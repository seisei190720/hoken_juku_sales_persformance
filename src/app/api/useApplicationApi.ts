import { Application } from "../types";
import axios from "axios";
import useSWR from "swr";
const devUrl =
  "https://1us1ed23t2.execute-api.ap-northeast-1.amazonaws.com/hoken_juku_sales_result/sales-results/applications";

const prodUrl =
  "https://jiv06b7gz7.execute-api.ap-northeast-1.amazonaws.com/prod_hoken_juku/sales-results/applications";

const fetcher = async ([url, userId, year, establishDate]: [
  string,
  string | null,
  string,
  string | null
]) => {
  const response = await axios.get(url, {
    params: {
      userId,
      year,
      establishDate,
    },
  });

  if (response.data === undefined) return;
  return response.data.map((a: Application) => {
    return {
      userId: a.userId || null,
      product: a.product || null,
      company: a.company || null,
      firstYearFee: a.firstYearFee || null,
      insuranceFee: a.insuranceFee || null,
      applicationDate: a.applicationDate || null,
      status: a.status || null,
      establishDate: a.establishDate || null,
    };
  });
};

export const useApplicationApi = (param: {
  userId: string | null;
  year: string | null;
  establishDate: string | null;
}) => {
  const {
    data: applicationData,
    error,
    mutate,
  } = useSWR(
    param.year === null
      ? null
      : [prodUrl, param.userId, param.year, param.establishDate],
    fetcher
  );

  return { applicationData, error, mutate };
};
