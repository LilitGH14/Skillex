import React from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import styles from "./preloader.module.scss";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#646467",
};

export default function Preloader() {
  const { isLoading } = useSelector((state) => state.general);

  return (
    <div className={styles.loaderWrapper}>
      <ClipLoader
        loading={isLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        className={styles.preloader}
      />
    </div>
  );
}
