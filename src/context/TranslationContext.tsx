"use client";

import React, {
    Context,
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from "react";

// --------------------
// Types
// --------------------
type k = string | { [key: string]: k };
export type TranslationMessage = Record<string, k>;
type TranslationState = {
    locale: {
        selected: string;
        values: readonly string[];
    };
    messages: {locale: string, messages:TranslationMessage}[];
};

type TranslationAction =
    | { type: "SET_LOCALE"; payload: string }
    | { type: "SET_MESSAGES"; payload: {locale: string, messages: TranslationMessage}[] }
    | { type: "SET_LOCALES"; payload: readonly string[] };

type TranslationContextType = {
    state: TranslationState;
    dispatch: Dispatch<TranslationAction>;
};

// --------------------
// Initial State
// --------------------

const initialTranslationState: TranslationState = {
    locale: {
        selected: "",
        values: [], // Example locales
    },
    messages: [],
};
// --------------------
// Reducer
// --------------------

const translationReducer = (
    state: TranslationState,
    action: TranslationAction,
): TranslationState => {
    switch (action.type) {
        case "SET_LOCALE":
            return {
                ...state,
                locale: {
                    selected: action.payload,
                    values: state.locale.values,
                },
            };
        case "SET_LOCALES":
            return {
                ...state,
                locale: {
                    values: action.payload,
                    selected: state.locale.selected,
                },
            };

        case "SET_MESSAGES":
            return { ...state, messages: action.payload };
        default:
            return state;
    }
};

// --------------------
// Context + Provider
// --------------------

const TranslationContext = createContext<
    TranslationContextType | undefined
>(undefined);

const TranslationProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(
        translationReducer,
        initialTranslationState,
    );

    return (
        <TranslationContext.Provider value={{ state, dispatch }}>
            {children}
        </TranslationContext.Provider>
    );
};

// --------------------
// Custom Hook
// --------------------

const useTranslation = (): TranslationContextType => {
    const context = useContext(
        TranslationContext as Context<TranslationContextType>,
    );
    if (context === undefined) {
        throw new Error(
            "useTranslation must be used within a TranslationProvider",
        );
    }
    return context;
};

export { TranslationProvider, useTranslation };
