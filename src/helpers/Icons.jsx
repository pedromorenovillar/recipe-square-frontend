import {
  faBars,
  faSearch,
  faSpinner,
  faUtensils,
  faFaceFrown,
  faPlus,
  faMinus,
  faSquarePlus,
  faPenToSquare,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
  return library.add(
    faBars,
    faSearch,
    faSpinner,
    faUtensils,
    faFaceFrown,
    faPlus,
    faMinus,
    faSquarePlus,
    faPenToSquare,
    faTrash,
    faEye
  );
};

export default Icons;
