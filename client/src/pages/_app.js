import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

  const router = useRouter();

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={1500}
      />
    </>
  );
}
