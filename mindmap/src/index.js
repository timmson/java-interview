import "bootstrap";
import "./index.scss";

import GoJs from "gojs";
import Vue from "vue";

import MindMap from "../../lib/mindmap";
import questions from "../../lib/questions";

const mindMap = new MindMap(questions);

const goJs = GoJs.GraphObject.make;

let nodeTemplate = goJs(GoJs.Node, "Auto", {
	locationSpot: GoJs.Spot.Center
},

goJs(GoJs.Shape, "RoundedRectangle",
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

goJs(GoJs.TextBlock,
	{
		font: "bold 14px Lucida Console",
		cursor: "pointer",
		stroke: "#333",
		margin: 6,  // make some extra space for the shape around the text
		isMultiline: false,  // don't allow newlines in text
		editable: false  // allow in-place editing by user
	},
	new GoJs.Binding("text", "text").makeTwoWay()
)
);


Vue.component("diagram", {
	template: "<div class=\"diagram\"></div>",
	//props:,
	mounted() {
		const myDiagram = goJs(GoJs.Diagram, this.$el, {
			layout: goJs(GoJs.ForceDirectedLayout)
		});
		myDiagram.addDiagramListener("ObjectSingleClicked",
			function (e) {
				if (e.subject.part.ib.link !== undefined) {
					//console.log(e.subject.part.ib.link);
					window.open(e.subject.part.ib.link);
				}
			});
		const map = mindMap.getMap();
		myDiagram.model = new GoJs.GraphLinksModel(map.nodes, map.links);
		myDiagram.nodeTemplate = nodeTemplate;
		//myDiagram.isEnabled = false;
	}
});


new Vue({
	el: "#app",
	data: {
		currentYear: new Date().getFullYear().toString(),
		modelData: {}
	},
	mounted() {

	}
});
