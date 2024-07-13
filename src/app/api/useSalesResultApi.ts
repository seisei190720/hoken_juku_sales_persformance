import {
  Application,
  IndividualSalesResult,
  NewVisitor,
  applicationStatus,
} from "../types";
import useSWR, { KeyedMutator } from "swr";
import axios from "axios";
import { useCallback } from "react";
import IndividualSalesResults from "../mypage/visitorList/IndividualSalesResults";

const devUrl =
  "https://1us1ed23t2.execute-api.ap-northeast-1.amazonaws.com/hoken_juku_sales_result/sales-results";

const prodUrl =
  "https://jiv06b7gz7.execute-api.ap-northeast-1.amazonaws.com/prod_hoken_juku/sales-results";

const fetcher = async ([url, userId, status, year, firstVisitDate]: [
  string,
  string | null,
  string | null,
  string | null,
  string | null
]) => {
  const response = await axios.get(url, {
    params: {
      userId,
      status,
      year,
      firstVisitDate,
    },
  });

  if (response.data !== undefined) {
    return response.data.map((v: IndividualSalesResult) => ({
      uuid: v.uuid,
      userId: v.userId,
      firstVisitDate: v.firstVisitDate,
      visitRoute: v.visitRoute,
      name: v.name,
      nextAppointment: v.nextAppointment,
      consultContent: v.consultContent,
      applications: v.applications.map((a: Application) => ({
        userId: userId,
        product: a.product || null,
        company: a.company || null,
        firstYearFee: a.firstYearFee || null,
        applicationDate: a.applicationDate || null,
        status: a.status || null,
        establishDate: a.establishDate || null,
      })),
      thankyou: v.thankyou,
    }));
  }
};

export const resolveYear = (date: string | null) => {
  //TODO: 年度を計算する
  if (date === null) return null;

  return "2024";
};

export const useSalesResultApi = (
  userId: string,
  param: {
    status: string | null;
    firstVisitDate: string | null;
    year: string | null;
  }
) => {
  const {
    data: salesResultData,
    error,
    mutate,
  } = useSWR(
    param.status === null && param.firstVisitDate === null
      ? null
      : [prodUrl, userId, param.status, param.year, param.firstVisitDate],
    fetcher
  );

  const postVisitorData = useCallback(
    async (newData: NewVisitor) => {
      try {
        await axios.post(prodUrl, {
          userId,
          year: resolveYear(newData.firstVisitDate),
          firstVisitDate: newData.firstVisitDate,
          visitRoute: newData.visitRoute?.id,
          name: newData.name,
          nextAppointment: newData.nextAppointment,
          consultContent: newData.consultContent?.id,
        });
        await mutate(); //uuidが必要になるため、ローカルデータでmutateができない。
      } catch (error) {
        console.error("Error posting data:", error);
      }
    },
    [userId, mutate]
  );

  const updateSalesResultData = useCallback(
    async (newData: IndividualSalesResult) => {
      try {
        const updatedData = {
          ...newData,
          year: resolveYear(newData.firstVisitDate),
          applications: newData.applications.map((v) => {
            if (v.establishDate === null || v.establishDate === "") {
              return v;
            }
            return {
              ...v,
              year: resolveYear(v.establishDate),
            };
          }),
        };
        await axios.put(prodUrl, updatedData);
        await mutate((d: IndividualSalesResult[]) => {
          if (!d) return;
          const updatedSalesResultData = d.map((item) =>
            item.uuid === newData.uuid ? updatedData : item
          );
          return updatedSalesResultData;
        }, false);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    },
    [userId, mutate]
  );

  const deleteSalesResultData = useCallback(
    async (deleteTarget: IndividualSalesResult) => {
      try {
        await axios.delete(prodUrl, {
          params: {
            userId: deleteTarget.userId,
            uuid: deleteTarget.uuid,
            year: resolveYear(deleteTarget.firstVisitDate),
            firstVisitDate: deleteTarget.firstVisitDate,
          },
        });
        await mutate((d: IndividualSalesResult[]) => {
          if (!d) return;
          const updatedSalesResultData = d.filter(
            (item) => item.uuid !== deleteTarget.uuid
          );
          return updatedSalesResultData;
        }, false);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    },
    [mutate]
  );

  return {
    salesResultData,
    postVisitorData,
    updateSalesResultData,
    deleteSalesResultData,
    error,
    mutate,
  };
};
