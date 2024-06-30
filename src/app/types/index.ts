export type MenuItem = {
  name: string;
  menuKind: MenuKind;
  icon: React.ReactNode;
};

export type MenuKind = "mypage" | "search" | "dashboard";

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
  product: string; //mst
  company: string; //mst
  firstYearFee: number | null; //初年度手数料
  applicationDate: string | null; //申込日
  status: applicationStatus | null; //ステータス mst(未成立、成立、不成立)
  establishDate: string | null; //成立日
};

export type NewVisitor = {
  firstVisitDate: string | null;
  visitRoute: RouteMst | null;
  name: string | null;
  nextAppointment: boolean;
  consultContent: ConsultContentMst | null;
};

export type RouteMst = {
  id: string;
  name: string;
};

export type ConsultContentMst = {
  id: string;
  name: string;
};
