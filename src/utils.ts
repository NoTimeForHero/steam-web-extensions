export const getDocument = (url: string) => {
  const parser = new DOMParser();
  return fetch(url).then(x => x.text()).then(x => parser.parseFromString(x, "text/html"));
}

export const wait = (time: number) => new Promise((resolve) => setTimeout(resolve, time));