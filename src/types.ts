import {FunctionalComponent} from "preact";

export const IS_DEBUG = true; // TODO: брать из node.env?
export const PROJECT_ID = 'notimeforhero_steam_web_extensions';

export interface IModule {
  id: string,
  name: string
  description: string,
  isEnabled: () => boolean,
  modifyDOM: (domId: string, onShow: () => void) => void,
  component: FunctionalComponent,
}

export interface AppState {
  loading: string|undefined,
  setLoading: (value: string|undefined) => void,
  error: unknown,
  setError: (value: unknown) => void,
}