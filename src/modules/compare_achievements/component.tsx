import {FunctionalComponent} from "preact";
import {useContext, useEffect, useState} from "preact/compat";
import {AppContext, wrapLoading} from "../../components/app";
import {IAchievement, getAchievements} from "./tools";
import styles from './component.module.scss';

const Entry : FunctionalComponent<{ach: IAchievement}> = (props) => {
  const ach = props.ach;
  return <div className={styles.achievement}>
    <img src={ach.image} className={styles.image} alt="2" />
    <div className={styles.blockText}>
      <div className={styles.title}>{ach.title}</div>
      <div className={styles.description}>{ach.description}</div>
    </div>
  </div>
}

export const Component : FunctionalComponent = () => {

  const appCtx = useContext(AppContext);
  const [achievements, setAchievements] = useState<IAchievement[]>([]);

  const onInit = async() => {
    const gameId : string|undefined = [...(document.location.pathname.match('^/id/[^/]+/friendsthatplay/(\\d+)')??[])][1];
    if (!gameId) throw new Error('Missing gameId!');

    const promise = getAchievements(gameId);
    const achievements = await wrapLoading(appCtx, promise, 'Get game achievements...');
    setAchievements(achievements);
    console.warn(achievements);
  }

  useEffect(() => { onInit().catch(appCtx.setError) }, []);

  return (
    <div>
      {achievements.map((ach,index) => <Entry ach={ach} key={index} />)}
    </div>
  )
}