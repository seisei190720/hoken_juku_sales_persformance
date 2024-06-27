"use client";
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";
import styles from "./page.module.css";
import { useAuthenticator } from "@aws-amplify/ui-react"; //AmplifyでReactのuiを提供するライブラリ
import "@aws-amplify/ui-react/styles.css"; //css適用
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "570fo2tn3km1dmmsl6haa94l0k",
      userPoolId: "ap-northeast-1_llO4mR1XR",
    },
  },
});
function Home() {
  const { user, route } = useAuthenticator((context) => [context.user]);
  const poolData = {
    UserPoolId: "ap-northeast-1_llO4mR1XR",
    ClientId: "570fo2tn3km1dmmsl6haa94l0k",
  };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const cognitoUser = userPool.getCurrentUser();
  console.log(cognitoUser);
  let currentUserData = {};
  const getUserAttribute = () => {
    // 現在のユーザー情報が取得できているか？
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log(err);
        } else {
          // ユーザの属性を取得
          cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              console.log("エラーです" + err);
            }

            // 取得した属性情報を連想配列に格納
            for (let i = 0; i < result.length; i++) {
              currentUserData[result[i].getName()] = result[i].getValue();
            }
            console.log(currentUserData);
          });
        }
      });
    } else {
      console.log("elseに入ったよ");
    }
  };

  return (
    <main className={styles.main}>
      <button onClick={() => cognitoUser.signOut()}>Sign Out</button>
      <button onClick={() => getUserAttribute()}>Sign Out</button>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}

export default withAuthenticator(Home);
