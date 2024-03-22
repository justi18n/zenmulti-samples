import "server-only";

export const locales = ["en", "zh"];

const dictionaries: any = {};

locales.forEach((locale) => {
  dictionaries[locale] = () => import(`./locales/${locale}.json`).then((module) => module.default);
});

export const getDictionary = async (lang: string) => {
  const index = lang.indexOf("-");
  let l = lang;
  if (index > 0) {
    l = lang.substring(0, index);
  }
  //@ts-ignore
  return dictionaries[l]();
};
