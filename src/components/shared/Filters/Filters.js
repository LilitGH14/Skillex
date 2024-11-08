import { useState, useCallback } from "react";

import styles from "./filters.module.scss";

export default function Filters({
  filterForms,
  deviceType,
  handleChange,
  resetForm,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const changeFilter = useCallback(
    (filter, value, idx) => {
      const updatedFilters = [...filterForms];
      updatedFilters[idx] = { ...filter, value };

      handleChange(updatedFilters, filter.type !== "select");
    },
    [filterForms, handleChange]
  );

  const renderFilterInput = (m, idx) => {
    const handleInputChange = (e) => changeFilter(m, e.target.value, idx);

    return m.type === "select" ? (
      <select
        onChange={handleInputChange}
        value={m.value}
        placeholder={m.placeholder}
      >
        <option value="" disabled>
          {m.placeholder}
        </option>
        {m.options.map(({ id, name, value }) => (
          <option key={id} value={value}>
            {name}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={m.type}
        name={m.name}
        value={m.value || ""}
        onChange={handleInputChange}
        placeholder={m.placeholder}
      />
    );
  };

  return (
    <div className={styles.container}>
      {["tablet", "mobile"].includes(deviceType) && (
        <button className={styles.menuButton} onClick={toggleMenu}>
          <img
            src={`${process.env.REACT_APP_PUBLIC_IMAGE_URL}/filter.svg`}
            alt="Filter"
          />
        </button>
      )}
      <div className={styles[isMenuOpen ? "opened" : "closed"]}>
        {deviceType !== "mobile" && (
          <div className={styles.header}>
            <span>Filters</span>
          </div>
        )}
        <form className={styles.filters}>
          {filterForms?.map((m, idx) => (
            <label key={`filterInp${m.id}`}>
              {m.label}
              {renderFilterInput(m, idx)}
            </label>
          ))}
        </form>
        <button onClick={() => resetForm()} className={styles.submitBtn}>
          Reset filters
        </button>
      </div>
    </div>
  );
}
