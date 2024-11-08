import React from "react";

import styles from "./pagination.module.scss";

export default function Pagination({ paginate, currentPage, totalPages }) {
  const handleNext = () => {
    paginate(Math.min(currentPage + 1, totalPages));
  };

  const handlePrev = () => {
    paginate(Math.max(currentPage - 1, 1));
  };

  if (totalPages === 1) return;

  return (
    <div className={styles.container}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.prev}
      >
        Previous
      </button>
      <span className={styles.pages}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.next}
      >
        Next
      </button>
    </div>
  );
}
