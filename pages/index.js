import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react"

export default function Home() {
  const [count, setCount] = React.useState(0);
  const [clickTime, setClickTime] = React.useState(0);
  const [log, setLog] = React.useState([]);
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [doubleClickDetected, setDoubleClickDetected] = React.useState(false);
  const logRef = React.useRef(null);

  function handleClick(e) {
    e.preventDefault(e);
    var currentTime = new Date();
    if(currentTime - clickTime < 100) {
      setDoubleClickDetected(true);
    }
    setLog((currnt)=> [...currnt, ((currentTime - clickTime) / 1000)]);
    setCount((currt)=>currt+1);
    setClickTime(currentTime);
    if(autoScroll){
      logRef.current.scrollTop = logRef.current.scrollHeight+1;
    }
  }

  function handleAutoScrollCheckbox() {
    setAutoScroll((currnt)=>!currnt);
    console.log("changed.")
  }

  function handleClearLog() {
    setLog([]);
    setCount(0);
    setDoubleClickDetected(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Mouse double click tester</title>
        <meta name="description" content="Mouse double click test" />
      </Head>

      <div className={styles.clickArea} onClick={(e) =>handleClick(e)} onContextMenu={(e) =>handleClick(e)} style={doubleClickDetected ? {backgroundColor : "tomato"} : null}>
        {doubleClickDetected ? "double click detected!" : "Click here to test mouse!"}

      </div>
      
      <span className={styles.checkBox}>{count}</span>

      <input type="checkbox" name="Auto scroll" className={styles.checkBox} id="scrollCheckbox" defaultChecked onClick={handleAutoScrollCheckbox}/>
      <label htmlFor="scrollCheckbox" style={{userSelect:"none"}}>Auto scroll</label>

      <button onClick={handleClearLog} className={styles.checkBox}>Reset</button>
      
      <div className={styles.logArea} ref={logRef}>
        {log.map ((time, index) => {
          return <div key={index} className={styles.logText}>{time}</div>
        }
        )}
      </div>
    </div>
  );
}
