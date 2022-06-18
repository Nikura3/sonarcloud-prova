import { useDispatch } from "react-redux";
import graphVM from "./GraphVM";
import * as d3 from 'd3';
import * as d3Sankey from "d3-sankey";
import { chartActions } from "../stores/chartSlice";

class SankeyVM extends graphVM {
    constructor(data) {
        super(data);
    }
    dispatch = useDispatch();
    
    makeChart() {//override
        if (this.dimensionNumber() <= 1) {
            throw new Error("Modificare la propria selezione, il grafico sankey diagram necessita di almeno 2 dimensioni");
        }

        let coord = [];
        for (let i = 0; i < this.dimensionNumber(); i++) {
            coord.push(this.takeCord(i));
        }
        console.log("Coord =>\n", coord);

        let OnlyValues = [];
        for(let row of this.data) {
            OnlyValues.push(Object.values(row));
        }
        console.log("OnlyValues =>\n", OnlyValues);

        // Array valori
        let data = [];
        OnlyValues.forEach((elt, index) => {
            let arrayTemp = [];
            coord.forEach(element => {
                arrayTemp.push(OnlyValues[index][element.index]);
            });
            data.push(arrayTemp);
        });
        console.log("Data =>\n", data);

        // Reduce è ricorsiva da quel che ho capito, richiede un minimo di attenzione
        let occurr = data.reduce((counter, item) => {
                counter[item] = counter.hasOwnProperty(item) ? counter[item] + 1 : 1;
                return counter;
            }, {});
        console.log("Occur =>\n", occurr);

        const values = Object.values(occurr);
        console.log("Values =>\n", values);

        const sep_entries = Object
            .keys(occurr)
            .map(elem => elem.split(','));
        console.log("Separate =>\n", sep_entries);

        // Array su cui lavorare
        let sankeydata = {"nodes": [], "links": []};

        // Ciclo for che non delude mai
        for(let i=0; i<sep_entries.length; i++) {
            sankeydata.nodes.push({"name": sep_entries[i][0]});
            sankeydata.nodes.push({"name": sep_entries[i][1]});
            sankeydata.links.push({"source": sep_entries[i][0],
                              "target": sep_entries[i][1],
                              "value": +values[i]});
        }
        console.log("Sankeydata =>\n", sankeydata);

        this.d3Constructor(sankeydata);
    }


    d3Constructor(sankeydata) {

        let margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        // format variables (blocchi source target)
        let formatNumber = d3.format(",.0f"), // zero decimal places
            format = function(d) { return formatNumber(d); },
            color = d3.scaleOrdinal(d3.schemeCategory10);

        // Attacca l'oggetto svg al body della pagina
        let svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Setta le proprietà del diagramma
        let sankey = d3Sankey.sankey()
            .nodeWidth(36)
            .nodePadding(15)
            .size([width, height]);

        let path = sankey.links();

        // Ritorna solo i nodi distinti
        sankeydata.nodes = Array.from(
            d3.group(sankeydata.nodes, d => d.name),
            ([value]) => (value)
        );
        console.log("Sankeydata dist =>\n", sankeydata);

        // Loop through each link replacing the text with its index from node
        sankeydata.links.forEach((d, i) => {
            sankeydata.links[i].source = sankeydata.nodes
                .indexOf(sankeydata.links[i].source);
            sankeydata.links[i].target = sankeydata.nodes
                .indexOf(sankeydata.links[i].target);
        });
        console.log("Sankeydata loop =>\n", sankeydata);

        // Loop su ogni nodo per rendere ognuno di essi un array di oggetti
        // invece che uno di stringhe
        sankeydata.nodes.forEach(function (d, i) {
            sankeydata.nodes[i] = { "name": d };
        });
        console.log("Sankeydata obj =>\n", sankeydata);

        // Assegno la variabile graph all'oggetto che contiene le info
        let graph = sankey(sankeydata);
        console.log("Graph =>\n", graph);

        // Aggiungo i link
        let link = svg.append("g").selectAll(".link")
            .data(graph.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .attr("stroke-width", function(d) { return d.width; });

        // Aggiungo le etichette dei link
        link.append("title")
            .text(function(d) {
                return d.source.name + " → " + d.target.name + "\n" + format(d.value);
            });

        console.log("Link =>\n", link);

        // Aggiungo i nodi
        let node = svg.append("g").selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node");

        // Aggiungo i rettangoli per i nodi
        node.append("rect")
            .attr("x", function(d) { return d.x0; })
            .attr("y", function(d) { return d.y0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("width", sankey.nodeWidth())
            .style("fill", function(d) {
                return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function(d) {
                return d3.rgb(d.color).darker(2); })
            .append("title")
            .text(function(d) {
                return d.name + "\n" + format(d.value); });

        // Aggiungo i titoli dei nodi
        node.append("text")
            .attr("x", function(d) { return d.x0 - 6; })
            .attr("y", function(d) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .text(function(d) { return d.name; })
            .filter(function(d) { return d.x0 < width / 2; })
            .attr("x", function(d) { return d.x1 + 6; })
            .attr("text-anchor", "start");

        console.log("Nodi =>\n", node);

        //--------------CHIAMATA AD AZIONE-----------------
        this.dispatch(chartActions.active());
    }
}

export default SankeyVM;