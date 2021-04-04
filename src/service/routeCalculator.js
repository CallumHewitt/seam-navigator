export function calculateRoute(map, fromId, toId) {
  const startNode = map.nodes[fromId]
  const endNode = map.nodes[toId]
  if (startNode === undefined || endNode === undefined) {
    return undefined;
  } else {
    const crowDistance = distanceBetweenNodes(startNode, endNode)
    const route = getDijkstraRoute(map, fromId, toId)
    const chalkedDistance = route.map(step => step.distance).reduce((prev, curr) => prev + curr, 0)
    return {
      chalkedDistance,
      crowDistance,
      route,
      from: fromId,
      to: toId
    };
  }
}

export function distanceBetweenNodes(node1, node2) {
  const xDiff = node1.x - node2.x
  const yDiff = node1.y - node2.y
  const zDiff = node1.z - node2.z
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2) + Math.pow(zDiff, 2));
}

function getDijkstraRoute(map, fromId, toId) {
  let distances = {}
  let previous = {}
  let unvisited = new Set(Object.keys(map.nodes))
  let neighbours = {}
  unvisited.forEach(nodeId => {
    distances[nodeId] = Number.MAX_VALUE
    previous[nodeId] = undefined
    neighbours[nodeId] = []
  })
  map.edges.forEach(edge => {
    const node1 = edge[0]
    const node2 = edge[1]
    neighbours[node1].push(node2)
    neighbours[node2].push(node1)
  })

  distances[fromId] = 0

  while (unvisited.size > 0) {
    let current = Object.keys(distances)
      .filter((nodeId) => unvisited.has(nodeId))
      .reduce((prev, curr) => distances[curr] < distances[prev] ? curr : prev)
    unvisited.delete(current)
    for (let neighbour of neighbours[current]) {
      const jumpDistance = distanceBetweenNodes(map.nodes[current], map.nodes[neighbour])
      const alt = distances[current] + jumpDistance
      if (alt < distances[neighbour]) {
        distances[neighbour] = alt
        previous[neighbour] = [current, jumpDistance]
      }
    }
  }

  return previousToRoute(previous, toId)

}

function previousToRoute(previous, toId) {
  if (previous[toId] === undefined) {
    return []
  } else {
    let nextId = toId;
    let route = []
    while (previous[nextId] !== undefined) {
      const previousValue = previous[nextId]
      route.push({
        to: nextId, from: previousValue[0], distance: previousValue[1]
      })
      nextId = previousValue[0]
    }
    return route.reverse();
  }
}