/* @flow */

import React, { Fragment } from "react";
import App from "next/app";
import { Provider } from "react-redux";
import Head from "next/head";

export default class extends App {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorEventId: null,
      statusCode: null
    };
  }

  static async getInitialProps({ Component, ctx }: Object) {
    try {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      return {
        hasError: true,
        errorEventId,
        statusCode: ctx.isServer ? "500" : false,
        pageProps: {
          dataLayer: {
            pagetype: "error",
            errortype: errorEventId
          },
          props: {},
          store: {}
        }
      };
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined,
      statusCode: props.statusCode || state.statusCode || undefined
    };
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true };
  }

  componentDidCatch(error: Object, errorInfo: Object) {
    this.setState({ errorEventId });
  }

  render() {
    const { hasError, errorEventId, statusCode } = this.state;
    if (!hasError) {
      // Render the normal Next.js page
      return super.render();
    }
    // Render Custom Error Page
    // to leverage the existing ERROR App we have to create a REDUX Store
    // and used outside of NEXT.JS Framework ( infinite loop in NEXT )
    return (
      <Provider store={createStore({})}>
        <Fragment>
          <Head>
            <title>Error</title>
          </Head>

          <Theme>
            <Error
              message="Oops! An error occured on this page."
              errorEventId={errorEventId}
              statusCode={statusCode}
            />
          </Theme>
        </Fragment>
      </Provider>
    );
  }
}
