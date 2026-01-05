import xss from 'xss';

const options = {
  whiteList: {
    // wrapper
    div: [],

    // text
    p: ['style'],
    span: ['style'],
    h1: ['style'],
    h2: ['style'],
    h3: ['style'],

    // bold, italic, underscore
    strong: ['style'],
    em: ['style'],
    u: ['style'],

    // link
    a: ['href'],

    // new line
    br: [],

    // list
    ul: ['style'],
    ol: ['style'],
    li: ['style'],
  },
};

const sanitizeHtml = (html) => {
  return xss(html, options);
};

export default sanitizeHtml;
