import React, { useState, useContext, useEffect } from "react";
import { css } from "@emotion/css";
import { QueryClient, QueryClientProvider } from "react-query";
import classNames from "classnames";
import Header from "@/components/Header/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { HeaderProvider } from "@/context/HeaderContext";
import { ThemeContext } from "@/context/ThemeContext";
import Footer from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

function App({ children }) {
  const { pageTheme } = useContext(ThemeContext);

  return (
    <HeaderProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Merriweather:300,700,300italic,700italic|Source+Sans+Pro:400,900|Montserrat:400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <div
          className={classNames("container mx-auto relative", {
            dark: pageTheme === "dark",
          })}
        >
          <Header />
          <main
            className={classNames(
              "bg-white dark:bg-gray-900 rounded-b-3xl text-lg mb-6 lg:mb-16 leading-relaxed shadow-2xl overflow-x-hidden relative",
              css`
                ul,
                hr,
                ol,
                p:not(:last-child) {
                  // margin-bottom: 1.25rem;
                }

                a:not([class]) {
                  color: var(--color-primary-500);
                }

                a {
                  cursor: pointer;
                }
              `
            )}
          >
            {children}
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </HeaderProvider>
  );
}

export default App;
