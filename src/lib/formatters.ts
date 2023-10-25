const getLang = () => navigator.language || navigator.browserLanguage || ( navigator.languages || [ "en" ] ) [ 0 ]
const lang = getLang();

export const numberFormatter = (number) => new Number(number).toLocaleString(lang);
export const dateFormatter = (date) => Intl.DateTimeFormat(lang).format(new Date(date));
