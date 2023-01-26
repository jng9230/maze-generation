/*
topmost file that calls everything else
*/
import {init_example} from "./example/example";
import {Maze} from "./maze";
import "./index.css";

init_example();
window.onload = () => {
    const maze = new Maze(10,15,50);
    maze.highlight_path();
}