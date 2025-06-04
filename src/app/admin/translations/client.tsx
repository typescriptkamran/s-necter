"use client";

import { Input } from "@/components/generic/Input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/generic/Table";
import {
    TranslationMessage,
    useTranslation,
} from "@/context/TranslationContext";
import { useEffect } from "react";

const LocaleSelector = ({ locales }: { locales: readonly string[] }) => {
    const { state, dispatch } = useTranslation();
    useEffect(() => {
        dispatch({ type: "SET_LOCALES", payload: locales });
        dispatch({ type: "SET_LOCALE", payload: locales[0] });
    }, [locales]);
    return (
        <span className="flex bg-white">
            {state.locale.values.map((locale) => (
                <button
                    key={locale}
                    onClick={() =>
                        dispatch({ type: "SET_LOCALE", payload: locale })}
                    className={(state.locale.selected === locale
                        ? "bg-natural-golden text-natural-cream"
                        : "") +
                        "first:border-l-1  focus:text-natural-cream focus:bg-natural-golden first:rounded-tr-none first:rounded-br-none last:border-r-1 first:rounded last:rounded last:rounded-bl-none last:rounded-tl-none border-x-0 uppercase font-bold text-natural-charcoal border-natural-charcoal border  p-1"}
                >
                    {locale}
                </button>
            ))}
        </span>
    );
};

const LocaleMessages = (
    { messages }: {
        messages: ({ locale: string; messages: TranslationMessage })[];
    },
) => {
    const { state, dispatch } = useTranslation();
    useEffect(() => {
        dispatch({ type: "SET_MESSAGES", payload: messages });
    }, [messages]);
    return (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {state.messages.map((
                        { messages: message },
                        index,
                    ) => (
                        Object.entries(message).map(([key, value]) => (
                            <TableRow key={`${index}-${key}`}>
                                <TableCell className="border-b border-gray-200 px-4 py-2">
                                    {key}
                                </TableCell>
                                <LocaleMessageKey value={String(value)} />
                            </TableRow>
                        ))
                    ))[
                        state.locale.values.findIndex((locale) =>
                            locale === state.locale.selected
                        )
                    ]}
                </TableBody>
            </Table>
        </div>
    );
};
const LocaleMessageKey = ({ value }: { value: string }) => {
    return (
        <TableCell
            className="border-b border-gray-200 px-4 py-2"
        >
            <Input
                defaultValue={value}
            />
        </TableCell>
    );
};
export { LocaleMessages, LocaleSelector };
