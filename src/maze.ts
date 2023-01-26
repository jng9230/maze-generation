// import { times } from "lodash";
import "./maze.css"
class Maze {
    grid:{[key:string]:number}[][];
    rows:number;
    cols: number;
    width: number;
    height: number;
    square_size: number;
    margins: {
        left: number;
        right: number;
        bottom: number;
        top: number;
    }

    start:number[];
    end:number[];
    path_to_end: number[][];

    wall_thickness:number;
    wall_color:string;

    constructor(
        rows = 10, 
        cols = 10, 
        square_size = 50, 
        start = [0,0], 
        end = [rows-1,cols-1],
        margins = {
            left: 20,
            right: 20,
            bottom: 20,
            top: 20
        },
        wall_thickness = 1,
        wall_color = "black"){
            this.rows = rows; 
            this.cols = cols;

            let grid: { [key: string]: number }[][] = new Array(rows)
            for (let i = 0; i < rows; i++) {
                grid[i] = new Array(cols)
            }
            //each i,j of the grid is dict representing the walls; 1 == wall exists; 0 == no wall
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    grid[i][j] = {
                        "U": 1,
                        "D": 1,
                        "L": 1,
                        "R": 1
                    }
                }
            }
            this.grid = grid;

            
            this.square_size = square_size;
            const svg = document.getElementById("maze");
            const height = this.rows * this.square_size;
            const width = this.cols * this.square_size;
            svg.setAttribute("width", `${width}`);
            svg.setAttribute("height", `${height}`);
            this.height = height;
            this.width = width;

            this.start = start;
            this.end = end;
            this.margins = margins;
            this.wall_thickness = wall_thickness;
            this.wall_color = wall_color;
            this.generate_grid();
            this.grid_to_svg();
    }

    /** Runs the growing tree algorithm to generate the maze and saves it
     * into the .grid property
     */
    generate_grid(){
        let grid = this.grid;
        let num_rows = this.rows;
        let num_cols = this.cols;

        let to_travel: number[][] = []//queue of nodes to visit; each node is [row,col]
        to_travel.push([0, 0])//initialize to top left node for now  
        let seen: Set<string> = new Set(); //set of nodes that have been seen

        let dirs_dict: { [key: string]: number[] } = {
            "U": [0, -1],
            "D": [0, 1],
            "L": [-1, 0],
            "R": [1, 0]
        }
        let dirs_opp: { [key: string]: string } = {
            "U": "D",
            "D": "U",
            "L": "R",
            "R": "L"
        }
        while (to_travel.length > 0) {
            //find node to start from
            const index = this.choose_index(to_travel)
            const [y, x] = to_travel[index]
            seen.add([y, x].toString())

            //find neighbors that are in bounds and not seen already
            let neigh_arr: { [key: string]: string | number[] }[] = [];
            for (const [dir, [dx, dy]] of Object.entries(dirs_dict)) {
                const possible_neigh = [y + dy, x + dx];
                if (possible_neigh[0] >= 0 &&
                    possible_neigh[1] >= 0 &&
                    possible_neigh[0] < num_rows &&
                    possible_neigh[1] < num_cols &&
                    !(seen.has(possible_neigh.toString()))) {
                    neigh_arr.push({
                        "dir": dir,
                        "node": possible_neigh
                    })

                    //if neigh is end node, update the path there
                    if (possible_neigh[0] == this.end[0] &&
                        possible_neigh[1] == this.end[1]){
                            //use map for shallow copy -- JS copies by reference o.w.
                            this.path_to_end = [...to_travel, this.end].map((d) => d); 
                        }
                }
            }

            //remove node if there are no unvisted neighbors; travel o.w.
            if (neigh_arr.length == 0) {
                to_travel.splice(index, 1);
            } else { //pick random neigh and travel, setting walls between nodes as empty
                const neigh = neigh_arr[Math.floor(Math.random() * neigh_arr.length)];
                const node = neigh.node as number[];
                const dir = neigh["dir"] as string;

                const opp = dirs_opp[dir];
                grid[y][x][dir] = 0;
                grid[node[0]][node[1]][opp] = 0;
                to_travel.push(node);
            }
        }
        this.grid = grid;
    }

    /** Takes in an array of nodes and returns a random index in that array */
    choose_index(n: number[][]) {
        return n.length - 1
    }

    /** Draws the maze onto the document's SVG */
    grid_to_svg(){
        //get and set width and height of svg
        const grid = this.grid;
        const svg = document.getElementById("maze");
        const margins = this.margins;
        const height = this.height;
        const width = this.width;
        
        //have lines based off of different height/width to simulate margins
        const width1 = width - margins.left - margins.right;
        const height1 = height - margins.top - margins.bottom;
        
        //add in SVG lines to make the maze
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                const square = grid[i][j];
                for (const [dir, has_wall] of Object.entries(square)) {
                    if (!has_wall) {
                        continue;
                    }

                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    const width_factor = width1 / grid[0].length;
                    const height_factor = height1 / grid.length;
                    if (dir == "U") {
                        line.setAttribute('x1', `${(width_factor) * j}`);
                        line.setAttribute('y1', `${(height_factor) * i}`);
                        line.setAttribute('x2', `${(width_factor) * (j + 1)}`);
                        line.setAttribute('y2', `${(height_factor) * i}`);
                    } else if (dir == "D") {
                        line.setAttribute('x1', `${(width_factor) * j}`);
                        line.setAttribute('y1', `${(height_factor) * (i + 1)}`);
                        line.setAttribute('x2', `${(width_factor) * (j + 1)}`);
                        line.setAttribute('y2', `${(height_factor) * (i + 1)}`)
                    } else if (dir == "L") {
                        line.setAttribute('x1', `${(width_factor) * j}`);
                        line.setAttribute('y1', `${(height_factor) * i}`);
                        line.setAttribute('x2', `${(width_factor) * j}`);
                        line.setAttribute('y2', `${(height_factor) * (i + 1)}`)
                    } else if (dir == "R") {
                        line.setAttribute('x1', `${(width_factor) * (j + 1)}`);
                        line.setAttribute('y1', `${(height_factor) * i}`);
                        line.setAttribute('x2', `${(width_factor) * (j + 1)}`);
                        line.setAttribute('y2', `${(height_factor) * (i + 1)}`)
                    }

                    //add margins for lines 
                    line.setAttribute("x1", `${parseFloat(line.getAttribute("x1")) + margins.left}`);
                    line.setAttribute("x2", `${parseFloat(line.getAttribute("x2")) + margins.left}`);
                    line.setAttribute("y1", `${parseFloat(line.getAttribute("y1")) + margins.top}`);
                    line.setAttribute("y2", `${parseFloat(line.getAttribute("y2")) + margins.top}`);
                    line.setAttribute("stroke", this.wall_color)
                    line.setAttribute("stroke-width", `${this.wall_thickness}`)
                    svg.append(line);
                }
            }
        }
    }

    /** Highlights the path from the start to the end of the maze with circles */
    highlight_path(){
        //the "positional" width of the SVG is with margins and whatnot
        const width1 = this.width - this.margins.left - this.margins.right;
        const height1 = this.height - this.margins.top - this.margins.bottom;
        const x_factor = width1/this.cols;
        const y_factor = height1/this.rows;
        const r = 4
        this.path_to_end.map(d => {
            const x = d[1];
            const y = d[0];

            //add to SVG 
            const svg = document.getElementById("maze");
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttributeNS(null, 'cx', `${(x*x_factor) + (this.square_size/2) + this.margins.left}`);
            circle.setAttributeNS(null, 'cy', `${(y*y_factor) + (this.square_size/2) + this.margins.top}`);
            circle.setAttributeNS(null, 'r', `${r}`);
            circle.setAttributeNS(null, 'style', 'fill: none; stroke: green; stroke-width: 2px;');
            svg.append(circle);

        })
    }
}

export {Maze}