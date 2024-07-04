import {
  Application,
  NewApplication,
  IndividualSalesResult,
  NewVisitor,
  applicationStatus,
} from "../types";
import useSWR from "swr";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
const url =
  "https://1us1ed23t2.execute-api.ap-northeast-1.amazonaws.com/hoken_juku_sales_result/sales-results/applications";

export const useApplicationApi = (
  userId: string,
  param: {
    applicationDate: string;
  }
) => {
  const [applicationData, setApplicationData] = useState<
    Application[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          params: { userId, applicationDate: param.applicationDate },
        });
        if (response.data !== undefined) {
          const transformedData = response.data.map((a: Application) => ({
            product: a.product || null,
            company: a.company || null,
            firstYearFee: a.firstYearFee || null,
            applicationDate: a.applicationDate || null,
            status: a.status || null,
            establishDate: a.establishDate || null,
          }));
          setApplicationData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return applicationData;
};
