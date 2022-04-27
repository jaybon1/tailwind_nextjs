import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {StoreProvider} from "@/store/StoreContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
        {/*<style global jsx>{reset}</style>*/}
      </>
  );
}

export default MyApp

// nextjs 페이지 높이 설정
// <style global jsx>{`
//       html,
//       body,
//       body > div:first-child,
//       div#__next,
//       div#__next > div {
//         height: 100%;
//       }
//     `}</style>