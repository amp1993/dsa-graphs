class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
       // Check if the vertex already exists in the graph
       if (!this.nodes.has(vertex)) {
        // Add the vertex to the graph
        this.nodes.add(vertex);
    } else {
        console.log("Vertex already exists in the graph.");
    }

  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    // Iterate through the array of vertices
    vertexArray.forEach(vertex => {
        // Call the addVertex method to add each vertex to the graph
        this.addVertex(vertex);
    });}

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    // Check if both vertices exist in the graph
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
        // Update the adjacent sets of both vertices to include each other
        v1.adjacent.add(v2);
        v2.adjacent.add(v1); // For undirected graphs
    } else {
        console.log("Both vertices must exist in the graph.");
    }
}

  // Method to add an edge between two vertices
  addEdge(v1, v2) {
    // Check if both vertices exist in the graph
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
        // Update the adjacent sets of both vertices to include each other
        v1.adjacent.add(v2);
        v2.adjacent.add(v1); // For undirected graphs
    } else {
        // Log a message if one or both vertices do not exist
        console.log("Both vertices must exist in the graph.");
    }
}

// Method to remove an edge between two vertices
removeEdge(v1, v2) {
    // Check if both vertices exist in the graph
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
        // Remove the other vertex from the adjacent set of each vertex
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1); // For undirected graphs
    } else {
        // Log a message if one or both vertices do not exist
        console.log("Both vertices must exist in the graph.");
    }
}

// Method to remove a vertex from the graph
removeVertex(vertex) {
    // Check if the vertex exists in the graph
    if (this.nodes.has(vertex)) {
        // Remove the vertex from the graph
        this.nodes.delete(vertex);
        // Update the adjacent sets of other vertices to remove references to the deleted vertex
        this.nodes.forEach(v => {
            v.adjacent.delete(vertex);
        });
    } else {
        // Log a message if the vertex does not exist
        console.log("Vertex does not exist in the graph.");
    }
}

// Depth-First Search (DFS) traversal starting from a given node
depthFirstSearch(start) {
    // Initialize a set to keep track of visited nodes
    let visited = new Set();
    // Initialize an array to store the result of DFS traversal
    let result = [];

    // Helper function to perform DFS
    const dfs = (vertex) => {
        // Mark the current vertex as visited
        visited.add(vertex);
        // Add the current vertex value to the result array
        result.push(vertex.value);

        // Traverse all adjacent vertices of the current vertex
        vertex.adjacent.forEach(neighbor => {
            // If the adjacent vertex has not been visited, recursively call dfs on it
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        });
    };

    // Start DFS traversal from the given start vertex
    dfs(start);
    // Return the result array containing node values
    return result;
}

// Breadth-First Search (BFS) traversal starting from a given node
breadthFirstSearch(start) {
    // Initialize a set to keep track of visited nodes
    let visited = new Set();
    // Initialize an array to store the result of BFS traversal
    let result = [];
    // Initialize a queue with the start vertex
    let queue = [start];

    // Continue traversal until the queue is empty
    while (queue.length > 0) {
        // Dequeue the front vertex from the queue
        let vertex = queue.shift();

        // If the vertex has not been visited yet
        if (!visited.has(vertex)) {
            // Mark the vertex as visited
            visited.add(vertex);
            // Add the vertex value to the result array
            result.push(vertex.value);

            // Enqueue all unvisited adjacent vertices of the current vertex
            vertex.adjacent.forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            });
        }
    }

    // Return the result array containing node values
    return result;
}
}

module.exports = {Graph, Node}