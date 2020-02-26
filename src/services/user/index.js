import * as firebase from "./firebase";
import * as local from "./local";

export default process.env.REACT_APP_USE_FIREBASE ? firebase : local;
