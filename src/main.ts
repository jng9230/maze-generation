/*
topmost file that calls everything else
*/
import {init_example} from "./example/example";
import {Maze} from "./maze";
import "./index.css";

init_example();
window.onload = () => {
    // const grid = generate_maze();
    // console.log(grid);
    // to_grid(grid)

    const maze = new Maze(10,15,50);

}