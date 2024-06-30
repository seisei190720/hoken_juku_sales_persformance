import { NewVisitor } from "@/app/types";
import { useCallback, useState } from "react";

export const useNewVisitor = (
  postVisitorData: (newData: NewVisitor) => Promise<void>
) => {
  const [newVisitor, setNewVisitor] = useState<NewVisitor>({
    firstVisitDate: null, //今日の日付を入れる
    visitRoute: null,
    name: null,
    nextAppointment: false,
    consultContent: null,
  });

  const submitNewVisitor = useCallback(() => {
    //TODO: validationを実装する
    // postVisitorData(newVisitor);

    postVisitorData({
      firstVisitDate: "204-06-25",
      visitRoute: "チラシ",
      name: "山本浩",
      nextAppointment: true,
      consultContent: "生保",
    });
  }, [newVisitor, postVisitorData]);

  return { newVisitor, submitNewVisitor };
};
