import {FunctionalComponent} from "preact";
import { useContext, useEffect, useRef, useState } from "preact/compat";
import {AppContext, wrapLoading} from "../../components/App";
import {getGameInfo, getFriendsThatPlay, IWhoPlayed, getFriendAchievements} from "./tools";
import styles from './component.module.scss';
import {relativeURL} from "../../utils";
import {getLogger} from "../../utils/logging";
import {getLocalization} from "../../localization";

const Entry : FunctionalComponent<{ach: IDisplayAchievement}> = (props) => {
  const ach = props.ach;
  return <div className={styles.achievement}>
    <img src={ach.image} className={styles.image} alt="2" />
    <div className={styles.blockText}>
      <div className={styles.title}>{ach.title}</div>
      <div className={styles.description}>{ach.description}</div>
    </div>
    <div className={styles.friends}>
      {ach.friends.map((friend,index) => (
        <a key={index} href={friend.url} title={friend.name}>
          <img src={friend.avatar} alt="" className={styles.friend} />
        </a>
      ))}
    </div>
  </div>
}

interface IDisplayAchievement {
  title: string,
  description?: string,
  image?: string,
  friends: IWhoPlayed[],
}
export type AchievementList = Record<string, IDisplayAchievement>;

const logger = getLogger('CompareAchievements');
const locale = getLocalization().modules.CompareAchievements;

export const Component : FunctionalComponent<{gameId: string}> = (props) => {

  const appCtx = useContext(AppContext);
  const [achievements, setAchievements] = useState<AchievementList>({});
  const [players, setPlayers] = useState<IWhoPlayed[]>([]);
  const mountedRef = useRef(true);

  const onInit = async() => {

    const gameId = props.gameId;
    if (!gameId) throw new Error('Missing gameId!');
    if (!mountedRef.current) return;

    const gameInfo = await wrapLoading(appCtx, getGameInfo(gameId), locale.getAchievements);
    if (!gameInfo) return;
    if (!mountedRef.current) return;
    logger.debug('Player:', gameInfo.player.name?.trim());
    logger.debug('Total achievements:', Object.keys(gameInfo.achievements).length);

    const friends = await wrapLoading(appCtx,
      getFriendsThatPlay(relativeURL(gameInfo.player.url), gameId), locale.getFriendsThatPlay);
    if (!friends) throw new Error('Impossible to find friends that play this game!');
    if (!mountedRef.current) return;
    logger.debug('Friends with this game:', friends.length);

    const transformedAchs = gameInfo.achievements.reduce((acc, el) => {
      acc[el.title] = { ...el, friends: [] };
      return acc;
    }, {} as AchievementList);
    gameInfo.achievements.filter((ach) => ach.unlocked).forEach((ach) => transformedAchs[ach.title]?.friends.push(gameInfo.player));

    for (let i = 0; i < friends.length; i += 1) {
      const friend = friends[i];
      const status = `[${i+1}/${friends.length}] ${locale.loadingPlayer}: ${friend.name}`;
      logger.trace('Loading friend:', friend.name);
      const achievements = await wrapLoading(appCtx, getFriendAchievements(friend), status);
      if (!mountedRef.current) return;
      if (achievements) achievements.forEach((name) => transformedAchs[name]?.friends.push(friend));
    }

    setPlayers(friends);
    setAchievements(transformedAchs);
  }

  useEffect(() => {
    onInit().catch(appCtx.error[1]);
    return () => mountedRef.current = false;
  }, []);

  return (
    <div>
      <h4 style="margin-bottom: 10px">{locale.friendsAchievements}:</h4>
      {players.map((player, index) => (
        <a href={player.url} key={index} style="margin-right: 5px">
          <img src={player.avatar} alt="" title={player.name} />
        </a>
      ))}
      <h4 style="margin-bottom: 10px">{locale.achievements}: </h4>
      {Object.values(achievements).map((ach,index) => <Entry ach={ach} key={index} />)}
    </div>
  )
}