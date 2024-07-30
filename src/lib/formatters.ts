const getLang = () => navigator.language || navigator.browserLanguage || ( navigator.languages || [ "en" ] ) [ 0 ]
const lang = getLang();

export const numberFormatter = (number) => new Number(number).toLocaleString(lang);
export const dateFormatter = (date) => Intl.DateTimeFormat(lang).format(new Date(date));

export const academicYearFormatter = (x: number) => {
    const s = new Date(x);
    const e = new Date(x);
    e.setFullYear(s.getFullYear() + 1);
    return s.toLocaleDateString(undefined, { year: "numeric" }) + '-' + e.toLocaleDateString(undefined, { year: "2-digit" });
}
