import {getDocument, notEmpty} from "../../utils";
import {ExtendedWindow} from "../../types";
declare let window: ExtendedWindow;

export interface IGameInfo {
  player: IWhoPlayed,
  achievements: IAchievement[],
}

export interface IAchievement {
  title: string,
  description?: string,
  image?: string,
  unlocked: boolean
}

export interface IWhoPlayed {
  url: string,
  name?: string,
  avatar?: string,
}

export const getGameInfo = async(gameId: string) : Promise<IGameInfo> => {
  const ajaxDocument = await getDocument(`https://steamcommunity.com/stats/${gameId}/achievements`, '/debug/achievements/game.html');
  const achievements = [...ajaxDocument.querySelectorAll('.achieveRow')].map((ach) => ({
    title: ach.querySelector<HTMLElement>('.achieveTxt h3')?.innerText ?? '',
    unlocked: ach.classList.contains('unlocked'),
    description: ach.querySelector<HTMLElement>('.achieveTxt h5')?.innerText,
    image: ach.querySelector<HTMLImageElement>('.achieveImgHolder img')?.src,
  }));
  const playerURL = ajaxDocument.querySelector('#global_actions')?.querySelector<HTMLAnchorElement>('a.user_avatar')?.href;
  if (!playerURL) throw new Error('User profile link not found in #global_actions in /achievements!');
  const player = {
    url: playerURL,
    // TODO: Tkae _medium.png avatar instead default 32х32
    avatar: ajaxDocument.querySelector('#global_actions')?.querySelector<HTMLImageElement>('.user_avatar img')?.src,
    name: ajaxDocument.querySelector<HTMLElement>('#account_pulldown')?.innerText,
  }
  return {
    player,
    achievements
  }
}

export const getFriendsThatPlay = async(userPrefix: string, gameId: string) : Promise<IWhoPlayed[]> => {
  const ajaxDocument = await getDocument(`https://steamcommunity.com/${userPrefix}/friendsthatplay/${gameId}`, '/debug/achievements/who_play.html');
  const root = ajaxDocument.querySelector('#memberList');
  if (!root) throw new Error('Missing #memberList in /friendsthatplay/!');
  return [...root.querySelectorAll('.friendBlock')]
    .filter((el, index) => index > 0)
    .map((entry) => ({
      name: entry.querySelector('.friendBlockContent')?.firstChild?.textContent?.trim(),
      avatar: entry.querySelector<HTMLImageElement>('.playerAvatar img')?.src,
      url: entry.querySelector<HTMLAnchorElement>('.friendBlockInnerLink')?.href!
    }))
    .filter((obj) => obj.url?.match('/stats/\\d+/compare$'))
}

export const getFriendAchievements = async(friend: IWhoPlayed) : Promise<Set<string>> => {
  const filename = window.sha1?.call(null, friend.name ?? friend.url) + '.html';
  const ajaxDocument = await getDocument(friend.url, `/debug/achievements/users/${filename}`);
  const titles = [...ajaxDocument.querySelectorAll('.achieveRow')]
    .filter((row) => row.querySelector('.achieveUnlockTime')?.firstChild?.textContent?.trim()?.length ?? 0 > 0)
    .map((row) => row.querySelector<HTMLElement>('.achieveTxt .ellipsis')?.innerText)
    .filter(notEmpty)
  return new Set(titles);
}