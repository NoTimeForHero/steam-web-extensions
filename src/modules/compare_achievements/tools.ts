import {getDocument, wait} from "../../utils";
import {IS_DEBUG} from "../../types";

export interface IAchievement {
  title: string,
  description?: string,
  image?: string,
  unlocked: boolean
}

export const getAchievements = async(gameId: string) : Promise<IAchievement[]> => {
  if (IS_DEBUG) {
    await wait(2000);
    return await fetch('/debug/achievements/user.json').then(x => x.json());
  }
  const ajaxDocument = await getDocument(`https://steamcommunity.com/stats/${gameId}/achievements/`);
  return [...ajaxDocument.querySelectorAll('.achieveRow')].map((ach) => ({
    title: ach.querySelector<HTMLElement>('.achieveTxt h3')?.innerText ?? '',
    unlocked: ach.classList.contains('unlocked'),
    description: ach.querySelector<HTMLElement>('.achieveTxt h5')?.innerText,
    image: ach.querySelector<HTMLImageElement>('.achieveImgHolder img')?.src,
  }));
}