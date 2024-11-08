import { PRODUCT_LIST_HEADER } from "../../../constants/tableConstant";

import styles from "./productList.module.scss";

export default function ProductList({ products, sortByCategory, deviceType }) {
  return (
    <ul className={styles.productTable}>
      <li className={`${styles.tableHeader} ${styles.listItem}`}>
        {PRODUCT_LIST_HEADER.map((header) => {
          return (
            <span key={"header" + header.name}>
              {header.name}
              <>
                <button
                  className={styles.sortIcon}
                  onClick={() => sortByCategory(header.name, header.type, true)}
                >
                  <img
                    src={`${process.env.REACT_APP_PUBLIC_IMAGE_URL}/sortUp.svg`}
                    alt={`${header.name} sort icon up`}
                  />
                </button>
                <button
                  className={styles.sortIcon}
                  onClick={() =>
                    sortByCategory(header.name, header.type, false)
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_PUBLIC_IMAGE_URL}/sortDown.svg`}
                    alt={`${header.name} sort icon down`}
                  />
                </button>
              </>
            </span>
          );
        })}
      </li>
      {products?.map((product, idx) => (
        <li
          className={`${styles.tableRow} ${styles.listItem}`}
          key={product.id}
        >
          {PRODUCT_LIST_HEADER.map((header) => {
            return (
              <div
                key={"data" + header.name}
                className={styles.rowData}
                data-testid={`product-${idx}-${header.name}`}
              >
                {deviceType === "mobile" && <span>{header.name}</span>}
                <span>{product[header.name.toLocaleLowerCase()]}</span>
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
}
