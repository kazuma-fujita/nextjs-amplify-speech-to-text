import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";
import awsconfig from "../src/aws-exports";

Amplify.configure(awsconfig);

try {
  Amplify.addPluggable(new AmazonAIPredictionsProvider());
} catch (error) {}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
