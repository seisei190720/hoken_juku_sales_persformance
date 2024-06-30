import { ConsultContentMst, IndividualSalesResult, RouteMst } from "../types";

export const useMockData = () => {
  const salesResults: IndividualSalesResult[] = [
    {
      userId: "userId001",
      firstVisitDate: "2024-06-05",
      visitRoute: "ネット・電話",
      name: "山田太郎",
      nextAppointment: true,
      consultContent: "生保",
      products: ["医療保険", "がん保険", "収入保障"],
      firstYearFee: 24000,
      applicationDate: "2024-06-07",
      status: "成立",
      establishDate: "2024-06-13",
      thankyou: true,
    },
    {
      userId: "userId002",
      firstVisitDate: "2024-06-15",
      visitRoute: "直来",
      name: "鈴木一朗",
      nextAppointment: false,
      consultContent: "生保",
      products: ["医療保険", "定期保険", "収入保障"],
      firstYearFee: 24000,
      applicationDate: "2024-06-07",
      status: "不成立",
      establishDate: "2024-06-13",
      thankyou: true,
    },
    {
      userId: "userId003",
      firstVisitDate: "2024-06-05",
      visitRoute: "セミナー",
      name: "田中裕二",
      nextAppointment: true,
      consultContent: "損保",
      products: ["がん保険", "収入保障"],
      firstYearFee: 24000,
      applicationDate: "2024-06-07",
      status: "未成立",
      establishDate: "2024-06-13",
      thankyou: true,
    },
    {
      userId: "userId004",
      firstVisitDate: "2024-06-05",
      visitRoute: "ご紹介",
      name: "山本康裕",
      nextAppointment: true,
      consultContent: "損保",
      products: ["医療保険", "がん保険", "収入保障"],
      firstYearFee: 24000,
      applicationDate: "2024-06-07",
      status: "成立",
      establishDate: "2024-06-13",
      thankyou: true,
    },
    {
      userId: "userId005",
      firstVisitDate: "2024-06-05",
      visitRoute: "自発的",
      name: "麻生太郎",
      nextAppointment: false,
      consultContent: "その他",
      products: [],
      firstYearFee: null,
      applicationDate: null,
      status: null,
      establishDate: null,
      thankyou: false,
    },
  ];

  const routeMst: RouteMst[] = [
    {
      id: 1,
      name: "ネット・電話",
    },
    {
      id: 2,
      name: "直来",
    },
    {
      id: 3,
      name: "セミナー",
    },
    {
      id: 4,
      name: "ご紹介",
    },
    {
      id: 5,
      name: "家族",
    },
    {
      id: 6,
      name: "募集人関連",
    },
    {
      id: 7,
      name: "その他",
    },
    {
      id: 8,
      name: "更改",
    },
    {
      id: 9,
      name: "自発的",
    },
    {
      id: 10,
      name: "フォロー",
    },
  ];

  const consultContentMst: ConsultContentMst[] = [
    {
      id: 1,
      name: "生保",
    },
    {
      id: 2,
      name: "損保",
    },
    {
      id: 3,
      name: "その他",
    },
  ];

  return { salesResults, routeMst, consultContentMst };
};
