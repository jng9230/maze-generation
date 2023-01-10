/*
topmost file that calls everything else
*/
import {init} from "./index";
import {generate_maze} from "./maze";
import "./index.css";

init();
generate_maze();