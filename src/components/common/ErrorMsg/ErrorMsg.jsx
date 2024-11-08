import React, { useEffect } from "react";
import Modal from "simple-react-modal";

import styles from "./errorMsg.module.scss";

export default function ErrorMsg({ error, showModal, closeModal }) {
  useEffect(() => {
    document.body.setAttribute("class", "overlay");

    return () => {
      document.body.removeAttribute("class");
    };
  }, []);

  return (
    <Modal
      show={showModal}
      onClose={closeModal}
      closeOnOuterClick={true}
      containerClassName={styles.container}
    >
      <div className={styles.header}>
        <button onClick={closeModal}>&#x2715;</button>
      </div>
      <div className={styles.content}>
        <p className={styles.error}>{error}</p>
      </div>
    </Modal>
  );
}
