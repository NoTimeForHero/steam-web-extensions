import {IModule } from "../../types";
import {Component} from "./component";
import icons from '../../resources';
import {getLogger} from "../../logging";

enum InjectCase {
  Unknown = 'Unknown',
  FriendsThatPlay = 'FriendsThatPlay',
  TotalAchievements = 'TotalAchievements',
}

const logger = getLogger('CompareAchievements');

const makeButton = (domId: string, onShow: () => void, caption: string) => {
  const elem = document.createElement('div')
  elem.id = domId;
  elem.innerHTML = `
      <a href="javascript:void(0)" class="btnv6_blue_hoverfade btn_medium">
        <div style="display: flex; align-items: center; padding: 8px 15px;">
          <div style="width: 32px; height: 32px; color: rgba(128, 255, 0, 0.7); margin-right: 5px">
            ${icons.plugin}
          </div>
          <span>${caption}</span>
        </div>
      </a>
    `;
  elem.style.marginTop = '8px';
  elem.style.marginBottom = '15px';
  elem.addEventListener('click', onShow);
  return elem;
}

class CompareAchievements implements IModule {
  // IModule
  id = 'compare_achievements';
  name = 'Compare Achievements';
  description = 'Compare achievements between friend';
  gameId : string|undefined;
  injectCase = InjectCase.Unknown;
  // Current

  __onLocationMatch(caseName: InjectCase, regex: string|RegExp, gameIdGroup: number = 1) {
    const match = document.location.pathname.match(regex);
    if (!match || !match[gameIdGroup]) return;
    this.injectCase = caseName;
    this.gameId = match[gameIdGroup];
  }

  constructor() {
    this.__onLocationMatch(InjectCase.FriendsThatPlay, /^\/id\/[^/]+\/friendsthatplay\/(\d+)\/?$/);
    this.__onLocationMatch(InjectCase.TotalAchievements, /^\/stats\/(\d+)\/achievements\/?$/);
    this.__onLocationMatch(InjectCase.TotalAchievements, /^\/(?:id|profiles)\/[^\/]+\/stats\/(\d+)\/achievements\/?$/);
  }

  isEnabled() { return !!this.gameId }

  modifyDOM(domId: string, onShow: () => void): void {
    logger.trace('DOM modification in progress...');
    logger.trace('Inject CASE:', this.injectCase);
    logger.trace('Game ID:', this.gameId);

    switch (this.injectCase) {
      case InjectCase.TotalAchievements: {
        const button = makeButton(domId, onShow, 'Compare achievements');
        const root = document.querySelector('#mainContents')!;
        const header = document.querySelector<HTMLElement>('#subtabs')!;
        header.style.height = 'auto'; // Remove large padding
        root.insertBefore(button, header.nextSibling);
        break;
      }
      case InjectCase.FriendsThatPlay:
        const button = makeButton(domId, onShow, 'Compare achievements');
        document.querySelector('#memberList')?.prepend(button);
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