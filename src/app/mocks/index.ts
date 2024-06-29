import { IndividualSalesResult } from "../types";

export const useMockData = () => {
  const salesResult: IndividualSalesResult[] = [
    {
      visitDay: "2024/06/01",
      customerKind: "新規",
      customerName: "山田太郎",
      consultContents: "hoge",
      nextAppointment: true,
      contractCount: 1,
      contractProduct: "傷害保険",
      thankyou: true,
    },
    {
      visitDay: "2024/06/02",
      customerKind: "既契約",
      customerName: "鈴木一朗",
      consultContents: "生命保険",
      nextAppointment: false,
      contractCount: 0,
      contractProduct: "",
      thankyou: false,
    },
    {
      visitDay: "2024/06/02",
      customerKind: "既契約",
      customerName: "鈴木一朗",
      consultContents: "生命保険",
      nextAppointment: false,
      contractCount: 0,
      contractProduct: "",
      thankyou: false,
    },
    {
      visitDay: "2024/06/02",
      customerKind: "既契約",
      customerName: "鈴木一朗",
      consultContents: "生命保険",
      nextAppointment: false,
      contractCount: 0,
      contractProduct: "",
      thankyou: false,
    },
    {
      visitDay: "2024/06/02",
      customerKind: "既契約",
      customerName: "鈴木一朗",
      consultContents: "生命保険",
      nextAppointment: false,
      contractCount: 0,
      contractProduct: "",
      thankyou: false,
    },
  ];
  return { salesResult };
};
