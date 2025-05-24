'use client';

import React from 'react';
import { useRouter, usePathname} from '@/i18n/navigation';
import { useLocale, useMessages, useTranslations } from 'next-intl';

import { Languages } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/generic/DropdownMenu';
import { Button } from '@/components/generic/Button';

const LanguageSelector: React.FC = () => {
    const locale = useLocale();
    const t = useTranslations('language');
    const messages = useMessages();
    const router = useRouter();
    // Dynamically get available language keys from messages
    const languageKeys = Object.keys(messages.language ?? {});
    const pathName  =usePathname()
    const handleLanguageChange = (newLocale: string) => {
        router.push(pathName, {locale: newLocale})
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Languages size={16} />
                    <span className="hidden md:inline">{t(locale)}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languageKeys.map((lang) => (
                    <DropdownMenuItem
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={locale === lang ? 'font-bold' : ''}
                    >
                        {t(lang)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
