/*
topmost file that calls everything else
*/
// import {Maze} from "./maze";
import {ResponsiveMaze} from "./responsive_maze"

window.onload = () => {
    const maze = new ResponsiveMaze(10);
    maze.highlight_path();
}