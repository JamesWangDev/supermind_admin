import React from 'react';

const TextLimit = ({ value, maxLength }) => {
    if (!value) {
        return '';
    }

    let summarizedValue = value.substring(0, maxLength);

    if (value.length > maxLength) {
        summarizedValue += '...';
    }

    if (containsHtmlTags(value)) {
        const sanitizedValue = sanitizeAndTrustHtml(summarizedValue);
        return <div dangerouslySetInnerHTML={sanitizedValue} />;
    } else {
        return <div>{summarizedValue}</div>;
    }
};

const containsHtmlTags = (value) => {
    const htmlRegex = /<[a-z][\s\S]*>/i;
    return htmlRegex.test(value);
};

const sanitizeAndTrustHtml = (htmlString) => {
    return { __html: htmlString };
};

export default TextLimit;


