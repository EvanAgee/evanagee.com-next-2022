// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
import { library, config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from adding its CSS since we did it manually above:
config.autoAddCss = false; /* eslint-disable import/first */
import {
  faAngleDown,
  faAngleUp,
  faAngleRight,
  faAngleLeft,
  faBars,
  faTimes,
  faImages,
} from "@fortawesome/pro-light-svg-icons";
import { faCalendarAlt, faSearch } from "@fortawesome/pro-regular-svg-icons";
import {
  faFilter,
  faBookOpen,
  faTag,
  faCaravan,
  faHome,
  faLaptopHouse,
  faMugTea,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faAngleDown,
  faAngleUp,
  faAngleRight,
  faAngleLeft,
  faFilter,
  faBars,
  faBookOpen,
  faTag,
  faCalendarAlt,
  faTimes,
  faSearch,
  faCaravan,
  faTwitter,
  faGithub,
  faLinkedin,
  faHome,
  faLaptopHouse,
  faMugTea,
  faImages
);
