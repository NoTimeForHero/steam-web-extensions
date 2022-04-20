import {IModule } from "../../types";
import {Component} from "./component";

export const module: IModule = {
  id: 'compare_achievements',
  name: 'Compare Achievements',
  description: 'Compare achievements between friend',
  isEnabled: () => !!document.location.pathname.match('^/id/[^/]+/friendsthatplay/(\\d+)'),
  modifyDOM: (domId, onShow) => {
    const elem = document.createElement('a')
    elem.id = domId;
    elem.className = 'btnv6_blue_hoverfade btn_medium';
    elem.href = 'javascript:void(0)';
    elem.innerHTML = `<span>Compare achievements</span>`;
    elem.addEventListener('click', onShow);
    document.querySelector('#memberList')?.prepend(elem);
  },
  component: Component,
}

export default module;