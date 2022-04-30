export const IS_DEBUG = import.meta.env.MODE === 'development';
export const PROJECT_ID = 'notimeforhero_steam_web_extensions';

export interface IModule {
  id: string,
  name: string
  description: string,
  isEnabled: () => boolean,
  modifyDOM: (domId: string, onShow: () => void) => void,
  getComponent: () => JSX.Element,
}

// TODO: Rewrite with ISetter<T>?
export interface AppState {
  loading: string|undefined,
  setLoading: (value: string|undefined) => void,
  error: unknown,
  setError: (value: unknown) => void,
}

export interface ExtendedWindow extends Window {
  sha1?: (input: string) => string,
}

export type ISetter<T> = [
  value: T|undefined,
  setValue: (input: T) => void
]