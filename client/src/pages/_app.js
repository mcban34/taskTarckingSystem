import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {

  const router = useRouter();

  return <Component {...pageProps} />;
}
