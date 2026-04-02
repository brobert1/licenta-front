import xss from 'xss';

const options = {
  whiteList: {
    // wrapper
    div: [],

    // text
    p: [],
    span: [],
    h1: [],
    h2: [],
    h3: [],

    // bold, italic, underscore
    strong: [],
    em: [],
    u: [],

    // link
    a: ['href'],

    // new line
    br: [],

    // list
    ul: [],
    ol: [],
    li: [],
  },
  onTagAttr: (tag, name, value) => {
    if (tag === 'a' && name === 'href') {
      const trimmed = value.trim().toLowerCase();
      if (
        trimmed.startsWith('javascript:') ||
        trimmed.startsWith('vbscript:') ||
        trimmed.startsWith('data:')
      ) {
        return 'href="#"';
      }
    }
  },
};

const sanitizeHtml = (html) => {
  return xss(html, options);
};

export default sanitizeHtml;
