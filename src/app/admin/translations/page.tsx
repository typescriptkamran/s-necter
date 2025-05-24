import { routing } from '@/i18n/routing';
import {Input} from '@/components/generic/Input'
import {Button} from '@/components/generic/Button'
import {saveMessages} from "@/actions/admin/translations";
type Messages = Record<string, never>;

// Recursive function to flatten nested objects
const flattenMessages = (obj: Messages, prefix = ''): Record<string, string> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            Object.assign(acc, flattenMessages(value, fullKey));
        } else {
            acc[fullKey] = String(value);
        }
        return acc;
    }, {} as Record<string, string>);
};


const loadMessages = async (locales: string[]): Promise<Record<string, string>[]> => {
    const messages: Record<string, string>[] = [];

    for (const locale of locales) {
        try {
            const _module = await import(`../../../../messages/${locale}.json`);
            const flatMessages = flattenMessages(_module.default);
            messages.push(flatMessages);
        } catch (error) {
            console.error(`Failed to load messages for locale "${locale}":`, error);
            messages.push({});
        }
    }

    return messages;
};

const Page = async () => {
    const locales = routing.locales;
    const messages = await loadMessages(locales as never);

    return (
        <div className="flex flex-col gap-6 p-4">
            {/*<div className="flex">*/}
            {/*    {locales.map((locale) => (*/}
            {/*        <button*/}
            {/*            key={locale}*/}
            {/*            className="first:border-l-1  focus:text-natural-cream focus:bg-natural-golden first:rounded-tr-none first:rounded-br-none last:border-r-1 first:rounded last:rounded last:rounded-bl-none last:rounded-tl-none border-x-0 uppercase font-bold text-natural-charcoal border-natural-charcoal border p-1"*/}
            {/*        >*/}
            {/*            {locale}*/}
            {/*        </button>*/}
            {/*    ))}*/}
            {/*</div>*/}

            <div className="mt-6 w-full">
                {messages.map((msg, index) => (
                    <form action={saveMessages} key={locales[index]} className="border rounded-xl p-4 shadow">
                        <h2 className="text-lg font-semibold mb-2 uppercase">{locales[index]}</h2>
                        <Button className="m-2" type="submit">Save</Button>
                        <Button className="m-2" type="reset">Reset</Button>
                        <Input type="hidden" name="locale" value={locales[index]}/>
                        <ul className="space-y-1">
                            {Object.entries(msg).map(([key, value]) => (
                                <li key={key} className="flex flex-col">
                                    <span className="font-medium text-gray-700 w-1/3">{key}</span>
                                    <Input name={key} defaultValue={value} />
                                </li>
                            ))}
                        </ul>
                    </form>
                ))}
            </div>
        </div>
    );
};

export default Page;
