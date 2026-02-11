import { useSelector } from "react-redux";

interface AppState {
  app: {
    isAuthenticated: boolean;
  };
}

export const useVerifyIsLogin = (): boolean => {
  const { isAuthenticated } = useSelector((state: AppState) => state.app) || {};
  return isAuthenticated;
};
