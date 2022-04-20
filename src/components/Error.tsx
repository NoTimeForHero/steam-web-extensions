import {useContext} from "preact/compat";
import {AppContext} from "./App";
import styles from '../index.module.scss';

const ErrorComponent = () => {
  const ctx = useContext(AppContext);

  let body : JSX.Element|string|undefined;
  console.warn(ctx.error, ctx.error instanceof Error);
  if (ctx.error != null && ctx.error instanceof Error) body = ctx.error.toString();
  else if (typeof ctx.error === 'string') body = ctx.error;
  else body = JSON.stringify(ctx.error);

  return <div className={styles.error}>
    <span className={styles.closeBtn} onClick={() => ctx.setError(undefined)} />
    <div className={styles.body}>{body}</div>
  </div>
}

export default ErrorComponent;