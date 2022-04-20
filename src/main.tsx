import { render } from 'preact'
import { App } from './components/App'
import './index.module.scss'
import {IModule, PROJECT_ID} from './types'

import CompareAchievements from "./modules/compare_achievements";

let target = document.querySelector(`#${PROJECT_ID}`);
if (!target) {
    target = document.createElement('div');
    target.id = PROJECT_ID;
    document.body.appendChild(target);
}

const modules : IModule[] = [
  new CompareAchievements(),
];
render(<App modules={modules} />, target)
