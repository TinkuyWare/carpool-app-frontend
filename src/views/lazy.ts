import { lazy } from "react";

const LazySignUp = lazy(() => import("./sign-up"));
const LazySingIn = lazy(() => import("./sign-in"));
const LazyHome = lazy(() => import("./home"));
const LazyHistory = lazy(() => import("./history"));
const LazyProfile = lazy(() => import("./profile"));
const LazyHistoryDetail = lazy(() => import("./history/detail"));
const LazySelectRole = lazy(() => import("./select-role"));

export {
  LazySignUp,
  LazyHome,
  LazyHistory,
  LazyHistoryDetail,
  LazySingIn,
  LazySelectRole,
  LazyProfile
};
