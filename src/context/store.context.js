import { createContext, useContext, useMemo } from "react";
import { DedupeStore } from "../stores/dedupe.store";

const StoreContext = createContext(undefined);
const dedupeStore = new DedupeStore()

const StoreContextProvider = ({
    children,
}) => {
    const stores = useMemo(
        () => ({
            dedupeStore
        }),
        [],
    );

    const value = useMemo(
        () => ({
            ...stores
        }),
        [stores],
    );

    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
};

const useStoreContext = () => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error("StoreContextProvider must be used in the component tree");
    }

    return context;
};

export { StoreContextProvider, useStoreContext };