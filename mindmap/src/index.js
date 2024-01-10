import "./index.scss";

import go from "gojs";

import MindMap from "../../lib/mindmap";
import questions from "../../lib/questions";

const mindMap = new MindMap(questions);

const $ = go.GraphObject.make;

let nodeTemplate = $(go.Node, "Auto", {
	locationSpot: go.Spot.Center
},

$(go.Shape, "RoundedRectangle",
	{
		//fill: "white",
		portId: "",
		cursor: "pointer",
		fromLinkable: true,
		fromLinkableSelfNode: true,
		fromLinkableDuplicates: true,
		toLinkable: true,
		toLinkableSelfNode: true,
		toLinkableDuplicates: true
	},
	new go.Binding("fill", "color")
),

$(go.TextBlock,
	{
		font: "bold 14px Lucida Console",
		cursor: "pointer",
		stroke: "#333",
		margin: 6,
		isMultiline: false,
		editable: false
	},
	new go.Binding("text", "text").makeTwoWay()
)
);


const myDiagram = $(go.Diagram, "diagram", {
	layout: $(go.ForceDirectedLayout)
});

// myDiagram.addDiagramListener("ObjectSingleClicked",
// 	function (e) {
// 		//console.log(e);
// 	});

const map = mindMap.getMap();
myDiagram.model = new go.GraphLinksModel(map.nodes, map.links);
myDiagram.nodeTemplate = nodeTemplate;
//myDiagram.isEnabled = false;

document.getElementById("currentYear").innerText = new Date().getFullYear().toString();
