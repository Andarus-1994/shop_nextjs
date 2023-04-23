import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../Components/Layout";
import { store } from "../store/store";
import { Provider } from "react-redux";
import Nav from "../Components/Navbar";
import Footer from "../Components/Footer";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

export default function App({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <Provider store={store}>
      <Layout>
        <Nav />
        {Component.PageLayout ? (
          <Component.PageLayout {...pageProps}>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <>
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </Layout>
      <Analytics />
    </Provider>
  );
}
