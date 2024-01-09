import "./index.scss";

import GoJs from "gojs";

import MindMap from "../../lib/mindmap";
import questions from "../../lib/questions";

const mindMap = new MindMap(questions);

const $ = GoJs.GraphObject.make;

let nodeTemplate = $(GoJs.Node, "Auto", {
	locationSpot: GoJs.Spot.Center
},

$(GoJs.Shape, "RoundedRectangle",
	{
		fill: "white",
		portId: "",
		cursor: "pointer",
		fromLinkable: true,
		fromLinkableSelfNode: true,
		fromLinkableDuplicates: true,
		toLinkable: true,
		toLinkableSelfNode: true,
		toLinkableDuplicates: true
	},
	new GoJs.Binding("fill", "color")
),

$(GoJs.TextBlock,
	{
		font: "bold 14px Lucida Console",
		cursor: "pointer",
		stroke: "#333",
		margin: 6,
		isMultiline: false,
		editable: false
	},
	new GoJs.Binding("text", "text").makeTwoWay()
)
);


const myDiagram = $(GoJs.Diagram, "diagram", {
	layout: $(GoJs.ForceDirectedLayout)
});

myDiagram.addDiagramListener("ObjectSingleClicked",
	function (e) {
		console.log(e);
	});

const map = mindMap.getMap();
myDiagram.model = new GoJs.GraphLinksModel(map.nodes, map.links);
myDiagram.nodeTemplate = nodeTemplate;
//myDiagram.isEnabled = false;

document.getElementById("currentYear").innerText = new Date().getFullYear().toString();
