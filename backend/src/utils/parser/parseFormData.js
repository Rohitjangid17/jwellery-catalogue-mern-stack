/**
 * Converts flat object keys with dot/bracket notation into nested objects/arrays.
 * Example:
 *  {
 *    "dimensions.widthMm": "10",
 *    "gemstones[0].name": "Diamond"
 *  }
 * becomes:
 *  {
 *    dimensions: { widthMm: "10" },
 *    gemstones: [{ name: "Diamond" }]
 *  }
 */
export const parseFormData = (body) => {
    const result = {};

    for (const key in body) {
        const value = body[key];
        const parts = key.split(/[\.\[\]]/).filter(Boolean);

        let current = result;
        parts.forEach((part, index) => {
            const isLast = index === parts.length - 1;
            const nextPart = parts[index + 1];

            if (!isLast) {
                if (!current[part]) {
                    current[part] = /^\d+$/.test(nextPart) ? [] : {};
                }
                current = current[part];
            } else {
                if (Array.isArray(current)) {
                    current[parseInt(part, 10)] = value;
                } else {
                    current[part] = value;
                }
            }
        });
    }

    return result;
};
