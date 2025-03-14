import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareThreads,
  faLine
} from '@fortawesome/free-brands-svg-icons';
import {
  faGlasses,
  faCircleChevronRight,
  faChevronLeft,
  faAngleUp,
  faAngleDown,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faSquareFacebook,
  faSquareInstagram,
  faSquareThreads,
  faLine,
  faGlasses,
  faCircleChevronRight,
  faChevronLeft,
  faAngleUp,
  faAngleDown,
  faMagnifyingGlass
);

export default function installFontAwesome(app) {
  app.component('VIcon', FontAwesomeIcon);
}
