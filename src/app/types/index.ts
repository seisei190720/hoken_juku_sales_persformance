export type MenuItem = {
  name: string;
  menuKind: MenuKind;
  icon: React.ReactNode;
};

export type MenuKind = "mypage" | "member" | "store" | "year";

export type applicationStatus = "未成立" | "成立" | "不成立" | null;

export type IndividualSalesResult = {
  uuid: string;
  userId: string;
  firstVisitDate: string; //初回来店日
  visitRoute: string; //経路 mst
  name: string; //お名前
  nextAppointment: boolean; //次アポ
  consultContent: string; //相談内容 mst(生保、損保、その他)
  applications: Application[];
  thankyou: boolean; //ありがとう
};

export type Application = {
  userId: string;
  applicationDate: string; //申込日
  product: string | null; //mst
  company: string | null; //mst
  firstYearFee: number | null; //初年度手数料
  status: string; //ステータス mst(未成立、成立、不成立)
  establishDate: string | null; //成立日
};

export type UpdateApplication = {
  applicationDate: string;
  product: ProductMst | null;
  company: CompanyMst | null;
  firstYearFee: number | null;
  status: StatusMst | null;
  establishDate: string | null;
};

export type NewApplication = {
  applicationDate: string;
  product: ProductMst | null;
  company: CompanyMst | null;
};

export type NewVisitor = {
  firstVisitDate: string | null;
  visitRoute: RouteMst | null;
  name: string | null;
  nextAppointment: boolean;
  consultContent: ConsultContentMst | null;
};

export type RouteKind = "new" | "exist";
export type RouteMst = {
  id: string;
  name: string;
  kind: RouteKind;
};

export type ConsultContentMst = {
  id: string;
  name: string;
};

export type ProductKind = "life" | "nonLife";
export type ProductMst = {
  id: string;
  name: string;
  kind: ProductKind;
};

export type CompanyMst = {
  id: string;
  name: string;
};

export type StatusMst = {
  id: string;
  name: string;
};

export type Member = {
  id: string;
  name: string;
};

export const yearMonth = [
  {
    name: "7月",
    keyMonth: "-07-",
  },
  {
    name: "8月",
    keyMonth: "-08-",
  },
  {
    name: "9月",
    keyMonth: "-09-",
  },
  {
    name: "10月",
    keyMonth: "-10-",
  },
  {
    name: "11月",
    keyMonth: "-11-",
  },
  {
    name: "12月",
    keyMonth: "-12-",
  },
  {
    name: "1月",
    keyMonth: "-01-",
  },
  {
    name: "2月",
    keyMonth: "-02-",
  },
  {
    name: "3月",
    keyMonth: "-03-",
  },
  {
    name: "4月",
    keyMonth: "-04-",
  },
  {
    name: "5月",
    keyMonth: "-05-",
  },
  {
    name: "6月",
    keyMonth: "-06-",
  },
];
