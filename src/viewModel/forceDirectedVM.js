import graphVM from "./GraphVM";
import * as d3 from 'd3';
import * as d3Force from "d3-force";
import { useDispatch } from "react-redux";
import { chartActions } from "../stores/chartSlice";
import graphException from "../exception/graphException";

class forceDirectedVM extends graphVM {
    constructor(data) {
        super(data);
    }
    dispatch = useDispatch();

    makeChart() {//override
        if (this.dimensionNumber() <= 0) {
            throw new Error("Modificare la propria selezione, il grafico force directed necessita di almeno 1 dimensione");
        }
        let coord = [];
        for (let i = 0; i < this.dimensionNumber(); i++) {
            coord.push(this.takeCord(i));
        }
        console.log("coord =>\n", coord);


        //IN CASO SERVA UN CAMPIONE PIU' PICCOLO SPECIFICATAMENTE PER FORCE DIRECTED
        let sample = [];
        const length = this.data.length;
        for (let i = 0; i < 40; i++) {
            const el = this.data[Math.floor(Math.random() * (length - 1))];
            sample.push(el);
        }
        console.log("sample =>\n", sample);


        let OnlyValues = [];
        for(let row of sample) {
            OnlyValues.push(Object.values(row));
        }
        console.log("OnlyValues =>\n", OnlyValues);

        // Array valori
        let data = [];
        sample.forEach((elt, index) => {
            let arrayTemp = [];
            coord.forEach(element => {
                arrayTemp.push(OnlyValues[index][element.index]);
            });
            data.push(arrayTemp);
        });
        console.log("Data =>\n", data);

        /*
        // Array features
        let coordinates = [];
        coord.forEach(element => {
            coordinates.push(element.cord);
        });
        console.log("Coordinate =>\n", coordinates); */

        //START ELABORAZIONI DATI -------------------------------------------------------------

        let nodes = data;
        console.log("nodes =>\n", nodes);

        nodes = nodes.map((node) => ({id: node}));
        console.log("nodes after map =>\n", nodes);


        // MIN
        let min = [];
        min[0]= data[0][0];
        min[1]= data[0][1];
        for (let row of data) {
            if (row[0] < min[0]) {
                min[0] = row[0];
            }
            if (row[1] < min[1]) {
                min[1] = row[1];
            }
        }
        console.log("min =>\n", min);

        // MAX
        let max = [];
        max[0]= data[0][0];
        max[1]= data[0][1];
        for (let row of data) {
            if (row[0] > max[0]) {
                max[0] = row[0];
            }
            if (row[1] > max[1]) {
                max[1] = row[1];
            }
        }
        console.log("max =>\n", max);

        //NORMALIZED DATA
        let normalized = [];
        let normalized2 = [];
        for (let row of data) {
            let newmax = [];
            newmax[0] = max[0] - min[0];
            newmax[1] = max[1] - min[1];
            normalized.push( (row[0]-min[0])/newmax[0] );
            normalized2.push( (row[1]-min[1])/newmax[1] );
        }

        //Correzione per array normalizzati NaN (succede se si inserisce solo una coordinata, oppure se una coordinata ha valori tutti uguali)
        if(isNaN(normalized[0])){
            let i = 0;
            for (let row of data) {
                if(row[0] === true) {
                    normalized[i] = 1;
                }
                else if(row[0] === false) {
                    normalized[i] = 0;
                }
                else {
                    normalized[i] = 1;
                }
                i++
            }
        }
        if(isNaN(normalized2[0])){
            let i = 0;
            for (let row of data) {
                if(row[1] === true) {
                    normalized2[i] = 1;
                }
                else if(row[1] === false) {
                    normalized2[i] = 0;
                }
                else {
                    normalized2[i] = 1;
                }
                i++
            }
        }
        console.log("normalized =>\n", normalized);
        console.log("normalized2 =>\n", normalized2);

        let links = [];

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i; j < nodes.length; j++) {
                if (Math.abs(normalized[i]-normalized[j]) < 0.3 && Math.abs(normalized2[i]-normalized2[j]) < 0.3 && (i != j) ) {
                    links.push({source: i, target: j, weight: Math.abs(normalized[i]-normalized[j])+Math.abs(normalized2[i]-normalized2[j]) });
                }
            }
        }
        console.log("links =>\n", links);

        const obj = {
            nodes: nodes,
            links: links
        }

        console.log("obj =>\n", obj);
        console.log("obj.nodes =>\n", obj.nodes);

        //END ELABORAZIONI DATI -------------------------------------------------------------

        this.d3Constructor(obj);
    }

    d3Constructor(obj) {

        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 30, bottom: 30, left: 40},
            width = 1000,
            height = 800;

        // append the svg object to the body of the page
        const svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

        // START SIMULATION AND APPLY FORCES
        var simulation = d3.forceSimulation(obj.nodes)
            .force('charge', d3.forceManyBody().strength(-200))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('link', d3.forceLink().links(obj.links))
            //.force("forceX", d3.forceX())
            //.force("forceY", d3.forceY())
            .force('x', d3.forceX(width/3).strength(0.05))
            .force('y', d3.forceY(height/3).strength(0.05))
            .on('tick', ticked);

        // APPEND LINKS TO SVG
        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(obj.links)
            .enter()
            .append("line")
            .attr("stroke", "#517c9a")
            .attr("stroke-width", function(d) { return (Math.pow(2-d.weight, 4) - 3); })
            .attr("stroke-opacity", 0.4)
            .attr("stroke-linecap", "round");

        // APPEND NODES TO SVG
        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(obj.nodes)
            .enter()
            .append("circle")
            .attr('r', 10)
            .attr("fill", "#0eadf1")
            .attr("stroke", "#f8f3ed")
            .attr("stroke-width", 2)
            .call(drag(simulation));

        //APPEND TEXT FOR NODES TO SVG
        /*
        var text = svg.append("g")
            .selectAll("text")
            .data(obj.nodes)
            .enter()


            .append("svg:text")
            .attr("x", 8)
            .attr("y", ".31em")
            .attr("class", "shadow")
            .text(function(d) { return d.name; })


            .append("text")
            .attr("x", 8)
            .attr("y", ".31em")
            .text(function(d) { return d.id; });
            //

        var text = svg.append("g").selectAll("text")
            .data(obj.nodes)
            .enter().append("text")
            .attr("x", 8)
            .attr("y", ".31em")
            .text(function(d) { return d.name; });
            */

        /*
        let label = [];
        for (let row of obj.nodes) {
            console.log("testtest =>\n", row.id[0]);
            label.push(row.id[0]);
        }
        console.log("label =>\n", label);

        // add the text
        var text = svg.selectAll("text")
            .data(label)
            .enter()
            .append("text")
            .attr("x", 8)
            .attr("y", ".31em")
            .text(function(d) { return d.label; });

         */


        // UPDATE NODES AND LINKS EVERY TICK
        function ticked() {
            //update link positions
            //simply tells one end of the line to follow one node around
            //and the other end of the line to follow the other node around
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            //update circle positions each tick of the simulation
            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

            //text
                //.attr("x", function(d) { return d.x; })
                //.attr("y", function(d) { return d.y; })
                //.text(function(d){ return d});
        }


        // DRAG FUNCTIONS
        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }


        this.dispatch(chartActions.active());
    }

}

export default forceDirectedVM;