/*
topmost file that calls everything else
*/
import {init_example} from "./example/example";
import {generate_maze} from "./maze";
import "./index.css";

init_example();
console.log(generate_maze());