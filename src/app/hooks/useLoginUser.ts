import { useEffect, useState } from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

export const useLoginUser = () => {
  // export const useLoginUser = ({ user: AuthUser }) => {
  const [loginUser, setLoginUser] = useState<
    AmazonCognitoIdentity.CognitoUser | undefined
  >(undefined);

  const poolData = {
    UserPoolId: "ap-northeast-1_llO4mR1XR",
    ClientId: "570fo2tn3km1dmmsl6haa94l0k",
  };
  useEffect(() => {
    console.log("user");
  }, []);

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
  console.log(cognitoUser);
  let currentUserData = {};
  // const getUserAttribute = () => {
  //   // 現在のユーザー情報が取得できているか？
  //   if (cognitoUser != null) {
  //     cognitoUser.getSession(function (err, session) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         // ユーザの属性を取得
  //         cognitoUser.getUserAttributes(function (err, result) {
  //           if (err) {
  //             console.log("エラーです" + err);
  //           }

  //           // 取得した属性情報を連想配列に格納
  //           for (let i = 0; i < result.length; i++) {
  //             currentUserData[result[i].getName()] = result[i].getValue();
  //           }
  //           console.log(currentUserData);
  //         });
  //       }
  //     });
  //   } else {
  //     console.log("elseに入ったよ");
  //   }
  // };

  return {
    cognitoUser,
  };
};
