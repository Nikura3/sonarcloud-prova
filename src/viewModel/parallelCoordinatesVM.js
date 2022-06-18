import { useDispatch, useSelector } from "react-redux";
import graphVM from "./GraphVM";
import * as d3 from "d3";
import { chartActions } from "../stores/chartSlice";

class parallelCoordinatesVM extends graphVM {
  constructor(data) {
    super(data);
  }
  dim = useSelector((state) => state.dim.dimension);
  dispatch = useDispatch();
  makeChart() {
    //override
    if (this.dimensionNumber() <= 1) {
      throw new Error(
        "Modificare la propria selezione, il grafico parallel diagram vuole dalle 2 dimensioni scelte in su"
      );
    }
    let cord = [];
    for (let i = 0; i < this.dimensionNumber(); i++) {
      cord.push(this.takeCord(i));
    }
    this.d3Constructor(this.data, cord, this.dim);
  }

  d3Constructor(data, coord, dim) {
    const margin = { top: 30, right: 10, bottom: 10, left: 0 },
      width = 500 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // For each dimension, I build a linear scale. I store all in a y object
    const y = {};
    for (let i in coord) {
      let name = coord[i].cord;
      console.log("name=>", name);
      y[name] = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function (d) {
            return +d[name];
          })
        )
        .range([height, 0]);
    }
    console.log("y=>", y);

    let onlyCoord = [];

    for (let row of coord) {
      onlyCoord.push(row.cord);
    }
    console.log("onlyCoord: ", onlyCoord);

    // Build the X scale -> it find the best position for each Y axis
    const x = d3.scalePoint().range([0, width]).padding(1).domain(onlyCoord);

    console.log("x: ", x);

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
      return d3.line()(
        onlyCoord.map(function (p) {
          return [x(p), y[p](d[p])];
        })
      );
    }

    // Draw the lines
    svg
      .selectAll("myPath")
      .data(data)
      .join("path")
      .attr("d", path)
      .style("fill", "none")
      .style("stroke", "#69b3a2")
      .style("opacity", 0.5);

    // Draw the axis:
    svg
      .selectAll("myAxis")
      // For each dimension of the dataset I add a 'g' element:
      .data(onlyCoord)
      .enter()
      .append("g")
      // I translate this element to its right position on the x axis
      .attr("transform", function (d) {
        console.log("x=>", x(d));
        return "translate(" + x(d) + ")";
      })
      // And I build the axis with the call function
      .each(function (d) {
        d3.select(this).call(d3.axisLeft().scale(y[d]));
      })
      // Add axis title
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function (d) {
        console.log("d=>", d);
        return d;
      })
      .style("fill", "black");
    //--------------CHIAMATA AD AZIONE-----------------
    this.dispatch(chartActions.active());
  }
}

export default parallelCoordinatesVM;
