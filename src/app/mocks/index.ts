import {
  CompanyMst,
  ConsultContentMst,
  IndividualSalesResult,
  ProductMst,
  RouteMst,
} from "../types";

export const useMockData = () => {
  const salesResults: IndividualSalesResult[] = [
    {
      uuid: "uuid001",
      userId: "userId001",
      firstVisitDate: "2024-06-05",
      visitRoute: "ネット・電話",
      name: "山田太郎",
      nextAppointment: true,
      consultContent: "生保",
      applications: [
        {
          applicationDate: "2024-06-07",
          product: "医療保険",
          company: "ソニー損保",
          status: "成立",
          firstYearFee: 24000,
          establishDate: "2024-06-13",
        },
        {
          applicationDate: "2024-06-07",
          product: "がん保険",
          company: "東京海上日動",
          status: "未成立",
          firstYearFee: null,
          establishDate: null,
        },
        {
          applicationDate: "2024-06-07",
          product: "収入保障",
          company: "第一生命",
          status: "不成立",
          firstYearFee: null,
          establishDate: null,
        },
      ],
      thankyou: true,
    },
    {
      uuid: "uuid002",
      userId: "userId002",
      firstVisitDate: "2024-06-15",
      visitRoute: "直来",
      name: "鈴木一朗",
      nextAppointment: false,
      consultContent: "生保",
      applications: [],
      thankyou: true,
    },
    {
      uuid: "uuid003",
      userId: "userId003",
      firstVisitDate: "2024-06-05",
      visitRoute: "セミナー",
      name: "田中裕二",
      nextAppointment: true,
      consultContent: "損保",
      applications: [
        {
          applicationDate: "2024-06-07",
          product: "医療保険",
          company: "ソニー損保",
          status: "成立",
          firstYearFee: 24000,
          establishDate: "2024-06-13",
        },
        {
          applicationDate: "2024-06-07",
          product: "がん保険",
          company: "東京海上日動",
          status: "成立",
          firstYearFee: 30000,
          establishDate: "2024-06-29",
        },
      ],
      thankyou: true,
    },
    {
      uuid: "uuid004",
      userId: "userId004",
      firstVisitDate: "2024-06-05",
      visitRoute: "ご紹介",
      name: "山本康裕",
      nextAppointment: true,
      consultContent: "損保",
      applications: [],
      thankyou: true,
    },
    {
      uuid: "uuid005",
      userId: "userId005",
      firstVisitDate: "2024-06-05",
      visitRoute: "自発的",
      name: "麻生太郎",
      nextAppointment: false,
      consultContent: "その他",
      applications: [
        {
          applicationDate: "2024-07-07",
          product: "医療保険",
          company: "ソニー損保",
          status: "未成立",
          firstYearFee: null,
          establishDate: null,
        },
      ],
      thankyou: false,
    },
  ];

  const routeMst: RouteMst[] = [
    {
      id: "1",
      name: "ネット・電話",
    },
    {
      id: "2",
      name: "直来",
    },
    {
      id: "3",
      name: "セミナー",
    },
    {
      id: "4",
      name: "ご紹介",
    },
    {
      id: "5",
      name: "家族",
    },
    {
      id: "6",
      name: "募集人関連",
    },
    {
      id: "7",
      name: "その他",
    },
    {
      id: "8",
      name: "更改",
    },
    {
      id: "9",
      name: "自発的",
    },
    {
      id: "10",
      name: "フォロー",
    },
  ];

  const consultContentMst: ConsultContentMst[] = [
    {
      id: "1",
      name: "生保",
    },
    {
      id: "2",
      name: "損保",
    },
    {
      id: "3",
      name: "その他",
    },
  ];

  const productMst: ProductMst[] = [
    {
      id: "1",
      name: "医療保険",
    },
    {
      id: "2",
      name: "がん保険",
    },
    {
      id: "3",
      name: "三大一時金",
    },
    {
      id: "4",
      name: "収入保険",
    },
    {
      id: "5",
      name: "就業不能",
    },
    {
      id: "6",
      name: "定期保険",
    },
    {
      id: "7",
      name: "円終身",
    },
    {
      id: "8",
      name: "ドル終身",
    },
    {
      id: "9",
      name: "変額保険",
    },
    {
      id: "10",
      name: "年金保険",
    },
    {
      id: "11",
      name: "介護保険",
    },
    {
      id: "12",
      name: "一時払い",
    },
    {
      id: "13",
      name: "他生保",
    },
    {
      id: "14",
      name: "火災保険",
    },
    {
      id: "15",
      name: "地震保険",
    },
    {
      id: "16",
      name: "自動車",
    },
    {
      id: "17",
      name: "傷害保険",
    },
    {
      id: "18",
      name: "賠責保険",
    },
    {
      id: "19",
      name: "旅行保険",
    },
    {
      id: "20",
      name: "他損保",
    },
  ];

  const companyMst: CompanyMst[] = [
    {
      id: "1",
      name: "アクサ",
    },
    {
      id: "2",
      name: "朝日生命",
    },
    {
      id: "3",
      name: "アフラック",
    },
    {
      id: "4",
      name: "FWD",
    },
    {
      id: "5",
      name: "オリックス",
    },
    {
      id: "6",
      name: "ジブラルタ",
    },
    {
      id: "7",
      name: "ソニー生命",
    },
    {
      id: "8",
      name: "ひまわり",
    },
    {
      id: "9",
      name: "フロンティア",
    },
    {
      id: "10",
      name: "チューリッヒ",
    },
    {
      id: "11",
      name: "あんしん",
    },
    {
      id: "12",
      name: "なないろ",
    },
    {
      id: "13",
      name: "日本生命",
    },
    {
      id: "14",
      name: "ネオファ",
    },
    {
      id: "15",
      name: "はなさく",
    },
    {
      id: "16",
      name: "マニュ",
    },
    {
      id: "17",
      name: "あいおい",
    },
    {
      id: "18",
      name: "メット",
    },
    {
      id: "19",
      name: "メディケア",
    },
    {
      id: "20",
      name: "ニッセイ同和",
    },
    {
      id: "21",
      name: "イーデザイン",
    },
    {
      id: "22",
      name: "AIG",
    },
    {
      id: "23",
      name: "セゾン",
    },
    {
      id: "24",
      name: "ソニー損保",
    },
    {
      id: "25",
      name: "損保ジャパン",
    },
    {
      id: "26",
      name: "東京海上",
    },
    {
      id: "27",
      name: "三井住友",
    },
    {
      id: "28",
      name: "楽天",
    },
  ];
  return { salesResults, routeMst, consultContentMst, productMst, companyMst };
};
