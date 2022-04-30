import {StateUpdater} from "preact/compat";

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

export interface AppState {
  loading: INSetter<string|undefined>,
  error: INSetter<unknown>,
}

export interface ExtendedWindow extends Window {
  sha1?: (input: string) => string,
}

export type INSetter<T> = [
  value: T|undefined,
  setValue: StateUpdater<T>
]