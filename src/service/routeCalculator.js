export function calculateRoute(map, fromId, toId) {
  const startNode = map.nodes[fromId]
  const endNode = map.nodes[toId]
  if (startNode === undefined || endNode === undefined) {
    return undefined;
  } else {
    const crowDistance = distanceBetweenNodes(startNode, endNode)
    let routeDetails = getDijkstraRoute(map, fromId, toId)
    let warning = ''
    if (routeDetails.remainingDistance !== 0) {
      let closestNodeName
      if (routeDetails.route.length === 0) {
        closestNodeName = map.nodes[fromId].name
      } else {
        closestNodeName = map.nodes[routeDetails.route[routeDetails.route.length - 1].to].name;
      }
      const formattedDistance = routeDetails.remainingDistance.toLocaleString(undefined, { maximumFractionDigits: 2 })
      warning = `Destination could not be reached along chalked routes. Navigating to ${closestNodeName}. An additional ${formattedDistance} miles of deep black travel will be required.`
    }
    const chalkedDistance = routeDetails.route.map(step => step.distance).reduce((prev, curr) => prev + curr, 0)
    return {
      chalkedDistance,
      crowDistance,
      route: routeDetails.route,
      from: fromId,
      to: toId,
      warning
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
  if (fromId === toId) {
    return { route: [], remainingDistance: 0 }
  }

  let distances = {}
  let backRecord = {}
  let unvisited = new Set(Object.keys(map.nodes))
  let neighbours = {}
  unvisited.forEach(nodeId => {
    distances[nodeId] = Number.MAX_VALUE
    backRecord[nodeId] = undefined
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
        backRecord[neighbour] = [current, jumpDistance]
      }
    }
  }

  if (backRecord[toId] === undefined) {
    // Unreachable
    const reachableNodes = Object.keys(distances).filter((key) => distances[key] !== Number.MAX_VALUE)
    const closestNode = getClosestNode(map, toId, reachableNodes)
    const route = getDijkstraRoute(map, fromId, closestNode.node)
    console.log(route)
    return {
      route: route.route,
      remainingDistance: closestNode.distance
    }
  } else {
    return {
      route: backRecordToRoute(backRecord, toId),
      remainingDistance: 0
    }
  }

}

function backRecordToRoute(backRecord, toId) {
  let nextId = toId;
  let route = []
  while (backRecord[nextId] !== undefined) {
    const record = backRecord[nextId]
    route.push({
      to: nextId, from: record[0], distance: record[1]
    })
    nextId = record[0]
  }
  return route.reverse();
}

function getClosestNode(map, toId, reachableNodes) {
  let closestNode
  let closestDistance = Number.MAX_VALUE
  for (let node of reachableNodes) {
    const distance = distanceBetweenNodes(map.nodes[node], map.nodes[toId])
    if (distance < closestDistance) {
      closestDistance = distance
      closestNode = node
    }
  }
  return {
    node: closestNode,
    distance: closestDistance
  }
}