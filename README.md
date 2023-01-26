# maze-generation

This is a Typescript implementation of Jamis Buck's ["Growing Tree"](https://weblog.jamisbuck.org/2011/1/27/maze-generation-growing-tree-algorithm) algorithm for maze generation. Wrapped inside the algorithm is a neat way to find the start-end path; it essentially takes whatever the queue of nodes that have been travelled thus far once the algorithm reaches the end node and calls that the path.

A responsive version of the maze generator is inlcuded that automatically adjusts the maze's dimensions to fill the parent container (e.g.: a full width, full height div).

### To run:
1.  `npm install` 
2. `npm run develop`
3. localhost:4000
