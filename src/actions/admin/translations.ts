// app/actions/saveMessages.ts
'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function saveMessages(formData: FormData) {
    const locale = formData.get('locale') as string;

    if (!locale) throw new Error('Missing locale');

    const messages: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
        if (key !== 'locale') {
            messages[key] = value.toString();
        }
    }

    // Unflatten
    const unflattened = unflattenMessages(messages);

    // Save to JSON file
    const filePath = join(process.cwd(), 'messages', `${locale}.json`);
    await writeFile(filePath, JSON.stringify(unflattened, null, 2), 'utf8');
}

// Helper: unflatten messages
function unflattenMessages(flatObj: Record<string, string>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(flatObj)) {
        const keys = key.split('.');
        let current: Record<string, unknown> = result;

        keys.forEach((k, index) => {
            if (index === keys.length - 1) {
                current[k] = value;
            } else {
                if (typeof current[k] !== 'object' || current[k] === null) {
                    current[k] = {};
                }
                current = current[k] as Record<string, unknown>;
            }
        });
    }

    return result;
}

