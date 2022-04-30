import styles from '../index.module.scss';
import {createContext, useEffect, useMemo, useState} from "preact/compat";
import {FunctionalComponent} from "preact";
import {AppState, IModule, PROJECT_ID} from "../types";
import Loading from "./Loading";
import Error from "./Error";
import {getLogger} from "../utils/logging";
import {getLocalization} from "../localization";

interface AppProps {
  modules: IModule[],
}

export const AppContext = createContext<AppState>({
  error: [undefined, () => {}],
  loading: [undefined, () => {}],
});

export const wrapLoading = <T,>(state: AppState, someJob: Promise<T>, loading: string|undefined = undefined) => {
  state.error[1](undefined);
  state.loading[1](loading ?? 'Get some data...');
  return someJob
    .catch(state.error[1])
    .finally(() => state.loading[1](undefined));
}

const logger = getLogger('App');
const locale = getLocalization();

export const App : FunctionalComponent<AppProps> = (props) => {

  const [module, setModule] = useState<IModule|undefined>(undefined);
  const [loading, setLoading] = useState<string|undefined>(undefined);
  const [error, setError] = useState<any>(undefined);
  const appState : AppState = {
    loading: [ loading, setLoading ],
    error: [ error, setError ],
  };
  const ModuleComponent = useMemo(() => module?.getComponent(), [module]);

  useEffect(() => {
    props.modules.forEach((module) => {
      if (!module.isEnabled()) return;
      logger.info('Enabled module: ', module.name);
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
                  <span>X&nbsp;{locale.generic.closeModal}</span>
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