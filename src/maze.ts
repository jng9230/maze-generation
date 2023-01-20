import "./maze.css"

function generate_maze(){
    //TODO: start and end nodes wrt function args

    //initialize the grid 
    const num_rows = 5
    const num_cols = 5
    let grid:{[key:string]: number}[][] = new Array(num_rows)
    for (let i = 0; i < num_rows; i++){
        grid[i] = new Array(num_cols)
    }
    //each i,j of the grid is dict representing the walls; 1 == wall exists; 0 == no wall
    for (let i = 0; i < num_rows; i++){
        for (let j = 0; j < num_cols; j++) {
            grid[i][j] = {
                "U": 1,
                "D": 1,
                "L": 1,
                "R": 1
            }
        }
    }

    let to_travel:number[][] = []//queue of nodes to visit; each node is [row,col]
    to_travel.push([0,0])//initialize to top left node for now  
    let seen:Set<string> = new Set(); //set of nodes that have been seen

    let dirs_dict:{[key:string]: number[]} = {
        "U": [0,1],
        "D": [0,-1],
        "L": [-1, 0],
        "R": [1, 0]
    }
    //let dirs = Object.keys(dirs_dict);
    let dirs_opp: {[key:string]:string} = {
        "U": "D",
        "D": "U",
        "L": "R",
        "R": "L"
    } 
    while (to_travel.length > 0){
        //find node to start from
        const index = choose_index(to_travel)
        const [y, x] = to_travel[index]
        seen.add([x,y].toString())

        //find neighbors that are in bounds and not seen already
        let neigh_arr:{[key:string]:string|number[]}[] = [];
        for (const [dir, [dx,dy]] of Object.entries(dirs_dict)){
            const possible_neigh = [y + dy, x + dx];
            if (possible_neigh[0] >= 0 && 
                possible_neigh[1] >= 0 && 
                possible_neigh[0] < num_rows && 
                possible_neigh[1] < num_cols &&
                !(seen.has(possible_neigh.toString()))){
                neigh_arr.push({
                    "dir": dir,
                    "node": possible_neigh
                })
            }
        }

        //remove node if there are no unvisted neighbors; travel o.w.
        if (neigh_arr.length == 0){
            to_travel.splice(index, 1);
        } else { //pick random neigh and travel, setting walls between nodes as empty
            const neigh = neigh_arr[Math.floor(Math.random() * neigh_arr.length)];
            const node = neigh.node;
            if (typeof (node) == "string"){
                console.log(node);
                return;
            } 
            const dir = neigh["dir"];
            if (typeof(dir) == "object") {
                console.log(dir);
                return;
            }

            grid[y][x][dir] = 0;
            const opp = dirs_opp[dir];
            grid[node[0]][node[1]][opp] = 0;
            to_travel.push(node);
        }
    }
    return grid
}
/** Takes in an array of nodes and returns a random index in that array */
function choose_index(n:number[][]){
    return n.length - 1
}

function to_grid(grid: { [key: string]: number }[][]){
    
}

export {generate_maze}