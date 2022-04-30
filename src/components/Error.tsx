import {useContext} from "preact/compat";
import {AppContext} from "./App";
import styles from '../index.module.scss';

const ErrorComponent = () => {
  const ctx = useContext(AppContext);
  const [error, setError] = ctx.error;

  let body : JSX.Element|string|undefined;
  console.warn('Error occured!', error);
  if (ctx.error != null && error instanceof Error) body = error.toString();
  else if (typeof error === 'string') body = error;
  else body = JSON.stringify(ctx.error);

  return <div className={styles.error}>
    <span className={styles.closeBtn} onClick={() => setError(undefined)} />
    <div className={styles.body}>{body}</div>
  </div>
}

export default ErrorComponent;