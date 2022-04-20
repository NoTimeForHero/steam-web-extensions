import styles from '../index.module.scss';
import {createContext, useEffect, useMemo, useState} from "preact/compat";
import {FunctionalComponent} from "preact";
import {AppState, IModule, PROJECT_ID} from "../types";
import Loading from "./Loading";
import Error from "./Error";

interface AppProps {
  modules: IModule[],
}

export const AppContext = createContext<AppState>({
  error: undefined,
  loading: undefined,
  setError: (_) => {},
  setLoading: (_) => {}
});

export const wrapLoading = <T,>(state: AppState, someJob: Promise<T>, loading: string|undefined = undefined) => {
  state.setError(undefined);
  state.setLoading(loading ?? 'Get some data...');
  return someJob
    .catch(state.setError)
    .finally(() => state.setLoading(undefined));
}

export const App : FunctionalComponent<AppProps> = (props) => {

  const [module, setModule] = useState<IModule|undefined>(undefined);
  const [loading, setLoading] = useState<string|undefined>(undefined);
  const [error, setError] = useState<any>(undefined);
  const appState : AppState = { loading, setLoading, error, setError };
  const ModuleComponent = useMemo(() => module?.getComponent(), [module]);

  useEffect(() => {
    props.modules.forEach((module) => {
      if (!module.isEnabled()) return;
      console.log('Enabled module: ', module.name);
      const domId = PROJECT_ID + '_' + module.id;
      if (document.querySelector('#' + domId)) return;
      const onShow = () => setModule(module)
      module.modifyDOM(domId, onShow);
    });
  }, []);

  return (
    <AppContext.Provider value={appState}>
      <div>
        {module && <div className={styles.overlay}>
          <div className={styles.header}>
              <div className={"btn_darkred_white_innerfade btn_medium noicon " + styles.button}
                  onClick={() => setModule(undefined)}>
                  <span>X&nbsp;Close</span>
              </div>
              <h1>{module.name}</h1>
          </div>
          {loading && <Loading message={loading} /> }
          {error && <Error />}
          {ModuleComponent}
        </div>}
      </div>
    </AppContext.Provider>
  )
}