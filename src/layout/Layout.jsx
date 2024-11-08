import React, { cloneElement, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setError } from "../redux/slices/generalSlice";
import { useAxiosInterceptors } from "../services/httpClient";
import Preloader from "../components/common/Preloader/Preloader";
import ErrorMsg from "../components/common/ErrorMsg/ErrorMsg";

import styles from "./layout.module.scss";

export default function Layout({ children }) {
  useAxiosInterceptors();

  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.general);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const deviceType = useMemo(() => {
    if (windowWidth <= 767) return "mobile";
    if (windowWidth >= 768 && windowWidth <= 1024) return "tablet";
    return "desktop";
  }, [windowWidth]);

  let layout;

  // for each device type we can have different layouts
  if (deviceType === "mobile") {
    layout = (
      <div className={styles.layout_wrapper}>
        <main className={styles.content}>
          {cloneElement(children, { deviceType: "mobile" })}
        </main>
      </div>
    );
  } else if (deviceType === "tablet") {
    layout = (
      <div className={styles.layout_wrapper}>
        <main className={styles.content}>
          {cloneElement(children, { deviceType: "tablet" })}
        </main>
      </div>
    );
  } else {
    layout = (
      <div className={styles.layout_wrapper}>
        <main className={styles.content}>
          {cloneElement(children, { deviceType: "desktop" })}
        </main>
      </div>
    );
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // here go general components
  return (
    <>
      {isLoading && <Preloader />}
      {layout}
      {error && (
        <ErrorMsg
          error={error}
          showModal={!!error}
          closeModal={() => dispatch(setError(""))}
        />
      )}
    </>
  );
}
