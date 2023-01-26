import { Maze } from "./maze";

class ResponsiveMaze extends Maze {
    constructor(
        square_size = 50,
        start = [0, 0],
        margins = {
            left: 20,
            right: 20,
            bottom: 20,
            top: 20
        },
        wall_thickness = 1,
        wall_color = "black"
        ){
        //get the wrapper's height and width to calculate widths and whatnot
        const parent = document.getElementById("maze").parentElement;
        const width = parent.offsetWidth;
        const height = parent.offsetHeight;
        const rows = Math.floor(height/square_size);
        const cols = Math.floor(width/square_size);
        super(rows, cols, square_size, start, [rows-1,cols-1],margins, wall_thickness, wall_color)
    }
}

export {ResponsiveMaze}