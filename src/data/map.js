const nodes = {
  velour: { name: "Velour", x: 0, y: 0, z: 0, hidden: false },
  jacquard: { name: "Jacquard", x: -321, y: 731, z: 146, hidden: false },
  poplin: { name: "Poplin", x: 282, y: 423, z: 173, hidden: false },
  gathernotch: { name: "Gathernotch", x: 1079, y: 501, z: 589, hidden: false },
  leewardCrossroads: { name: "The Leeward Crossroads", x: 2000, y: 0, z: 0, hidden: false },
  windwardCrossroads: { name: "The Windward Crossroads", x: -2000, y: 0, z: 0, hidden: false },
  upperWyroads: { name: "The Upper Wyroads", x: 0, y: 2000, z: 0, hidden: false },
  lowerWyroads: { name: "The Lower Wyroads", x: 0, y: -2000, z: 0, hidden: false },
  starboardZeeroads: { name: "The Starboard Zeeroads", x: 0, y: 0, z: 2000, hidden: false },
  portZeeroads: { name: "The Port Zeeroads", x: 0, y: 0, z: -2000, hidden: false },
  hopsack: { name: "Hopsack", x: 851, y: 1532, z: -2973, hidden: false },
  caves: { name: "The Caves", x: -1589, y: 1623, z: -963, hidden: false },
  tambour: { name: "Tambour", x: -731, y: -2531, z: 891, hidden: false },
  hookEye: { name: "Hook Eye", x: 2800, y: -1851, z: 853, hidden: true },
  litheAndShaw: { name: "Lithe and Shaw's Hideout", x: 3275, y: -2500, z: 1723, hidden: false },
};

const edges = [
  ["velour", "jacquard"],
  ["velour", "poplin"],
  ["velour", "gathernotch"],
  ["velour", "upperWyroads"],
  ["velour", "lowerWyroads"],
  ["velour", "windwardCrossroads"],
  ["velour", "leewardCrossroads"],
  ["velour", "starboardZeeroads"],
  ["velour", "portZeeroads"],
  ["poplin", "gathernotch"],
  ["portZeeroads", "hopsack"],
  ["lowerWyroads", "tambour"],
  ["hookEye", "leewardCrossroads"]
];

const map = {
  nodes,
  edges,
};

export default map;
