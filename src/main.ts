/*
topmost file that calls everything else
*/
import {Maze} from "./maze";
import "./index.css";

window.onload = () => {
    const maze = new Maze(10,15,50);
    maze.highlight_path();
}