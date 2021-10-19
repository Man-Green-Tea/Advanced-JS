const str = "According to Thomas Edison's, 'Genius is one per cent inspiration and ninety-nine per cent perspiration.'";
const regexp = /(?!s'|[a-z]'[a-z])([\s\S])'|^'/igu;

const res = str.replace(regexp, '"');
console.log(res);