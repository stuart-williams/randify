import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import ReactGA from "react-ga";
import { useEffectOnce } from "react-use";

const Analytics: FunctionComponent = () => {
  const router = useRouter();

  useEffectOnce(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(String(process.env.GA_TRACKING_ID));
      ReactGA.pageview(router.pathname);
    }
  });

  return null;
};

export default Analytics;
