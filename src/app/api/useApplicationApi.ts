import { Application } from "../types";
import axios from "axios";
import { useEffect, useState } from "react";
const devUrl =
  "https://1us1ed23t2.execute-api.ap-northeast-1.amazonaws.com/hoken_juku_sales_result/sales-results/applications";

const prodUrl =
  "https://jiv06b7gz7.execute-api.ap-northeast-1.amazonaws.com/prod_hoken_juku/sales-results/applications";

export const useApplicationApi = (param: {
  userId: string | null;
  year: string | null;
  establishDate: string | null;
}) => {
  const [applicationData, setApplicationData] = useState<
    Application[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      // 利用想定的に、必ずyaerはserchParamとして使うので、無駄なリクエストが飛ばないように制御している
      if (param.year === null) return;
      try {
        const response = await axios.get(prodUrl, {
          params: {
            userId: param.userId,
            year: param.year,
            establishDate: param.establishDate,
          },
        });
        if (response.data !== undefined) {
          const transformedData = response.data.map((a: Application) => ({
            userId: a.userId || null,
            product: a.product || null,
            company: a.company || null,
            firstYearFee: a.firstYearFee || null,
            insuranceFee: a.insuranceFee || null,
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
  }, [param.userId, param.year, param.establishDate]);

  return { applicationData };
};
