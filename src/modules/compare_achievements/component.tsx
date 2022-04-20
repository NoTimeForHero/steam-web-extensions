import {FunctionalComponent} from "preact";
import {useContext, useEffect, useState} from "preact/compat";
import {AppContext, wrapLoading} from "../../components/app";
import {IAchievement, getGameInfo, getFriendsThatPlay, IWhoPlayed} from "./tools";
import styles from './component.module.scss';
import {relativeURL} from "../../utils";

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
  const [players, setPlayers] = useState<IWhoPlayed[]>([]);

  const onInit = async() => {

    const gameId : string|undefined = [...(document.location.pathname.match('^/id/[^/]+/friendsthatplay/(\\d+)')??[])][1];
    if (!gameId) throw new Error('Missing gameId!');

    const gameInfo = await wrapLoading(appCtx, getGameInfo(gameId), 'Get game achievements...');
    if (!gameInfo) return;

    const players = await wrapLoading(appCtx,
      getFriendsThatPlay(relativeURL(gameInfo.player.url), gameId),
      'Getting friends that play this game...');
    if (!players) throw new Error('Impossible to find friends that play this game!');

    console.warn(players);

    setPlayers(players);
    setAchievements(gameInfo.achievements);
  }

  useEffect(() => { onInit().catch(appCtx.setError) }, []);

  return (
    <div>
      <h4 style="margin-bottom: 10px">Player with achievements:</h4>
      {players.map((player, index) => (
        <a href={player.link} key={index} style="margin-right: 5px">
          <img src={player.avatar} alt="" title={player.name} />
        </a>
      ))}
      <h4 style="margin-bottom: 10px">Achievements: </h4>
      {achievements.map((ach,index) => <Entry ach={ach} key={index} />)}
    </div>
  )
}