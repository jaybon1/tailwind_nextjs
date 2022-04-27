import {createContext, ReactNode, useContext} from "react";
import AuthStore from "@/store/sign/AuthStore";
import TempStore from "@/store/temp/TempStore";

export interface RootStore {
  tempStore: TempStore;
  authStore: AuthStore;
}

const StoreContext = createContext({} as RootStore);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider
      value={{
        tempStore: new TempStore(useContext(StoreContext)),
        authStore: new AuthStore(),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useTempStore = () => useContext(StoreContext).tempStore;
export const useAuthStore = () => useContext(StoreContext).authStore;
