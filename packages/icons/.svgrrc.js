// .svgrrc.js
module.exports = {
  icon: true,
  typescript: true,
  memo: true,
  ref: true,
  replaceAttrValues: {
    '#1E1E32': '{props.color || "#1E1E32"}',
  },
  svgProps: {
    focusable: false,
  },
};
