import {
  Application,
  IndividualSalesResult,
  NewVisitor,
  applicationStatus,
} from "../types";
import useSWR from "swr";
import axios from "axios";
import { useCallback } from "react";

const url =
  "https://1us1ed23t2.execute-api.ap-northeast-1.amazonaws.com/hoken_juku_sales_result/sales-results";

const fetcher = async ([url, userId, status, firstVisitDate]: [
  string,
  string,
  applicationStatus,
  string | null
]) => {
  const response = await axios.get(url, {
    params: {
      userId,
      status,
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

export const useSalesResultApi = (
  userId: string,
  param: {
    status: applicationStatus;
    firstVisitDate: string | null;
  }
) => {
  const {
    data: salesResultData,
    error,
    mutate,
  } = useSWR(
    param.status === null && param.firstVisitDate === null
      ? null
      : [url, userId, param.status, param.firstVisitDate],
    fetcher
  );

  const postVisitorData = useCallback(
    async (newData: NewVisitor) => {
      try {
        await axios.post(url, {
          userId,
          firstVisitDate: newData.firstVisitDate,
          visitRoute: newData.visitRoute?.name,
          name: newData.name,
          nextAppointment: newData.nextAppointment,
          consultContent: newData.consultContent?.name,
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
        await axios.put(url, newData);
        await mutate((d: IndividualSalesResult[]) => {
          if (!d) return;
          const updatedSalesResultData = d.map((item) =>
            item.uuid === newData.uuid ? newData : item
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
        await axios.delete(url, {
          params: {
            userId: deleteTarget.userId,
            uuid: deleteTarget.uuid,
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
  };
};
