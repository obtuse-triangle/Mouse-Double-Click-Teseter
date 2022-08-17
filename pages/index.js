import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import Script from "next/script";

export default function Home() {
  const [count, setCount] = React.useState(0);
  const [clickTime, setClickTime] = React.useState(0);
  const [log, setLog] = React.useState([]);
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [doubleClickDetected, setDoubleClickDetected] = React.useState(false);
  const logRef = React.useRef(null);
  let { t, lang } = useTranslation("index");

  React.useEffect(() => {
    if (autoScroll) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  });

  function handleClick(e) {
    e.preventDefault(e);
    var currentTime = new Date();
    if (currentTime - clickTime < 100) {
      setDoubleClickDetected(true);
    }
    setLog((currnt) => [...currnt, (currentTime - clickTime) / 1000]);
    setCount((currt) => currt + 1);
    setClickTime(currentTime);
  }

  function handleAutoScrollCheckbox() {
    setAutoScroll((currnt) => !currnt);
    console.log("changed.");
  }

  function handleClearLog() {
    setLog([]);
    setCount(0);
    setDoubleClickDetected(false);
  }




  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("index:description")} />
      </Head>

      <div
        className={styles.clickArea}
        onClick={(e) => handleClick(e)}
        onContextMenu={(e) => handleClick(e)}
        style={doubleClickDetected ? { backgroundColor: "tomato" } : null}
      >
        {doubleClickDetected ? t("index:doubleClickDetected") : t("index:Clickhere")}
      </div>

      <div className={styles.content}>

        <span>{count}</span>

        <input
          type="checkbox"
          name="Auto scroll"
          className={styles.checkBox}
          id="scrollCheckbox"
          defaultChecked
          onClick={handleAutoScrollCheckbox}
        />
        <label htmlFor="scrollCheckbox" style={{ userSelect: "none" }}>
          {t("index:AutoScroll")}
        </label>

        <button onClick={handleClearLog} className={styles.checkBox}>
          Reset
        </button>

        <div className={styles.logArea} ref={logRef}>
          {log.map((time, index) => {
            return (
              <div key={index} className={styles.logText}>
                {time}
              </div>
            );
          })}
        </div>
        <a href={lang == "ko" ? "/en" : "/ko"}>{t("index:Language")}</a>
      
        <div className="kakaoAdFit" style={{width:"300px", margin:"auto"}}>
          <ins className="kakao_ad_area" style={{display:"none"}} 
            data-ad-unit    = "DAN-yAXOS88i3L3sO9C2" 
            data-ad-width   = "300" 
            data-ad-height  = "250">
          </ins> 
        </div>
        <Script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></Script>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5639066827211612"
        crossorigin="anonymous"></Script>
        <div>
          <h3>마우스의 더블클릭 현상이란?</h3>
          <p>마우스를 한번 클릭했지만, 두번 클릭되는 증상을 말합니다. <del>주로 로지텍 마우스에서 일어납니다.</del></p>
          <h3>마우스 더블클릭 현상을 테스트 하는 방법</h3>
          <p>사이트 위쪽의 초록 버튼을 1초 정도 간격으로 여러번 클릭해보세요. 마우스에서 더블클릭 현상이 나타날 경우 버튼이 빨간색으로 변하며 더블클릭 감지됨 이라고 나타납니다.</p>
          <h3>더블클릭은 어떻게 고칠 수 있나요?</h3>
          <p>공식 AS센터에 문의하는 것이 가장 좋은 방법입니다. 하지만 공식 AS센터에 수리접수를 하지 못하는 마우스의 경우에는 자가수리를 시도해 볼 수 있습니다.</p>
        </div>
      </div>
    </>
  );
}
