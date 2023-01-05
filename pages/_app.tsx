import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../src/components/ui/Layout/Layout'
import { useEffect, CSSProperties } from 'react';
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  const styles: CSSProperties = {
    height: "calc(100vh - env(safe-area-inset-bottom))",
  };
  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
  return (
    <div
      className="flex flex-col"
      style={{
        height: "calc(var(--vh, 1vh) * 100)",
      }}
    >
      <Head>
        <title>Pokemon Searcher </title>
      </Head>
      <Layout>
        <div className='overflow-y-auto grow'>
          <Component {...pageProps} />
        </div>
      </Layout>
    </div>
  )
}