import { globarStyles } from "@/styles/global";
import type { AppProps } from "next/app";

globarStyles();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
