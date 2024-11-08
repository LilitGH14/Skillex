import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  getFilteredProducts,
  getProducts,
} from "../../services/productsService";

import ProductList from "../../components/shared/ProductList/ProductList";
import Pagination from "../../components/shared/Pagination/Pagination";
import Filters from "../../components/shared/Filters/Filters";

import { PRODUCT_FILTERS } from "../../constants/tableConstant";

import { convertDataBySelectedFilters } from "../../utils/productsUtils";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../utils/localStorageUtils";

import { setProducts } from "../../redux/slices/productSlice";

import styles from "./products.module.scss";

export default function Products(props) {
  const dispatch = useDispatch();

  const [productsArr, setProductsArr] = useState([]);
  const [currentProducts, setCurrentProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState([]);

  const timeoutIdRef = useRef(null);

  const itemsPerPage = 5;

  const totalPages = useMemo(() => {
    return Math.ceil(productsArr.length / itemsPerPage);
  }, [productsArr]);

  const initialFormState = useMemo(() => {
    return PRODUCT_FILTERS["products"].map((item) => ({
      ...item,
      value: "",
    }));
  }, []);

  const changePage = (page) => {
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentPage(page);
    setCurrentProducts(productsArr.slice(startIdx, endIdx));
  };

  const setProductsState = (data, _filters) => {
    dispatch(setProducts(data));

    setForm(_filters);

    setCurrentPage(1);
    setCurrentProducts(data.slice(0, itemsPerPage));

    setToLocalStorage("products", data);
    setToLocalStorage("filters", _filters);
  };

  const setFilteredData = (_filters) => {
    // in real case filtering should happen in backend
    // getFilteredProducts(_filters).then((res) => {
    //   setProductsData(res.ResponseData, _filters);
    // });

    // filtering by client
    const convertedData = convertDataBySelectedFilters(productsArr, _filters);

    setProductsState(convertedData, _filters);
  };

  const filterProducts = (_filters, needDebounce = false) => {
    setForm(_filters);

    if (needDebounce) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        setFilteredData(_filters);
      }, 1000);
    } else {
      setFilteredData(_filters);
    }
  };

  const sortByCategory = (category, type, isAscending = true) => {
    const cachedFilters = getFromLocalStorage("filters");

    const sortedProducts = [...productsArr].sort((product1, product2) => {
      const productValue1 = product1[category.toLowerCase()];
      const productValue2 = product2[category.toLowerCase()];

      if (type === "number") {
        return isAscending
          ? productValue1 - productValue2
          : productValue2 - productValue1;
      } else {
        return isAscending
          ? productValue1.localeCompare(productValue2)
          : productValue2.localeCompare(productValue1);
      }
    });

    setProductsState(sortedProducts, cachedFilters);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setProductsState(productsArr, initialFormState);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const cachedProducts = getFromLocalStorage("products");
      const cachedFilters = getFromLocalStorage("filters");

      if (cachedProducts) {
        setProductsState(cachedProducts, cachedFilters);
      } else {
        getProducts().then((res) => {
          if (res.ResponseStatus === 200) {
            setProductsState(res.ResponseData, initialFormState);
            setProductsArr(res.ResponseData);
          }
        });
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      {currentProducts?.length > 0 && (
        <div className={styles.content}>
          <ProductList
            products={currentProducts}
            sortByCategory={sortByCategory}
            deviceType={props.deviceType}
          />
          {totalPages > 1 && (
            <Pagination
              totalItems={currentProducts.length}
              itemsPerPage={itemsPerPage}
              paginate={changePage}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
      {currentProducts?.length === 0 && (
        <h4 className={styles.noData}>No product found</h4>
      )}
      <Filters
        filterForms={form}
        handleChange={filterProducts}
        deviceType={props.deviceType}
        resetForm={resetForm}
      />
    </div>
  );
}
