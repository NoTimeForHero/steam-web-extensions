import {IS_DEBUG} from "./types";

export const getDocument = async(url: string, debugUrl: string) => {
  const parser = new DOMParser();
  const targetUrl = IS_DEBUG ? debugUrl : url;
  if (IS_DEBUG) await wait(700);
  return fetch(targetUrl).then(x => x.text()).then(x => parser.parseFromString(x, "text/html"));
}

export const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const relativeURL = (url: string) => new URL(url).pathname

export const notEmpty= <TValue>(value: TValue | null | undefined): value is TValue => { return value !== null && value !== undefined;}