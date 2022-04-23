import icons from "../resources";
import {getLogger} from "../logging";

const logger = getLogger("Tools");

export const makeButton = (domId: string, onShow: () => void, caption: string) => {
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

export enum DropdownTarget {
  Links = '#links_dropdown_',
  Statistics = '#stats_dropdown_',
}

export const addDropdownLink = (target: DropdownTarget, domId: string, onShow: (gameId?: string) => void, caption: string) => {
  let items = 0;
  let startTime = performance.now();
  document.querySelectorAll('.gameListRow').forEach((gameRow) => {
    const gameId = gameRow.id.match(/game_(.*)/)?.[1];
    if (!gameId) console.log('Not found gameID!', gameRow);
    const body = document.querySelector<HTMLElement>(`${target}${gameId}`)?.querySelector('.popup_body2');
    if (!body) return;
    const span = document.createElement('div');
    span.className = domId;
    span.innerHTML = `<a class="popup_menu_item2 tight" href="javascript:void(0)">
            <h5>${caption}</h5>
          </a>`;
    span.children?.item(0)?.addEventListener('click', () => onShow(gameId));
    body.appendChild(span);
    items++;
  });
  const elapsed = (performance.now() - startTime).toFixed(2);
  logger.debug(`Manipulated over ${items} dropdowns in ${elapsed} ms!`);
}