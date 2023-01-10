import "./maze.css"

function generate_maze(){
    //initialize the grid 
    const num_rows = 10
    const num_cols = 10
    let grid = new Array(num_rows)
    for (let i = 0; i < num_rows; i++){
        grid[i] = new Array(num_cols)
    }

    let to_travel = []//queue of nodes to look at
    to_travel.push([0,0])//initialize to top left node for now  

    let dirs_dict:{[key:string]: number[]} = {
        "U": [0,1],
        "D": [0,-1],
        "L": [-1, 0],
        "R": [1, 0]
    }
    let dirs = Object.keys(dirs_dict);
    let old_index = 0;//index of prev. square
    while (to_travel.length){
        const index = choose_index(old_index)

        //find neighbor randomly
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const neigh = [to_travel[0][0] + dirs_dict[dir][0], to_travel[0][1] + dirs_dict[dir][1]];

        //neigh in bounds -> travel; remove original node o.w. (deadend)
        if (neigh[0] >= 0 && neigh[1] >= 0 && neigh[0] < num_rows && neigh[1] < num_cols){
            
        }

    }
}

function choose_index(n:number){
    return n-1
}

export {generate_maze}