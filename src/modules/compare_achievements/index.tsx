import {IModule } from "../../types";
import {Component} from "./component";
import icons from '../../resources';

enum InjectCase {
  Unknown,
  FriendsThatPlay,
  TotalAchievements
}

console.warn('icons', icons);

class CompareAchievements implements IModule {
  // IModule
  id = 'compare_achievements';
  name = 'Compare Achievements';
  description = 'Compare achievements between friend';
  gameId : string|undefined;
  injectCase = InjectCase.Unknown;
  // Current

  __onLocationMatch(caseName: InjectCase, regex: string, gameIdGroup: number = 1) {
    const match = document.location.pathname.match(regex);
    if (!match || !match[gameIdGroup]) return;
    this.injectCase = caseName;
    this.gameId = match[gameIdGroup];
    console.warn(regex, gameIdGroup, this.gameId, [...(match??[])]);
  }

  constructor() {
    this.__onLocationMatch(InjectCase.FriendsThatPlay, '^/id/[^/]+/friendsthatplay/(\\d+)/?$');
    this.__onLocationMatch(InjectCase.TotalAchievements, '^/stats/(\\d+)/achievements/?$');
  }

  isEnabled() { return !!this.gameId }

  modifyDOM(domId: string, onShow: () => void): void {
    const elem = document.createElement('a')
    elem.id = domId;
    elem.className = 'btnv6_blue_hoverfade btn_medium';
    elem.href = 'javascript:void(0)';
    elem.innerHTML = `
      <div style="display: flex; align-items: center; padding: 8px 15px;">
        <div style="width: 32px; height: 32px; color: rgba(128, 255, 0, 0.7); margin-right: 5px">${icons.plugin}</div>
        <span>Compare achievements</span>
      </div>
    `;
    elem.style.marginTop = '15px';
    elem.style.marginBottom = '15px';
    elem.addEventListener('click', onShow);
    switch (this.injectCase) {
      case InjectCase.TotalAchievements: {
        const root = document.querySelector('#mainContents')!;
        const header = document.querySelector('#subtabs')!;
        root.insertBefore(elem, header.nextSibling);
        break;
      }
      case InjectCase.FriendsThatPlay:
        document.querySelector('#memberList')?.prepend(elem);
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