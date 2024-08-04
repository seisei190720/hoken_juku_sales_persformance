import {
  CompanyMst,
  ConsultContentMst,
  Member,
  ProductMst,
  RouteMst,
  StatusMst,
} from "../types";

export const useMockData = () => {
  const routeMst: RouteMst[] = [
    {
      id: "1",
      name: "ネット・電話",
      kind: "new",
    },
    {
      id: "2",
      name: "直来",
      kind: "new",
    },
    {
      id: "3",
      name: "セミナー",
      kind: "new",
    },
    {
      id: "4",
      name: "ご紹介",
      kind: "new",
    },
    {
      id: "5",
      name: "家族",
      kind: "new",
    },
    {
      id: "6",
      name: "募集人関連",
      kind: "new",
    },
    {
      id: "7",
      name: "その他",
      kind: "new",
    },
    {
      id: "8",
      name: "更改",
      kind: "exist",
    },
    {
      id: "9",
      name: "自発的",
      kind: "exist",
    },
    {
      id: "10",
      name: "フォロー",
      kind: "exist",
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
      kind: "life",
    },
    {
      id: "21",
      name: "緩和医療",
      kind: "life",
    },
    {
      id: "2",
      name: "がん保険",
      kind: "life",
    },
    {
      id: "3",
      name: "特定疾病",
      kind: "life",
    },
    {
      id: "4",
      name: "収入保障",
      kind: "life",
    },
    {
      id: "5",
      name: "就業不能",
      kind: "life",
    },
    {
      id: "6",
      name: "定期保険",
      kind: "life",
    },
    {
      id: "7",
      name: "円建終身",
      kind: "life",
    },
    {
      id: "8",
      name: "外貨建終身",
      kind: "life",
    },
    {
      id: "9",
      name: "変額保険",
      kind: "life",
    },
    {
      id: "10",
      name: "個人年金",
      kind: "life",
    },
    {
      id: "11",
      name: "介護保険",
      kind: "life",
    },
    {
      id: "12",
      name: "一時払",
      kind: "life",
    },
    {
      id: "13",
      name: "他生保",
      kind: "life",
    },
    {
      id: "14",
      name: "火災保険",
      kind: "nonLife",
    },
    {
      id: "15",
      name: "地震保険",
      kind: "nonLife",
    },
    {
      id: "16",
      name: "自動車保険",
      kind: "nonLife",
    },
    {
      id: "17",
      name: "傷害保険",
      kind: "nonLife",
    },
    {
      id: "18",
      name: "賠責保険",
      kind: "nonLife",
    },
    {
      id: "19",
      name: "旅行保険",
      kind: "nonLife",
    },
    {
      id: "22",
      name: "事業保険",
      kind: "nonLife",
    },
    {
      id: "20",
      name: "他損保",
      kind: "nonLife",
    },
  ];

  const companyMst: CompanyMst[] = [
    {
      id: "1",
      name: "アクサ生命",
    },
    {
      id: "2",
      name: "朝日生命",
    },
    {
      id: "3",
      name: "アフラック生命",
    },
    {
      id: "4",
      name: "FWD生命",
    },
    {
      id: "5",
      name: "オリックス生命",
    },
    {
      id: "6",
      name: "ジブラルタ生命",
    },
    {
      id: "7",
      name: "ソニー生命",
    },
    {
      id: "8",
      name: "SOMPOひまわり生命",
    },
    {
      id: "9",
      name: "第一フロンティア生命",
    },
    {
      id: "10",
      name: "チューリッヒ生命",
    },
    {
      id: "11",
      name: "東京海上日動あんしん生命",
    },
    {
      id: "12",
      name: "なないろ生命",
    },
    {
      id: "13",
      name: "日本生命",
    },
    {
      id: "14",
      name: "ネオファースト生命",
    },
    {
      id: "15",
      name: "はなさく生命",
    },
    {
      id: "16",
      name: "マニュライフ生命",
    },
    {
      id: "17",
      name: "三井住友海上あいおい生命",
    },
    {
      id: "18",
      name: "メットライフ生命",
    },
    {
      id: "19",
      name: "メディケア生命",
    },
    {
      id: "20",
      name: "あいおいニッセイ同和損保",
    },
    {
      id: "21",
      name: "イーデザイン損保",
    },
    //22, 23は削除した。ただ、データがすでに入っているので、本番稼働時に採番を綺麗に振り直す
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
      name: "東京海上日動",
    },
    {
      id: "27",
      name: "三井住友海上",
    },
    {
      id: "28",
      name: "楽天損保",
    },
    {
      id: "29",
      name: "日新火災海上",
    },
  ];

  const statusMst: StatusMst[] = [
    {
      id: "1",
      name: "未成立",
    },
    {
      id: "2",
      name: "成立",
    },
    {
      id: "3",
      name: "不成立",
    },
  ];

  const members: Member[] = [
    {
      id: "4a3ef7b6-f6bb-4502-876b-ca81b1313811",
      name: "江澤誠哉",
    },
    {
      id: "85588ef2-4f3f-44d5-9636-a3b4cb6985e0",
      name: "江澤宏直",
    },
    {
      id: "7a31f925-0abd-4564-94f9-6bcdb9496cbb",
      name: "野比のび太",
    },
    {
      id: "e9d35fb1-08b3-428f-b5ac-6a04e1ce134c",
      name: "源しずか",
    },
    {
      id: "4364633f-c45f-417b-b762-fc918b7daa14",
      name: "骨川スネ夫",
    },
    {
      id: "e5b432df-16e6-4dbf-be46-dd7a5f8e125d",
      name: "剛田武",
    },
  ];
  return {
    routeMst,
    consultContentMst,
    productMst,
    companyMst,
    statusMst,
    members,
  };
};
