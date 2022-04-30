import {IModule} from "../../types";
import {Component} from "./component";
import {getLogger} from "../../utils/logging";
import {addDropdownLink, DropdownTarget, makeButton} from "../tools";
import {unsafeGetLocalization} from "../../localization";

enum InjectCase {
  Unknown = 'Unknown',
  FriendsThatPlay = 'FriendsThatPlay',
  TotalAchievements = 'TotalAchievements',
  AllGames = 'AllGames',
}

const logger = getLogger('CompareAchievements');
// TODO: Modify injector using React to fix scenario?
const locale = unsafeGetLocalization();

class CompareAchievements implements IModule {
  // IModule
  id = 'compare_achievements';
  name = locale.modules.CompareAchievements.title;
  description = 'Compare achievements between friend';
  gameId : string|undefined;
  injectCase = InjectCase.Unknown;
  // Current

  __onLocationMatch(caseName: InjectCase, regex: string|RegExp, gameIdGroup: number|undefined = 1) {
    const match = document.location.pathname.match(regex);
    if (!match) return;
    if (typeof gameIdGroup === 'number' && !match[gameIdGroup]) return;
    this.injectCase = caseName;
    this.gameId = match[gameIdGroup];
  }

  constructor() {
    this.__onLocationMatch(InjectCase.FriendsThatPlay, /^\/id\/[^/]+\/friendsthatplay\/(\d+)\/?$/);
    this.__onLocationMatch(InjectCase.TotalAchievements, /^\/stats\/(\d+)\/achievements\/?$/);
    this.__onLocationMatch(InjectCase.TotalAchievements, /^\/(?:id|profiles)\/[^\/]+\/stats\/(\d+)(?:\/achievements)?\/?$/);
    this.__onLocationMatch(InjectCase.AllGames, /^\/(?:id|profiles)\/[^\/]+\/(games)\//, undefined);
  }

  isEnabled() { return !!this.gameId }

  modifyDOM(domId: string, onShow: () => void): void {
    logger.trace('DOM modification in progress...');
    logger.trace('Inject CASE:', this.injectCase);
    logger.trace('Game ID:', this.gameId);

    switch (this.injectCase) {
      case InjectCase.TotalAchievements: {
        const button = makeButton(domId, onShow, locale.modules.CompareAchievements.title);
        const root = document.querySelector('#mainContents')!;
        const header = document.querySelector<HTMLElement>('#subtabs')!;
        header.style.height = 'auto'; // Remove large padding
        root.insertBefore(button, header.nextSibling);
        break;
      }
      case InjectCase.FriendsThatPlay:
        const button = makeButton(domId, onShow, locale.modules.CompareAchievements.title);
        document.querySelector('#memberList')?.prepend(button);
        break;
      case InjectCase.AllGames:
        addDropdownLink(DropdownTarget.Statistics, domId, (gameId) => {
          logger.trace('Open gameID', gameId);
          this.gameId = gameId;
          onShow();
        }, 'SWE: ' + locale.modules.CompareAchievements.title);
        break;
      default:
        throw new Error(`Unknown inject case: ${this.injectCase}`)
    }
  }

  getComponent() {
    if (!this.isEnabled()) return <></>;
    return <Component gameId={this.gameId!} />;
  }
}

export default CompareAchievements;