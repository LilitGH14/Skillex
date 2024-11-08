import React from "react";
import Layout from "../layout/Layout";

const withLayout = (PageComponent) => {
  return (props) => (
    <Layout>
      <PageComponent {...props} />
    </Layout>
  );
};

export default withLayout;
