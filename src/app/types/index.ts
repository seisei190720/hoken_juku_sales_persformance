export type MenuItem = {
  name: string;
  menuKind: MenuKind;
  icon: React.ReactNode;
};

export type MenuKind = "mypage" | "search" | "dashboard";

export type IndividualSalesResult = {
  visitDay: string;
  customerKind: string;
  customerName: string;
  consultContents: string;
  nextAppointment: boolean;
  contractCount: number;
  contractProduct: string;
  thankyou: boolean;
};
