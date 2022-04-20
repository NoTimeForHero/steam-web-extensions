// https://raw.githubusercontent.com/SamHerbert/SVG-Loaders/master/svg-loaders/spinning-circles.svg
import {FunctionalComponent} from "preact";
import styles from '../index.module.scss';

const Loading : FunctionalComponent<{message?: string}> = (props) => {
  const spinner = <>
    <svg width="58" height="58" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(2 1)" stroke="#FFF" stroke-width="1.5">
          <circle cx="42.601" cy="11.462" r="5" fill-opacity="1" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="1;0;0;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
          <circle cx="49.063" cy="27.063" r="5" fill-opacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;1;0;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
          <circle cx="42.601" cy="42.663" r="5" fill-opacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;1;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
          <circle cx="27" cy="49.125" r="5" fill-opacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;1;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
          <circle cx="11.399" cy="42.663" r="5" fill-opacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;1;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
          <circle cx="4.938" cy="27.063" r="5" fill-opacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;1;0;0" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
          <circle cx="11.399" cy="11.462" r="5" fill-opacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;1;0" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
          <circle cx="27" cy="5" r="5" fill-opacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;0;1" calcMode="linear"
                     repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    </svg>
  </>
  return <div className={styles.loading}>
    <span className={styles.image}>{spinner}</span>
    <span className={styles.text}>{props.message}</span>
  </div>
}

export default Loading;