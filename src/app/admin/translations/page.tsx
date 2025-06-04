import { routing } from "@/i18n/routing";
// import { Button } from "@/components/generic/Button";
// import { saveMessages } from "@/actions/admin/translations";
import { LocaleMessages, LocaleSelector } from "./client";
import { TranslationMessage } from "@/context/TranslationContext";
// Recursive function to flatten nested objects
const flattenMessages = (
    obj: TranslationMessage,
    prefix = "",
): Record<string, string> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object" && value !== null) {
            Object.assign(acc, flattenMessages(value, fullKey));
        } else {
            acc[fullKey] = String(value);
        }
        return acc;
    }, {} as Record<string, string>);
};

const loadMessages = async (
    locales: string[],
): Promise<({ locale: string; messages: TranslationMessage })[]> => {
    const messages: ({ locale: string; messages: TranslationMessage })[] = [];

    for (const locale of locales) {
        try {
            const _module = await import(`../../../../messages/${locale}.json`);
            const flatMessages = flattenMessages(_module.default);
            messages.push({ locale: locale, messages: flatMessages });
        } catch (error) {
            console.error(
                `Failed to load messages for locale "${locale}":`,
                error,
            );
        }
    }

    return messages;
};

const Page = async () => {
    const locales = routing.locales;
    const messages = await loadMessages(locales as never);

    return (
        <>
            <div className="flex flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Translations</h1>
                <LocaleSelector locales={locales as readonly string[]} />
            </div>
            <LocaleMessages messages={messages} />
        </>
    );
};

export default Page;
