import { RuLocalization } from "./russian";
import {DefaultLocalization, ILocalization, MessagesType} from "./default";
import {createContext, useContext, useState} from "preact/compat";
import {FunctionalComponent} from "preact";
import {ISetter} from "../types";

// TIP: If you're creating a new localization, don't forget to add it here!
const locales : ILocalization[] = [
  RuLocalization,
  DefaultLocalization
];

const messagesByLocale = locales.reduce((acc, locale) => {
  for (let name of locale.names) acc[name.toLowerCase()] = locale.messages;
  return acc;
}, {} as Record<string, MessagesType>)

const LocalizationContext = createContext<ISetter<MessagesType>>([undefined, () => {}]);

const getBrowserLocale = () : string => navigator.languages
  .map((name) => name.toLowerCase())
  .find((name) => name in messagesByLocale) ?? DefaultLocalization.names[0];

export const LocalizationProvider : FunctionalComponent = (props) => {
  const [messages, setMessages] = useState<MessagesType>(DefaultLocalization.messages);
  (window as any).debugSetLocale = (name: string) => setMessages(messagesByLocale[name] ?? DefaultLocalization.messages);
  console.warn('current localization', messages);
  return <LocalizationContext.Provider value={[messages, setMessages]}>{props.children}</LocalizationContext.Provider>;
}

export const unsafeGetLocalization = () => messagesByLocale[getBrowserLocale()];

export const useLocalization = (): MessagesType => useContext(LocalizationContext)[0] ?? DefaultLocalization.messages;