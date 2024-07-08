import fs from 'node:fs';

export function toPort(value: string | undefined, defaultValue: number): number;
export function toPort(
    value: string | undefined,
    defaultValue: number | null = null
): number | null {
    if (!value) {
        return defaultValue;
    }

    const parsedValue = parseInt(value, 10);

    if (!parsedValue || parsedValue < 0 || parsedValue > 65535) {
        throw new Error('Invalid port value');
    }

    return parsedValue;
}

export function toPath(value: string | undefined, defaultValue: string): string;
export function toPath(
    value: string | undefined,
    defaultValue: string | null = null
): string | null {
    if (!value) {
        return defaultValue;
    }

    if (!fs.existsSync(value)) {
        throw new Error('Invalid path provided');
    }

    return value;
}

export function toBoolean(
    value: string | undefined,
    defaultValue: boolean = false
): boolean {
    if (!value) {
        return defaultValue;
    }
    return ['yes', '1', 'true', 'on'].includes(value.toLowerCase());
}
