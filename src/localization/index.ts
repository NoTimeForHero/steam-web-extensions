import { RuLocalization } from "./russian";
import {DefaultMessages, ILocalization, MessagesType} from "./default";

// TIP: If you're creating a new localization, don't forget to add it here!
const locales : ILocalization[] = [
  RuLocalization
];

const messagesByLocale = locales.reduce((acc, locale) => {
  for (let name of locale.names) acc[name.toLowerCase()] = locale.messages;
  return acc;
}, {} as Record<string, MessagesType>)

// TODO: Add ability to change language by user
export const getLocalization = (): MessagesType => {
  const languages = navigator.languages.map((name) => name.toLowerCase());
  const target = languages.find((name) => name in messagesByLocale);
  if (!target) {
    console.warn('Not found any languages for locales: ', languages);
    return DefaultMessages;
  }
  return messagesByLocale[target];
}