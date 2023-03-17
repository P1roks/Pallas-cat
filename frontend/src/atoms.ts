import {atom} from "recoil";
import { getDefaultTheme } from "./utils";

export const lastWatchedTitle = atom({key: "lastWatchedTitle", default: localStorage.getItem('lastTitle') ?? ""});
export const logRegErr = atom({key: "logRegErr", default: {msg: "", color: "red"}});
export const theme = atom({key: "theme", default: getDefaultTheme()});