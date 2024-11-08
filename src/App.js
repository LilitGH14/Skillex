import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Products from "./features/Products/Products";
import ReduxProvider from "./redux/provider";
import withLayout from "./hoc/withLayout";

const HomeWithLayout = withLayout(Products); // in case of Login page we will not need the Layout layer, so we can use HOC
const ProductsWithLayout = withLayout(Products);

export default function App() {
  return (
    <ReduxProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeWithLayout />} />
          <Route path="/products" element={<ProductsWithLayout />} />
          <Route path="*" element={<Navigate to="/" />} />  {/* we can also redirect to PageNotFound page*/}
        </Routes>
      </Router>
    </ReduxProvider>
  );
}
