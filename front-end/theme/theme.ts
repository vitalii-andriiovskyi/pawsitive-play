import Tailwind from "primereact/passthrough/tailwind";
import inputtext from "./intputtext";
import password from "./password";
import avatar from "./avatar";
import menu from "./menu";
import datatable from "./datatable";
import paginator from "./paginator";
import dropdown from "./dropdown";
import button from "./button";
import confirmpopup from "./confirmpopup";
import dialog from "./dialog";
import panel from "./panel";
import tooltip from "./tooltip";


import { PrimeReactPTOptions } from "primereact/api";

const MyTheme: PrimeReactPTOptions = {
  ...Tailwind,
  panel,
  button,
  inputtext,
  password: {
    ...Tailwind.password,
    ...password
  },
  dropdown,
  avatar,
  menu,
  datatable,
  paginator,
  dialog,
  confirmpopup,
  tooltip
}

export default MyTheme;
