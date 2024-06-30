import { applicationStatus, IndividualSalesResult, NewVisitor } from "../types";
import useSWR from "swr";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
const url =
  "https://1us1ed23t2.execute-api.ap-northeast-1.amazonaws.com/hoken_juku_sales_result/sales-results";

export const useSalesResultApi = (userId: string) => {
  const [salesResultData, setSalesResultData] = useState<
    IndividualSalesResult[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          params: { userId },
        });
        if (response.data !== undefined) {
          const transformedData = response.data.map(
            (v: IndividualSalesResult) => ({
              uuid: v.uuid,
              userId: v.userId,
              firstVisitDate: v.firstVisitDate,
              visitRoute: v.visitRoute,
              name: v.name,
              nextAppointment: v.nextAppointment,
              consultContent: v.consultContent,
              products: v.products || null,
              firstYearFee: v.firstYearFee || null,
              applicationDate: v.applicationDate || null,
              status: v.status || null,
              establishDate: v.establishDate || null,
              thankyou: v.thankyou,
            })
          );
          setSalesResultData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const postVisitorData = useCallback(
    async (newData: NewVisitor) => {
      try {
        const response = await axios.post(url, {
          userId,
          firstVisitDate: newData.firstVisitDate,
          visitRoute: newData.visitRoute,
          name: newData.name,
          nextAppointment: newData.nextAppointment,
          consultContent: newData.consultContent,
        });
      } catch (error) {
        console.error("Error posting data:", error);
      }
    },
    [userId]
  );

  return { salesResultData, postVisitorData };
};