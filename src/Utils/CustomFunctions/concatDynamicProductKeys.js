export const concatDynamicProductKeys = (obj) => {
    const result = [];
    function traverse(obj) {
        for (const key in obj) {
            if (key === 'product_ids' && Array.isArray(obj[key])) {
                result.push(...obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                traverse(obj[key]);
            } else {
                key === 'product_ids' && result.push(obj.product_ids)
            }
        }
    }
    traverse(obj);
    return result;
}