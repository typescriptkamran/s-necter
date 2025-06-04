"use client";

import React, {
    createContext,
    useReducer,
    useContext as useReactContext,
    ReactNode,
    Dispatch,
    RefObject,
    Context,
} from "react";

// --------------------
// Types
// --------------------

type SearchState<T> = {
    searchTerm: string;
    dataSet: T[];
    ref: RefObject<HTMLInputElement> | undefined;
};

type SearchAction<T> =
    | { type: "SET_SEARCH_TERM"; payload: string }
    | { type: "SET_DATASET"; payload: T[] }
    | { type: "SET_INPUT_REF"; payload: RefObject<HTMLInputElement> };

type SearchContextType<T> = {
    state: SearchState<T>;
    dispatch: Dispatch<SearchAction<T>>;
};

// --------------------
// Initial State
// --------------------

const initialSearchState: SearchState<any> = {
    searchTerm: "",
    dataSet: [],
    ref: undefined,
};

// --------------------
// Reducer
// --------------------

const searchReducer = <T,>(state: SearchState<T>, action: SearchAction<T>): SearchState<T> => {
    switch (action.type) {
        case "SET_SEARCH_TERM":
            return { ...state, searchTerm: action.payload };
        case "SET_DATASET":
            return { ...state, dataSet: action.payload };
        case "SET_INPUT_REF":
            return { ...state, ref: action.payload };
        default:
            return state;
    }
};

// --------------------
// Context + Provider
// --------------------

const SearchContext = createContext<SearchContextType<any> | undefined>(undefined);

const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(searchReducer, initialSearchState);

    return (
        <SearchContext.Provider value={{ state, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
};

// --------------------
// Custom Hook
// --------------------

const useSearch = <T,>(): SearchContextType<T> => {
    const context = useReactContext(SearchContext as Context<SearchContextType<T>>);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};

export { SearchProvider, useSearch };
