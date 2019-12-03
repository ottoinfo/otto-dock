/* @flow */

import React, { Fragment } from "react";
import withRedux from "next-redux-wrapper";
import Head from "next/head";

export function Error(props) {
  return (
    <Fragment>
      <Head>
        <title>Error</title>
      </Head>

      <body>Hello World</body>
    </Fragment>
  );
}

Error.getInitialProps = async props => {
  const { store, req, res, err } = props;
  const state = store.getState();

  let statusCode;
  if (res || err) {
    statusCode = res.statusCode || err.statusCode;
  }

  return { statusCode, siteContext };
};

export default withRedux(createStore)(Error);
