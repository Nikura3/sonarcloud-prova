import graphVM from "./GraphVM";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { chartActions } from "../stores/chartSlice";
import graphException from "../exception/graphException";
import { sliderBottom } from "d3-simple-slider";
import { pointer } from "d3-selection";

class scatterVM extends graphVM {
  constructor(data) {
    super(data);
  }
  dim = useSelector((state) => state.dim.dimension);
  dispatch = useDispatch();
  makeChart() {
    //override
    if (this.dimensionNumber() != 2) {
      throw new graphException(
        "Modificare la propria selezione, il grafico scatter plot vuole 2 dimensioni scelte",
        this.dimensionNumber(),
        2
      );
    }
    const x = this.takeCord(0);
    const y = this.takeCord(1);
    this.d3Construct(x, y, this.dim, this.data);
  }

  d3Construct(X, Y, dim, data) {
    // salvo data in dataFilter così da poter filtrare i dati ma non quelli originali
    var dataFilter = data;
    console.log("x", X);

    //mostro la sezione personalizzazione
    d3.select("#persContainer").style("display", "inline-block");

    const margin = { top: 20, right: 30, bottom: 10, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append alla pagina del tag svg
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // asse x
    const x = d3
      .scaleLinear()
      .domain([this.min(data, X.cord), this.max(data, X.cord)])
      .range([0, width]);
    svg.append("g").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(x));

    // asse y
    const y = d3
      .scaleLinear()
      .domain([this.min(data, Y.cord), this.max(data, Y.cord)])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    //tooltips
    var tooltip = d3
      .select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    var mouseover = function (d) {
      let circleX = pointer(d)[0];
      let circleY = pointer(d)[1];
      console.log(circleX, circleY);
      var single = d.explicitOriginalTarget.__data__;
      var html =
        "<b>Utente: </b>" +
        single.utente +
        "<br/>" +
        "<b>IP: </b>" +
        single.IP +
        "<br/>" +
        "<b>Applicazione: </b>" +
        single.applicazione +
        "<br/>" +
        "<b>Tipo Evento: </b>" +
        single.tipo_evento +
        "<br/>" +
        "<b>Data: </b>" +
        single.day +
        "/" +
        single.month +
        "/" +
        single.year +
        "<br/>" +
        "<b>Ora: </b>" +
        single.hours +
        ":" +
        single.minutes;

      tooltip
        .html(html)
        .style("left", circleX + "px")
        .style("top", circleY + "px")
        .transition()
        .duration(200) // ms
        .style("opacity", 0.9); // started as 0!
    };
    // tooltip mouseout event handler
    var mouseout = function () {
      tooltip
        .transition()
        .duration(300) // ms
        .style("opacity", 0); // don't care about position!
    };

    // ----- ASSEGNAZIONE DI UNA DIMENSIONE AL COLORE -----

    let el = [];
    console.log("data:", data);

    // inserisco di default l'utente come dimensione del colore
    for (let row of data) {
      console.log(dim[0]);
      el.push(row[dim[0]]);
    }
    console.log("el", el);

    // cerco tutti i valori di utente presenti, senza ripetizioni
    const unique = [...new Set(el)];
    console.log(unique);

    // assegno a color l'utente e i colori da usare
    var color = d3.scaleOrdinal().domain(unique).range(d3.schemeSet3);

    // aggiungo i punti colorati in base all'utente
    svg
      .append("g")
      .selectAll("dot")
      .data(dataFilter)
      .join("circle")
      .attr("cx", function (d) {
        return x(d[X.cord]);
      })
      .attr("cy", function (d) {
        return y(d[Y.cord]);
      })
      .attr("r", 4.5)
      .style("fill", function (d) {
        return color(d.utente);
      })
      .on("mouseover", mouseover)
      .on("mouseleave", mouseout);

    // inserimento dei dati nel menu a tendina
    d3.select("#dimColore")
      .selectAll("myOptions")
      .data(dim)
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      }) // testo mostrato nella tendina
      .attr("value", function (d) {
        return d.toString();
      }); // valore restituito quando cliccato

    //on change del valore selezionato
    d3.select("#dimColore").on("change", function () {
      // recover the option that has been chosen
      let dimCol = d3.select(this).property("value");
      console.log("dimCol", dimCol);
      updateColor(dimCol);
    });

    // elimino tutti i punti che erano stati plottati e li reinserisco con la nuova proprietà
    function updateColor(dimColor) {
      svg.selectAll("circle").remove();

      svg
        .append("g")
        .selectAll("dot")
        .data(dataFilter)
        .join("circle")
        .attr("cx", function (d) {
          return x(d[X.cord]);
        })
        .attr("cy", function (d) {
          return y(d[Y.cord]);
        })
        .attr("r", 4.5)
        .style("fill", function (d) {
          return color(d[dimColor]);
        })
        .on("mouseover", mouseover)
        .on("mouseleave", mouseout);
    }

    // ----- FINE ASSEGNAZIONE DI UNA DIMENSIONE AL COLORE -----

    // ----- FILTRAGGIO DATI IN BASE ALLA DATA -----

    // Cerco tutti gli anni presenti all'interno dei dati inseriti
    let allYears = [data[0].year];
    for (let row of data) {
      let alreadyIn = false;
      for (let year of allYears) {
        if (row.year === year) alreadyIn = true;
      }
      if (!alreadyIn) allYears.push(row.year);
    }

    // mesi dell'anno
    let allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // Inserisco i dati nel menu a tendina
    // da anno
    d3.select("#yearFrom")
      .selectAll("myOptions")
      .data(allYears)
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      }) // testo mostrato nella tendina
      .attr("value", function (d) {
        return d; // relativo valore ritornato
      });

    // da mese
    d3.select("#monthFrom")
      .selectAll("myOptions")
      .data(allMonths)
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      })
      .attr("value", function (d) {
        return d;
      });

    // ad anno
    d3.select("#yearTo")
      .selectAll("myOptions")
      .data(allYears)
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      })
      .attr("value", function (d) {
        return d;
      });

    // a mese
    d3.select("#monthTo")
      .selectAll("myOptions")
      .data(allMonths)
      .enter()
      .append("option")
      .text(function (d) {
        return d;
      })
      .attr("value", function (d) {
        return d;
      });

    var fromYear = allYears[allYears.length - 1];
    var fromMonth = 1;
    var toYear = allYears[0];
    var toMonth = 12;

    // recupero le selezioni delle tendine e chiamo la funzione per aggiornare il grafico
    d3.select("#yearFrom").on("change", function () {
      fromYear = d3.select(this).property("value");
      console.log(fromYear);
      update(fromYear, fromMonth, toYear, toMonth);
    });

    d3.select("#monthFrom").on("change", function () {
      fromMonth = d3.select(this).property("value");
      console.log(fromMonth);
      update(fromYear, fromMonth, toYear, toMonth);
    });

    d3.select("#yearTo").on("change", function () {
      toYear = d3.select(this).property("value");
      console.log(toYear);
      update(fromYear, fromMonth, toYear, toMonth);
    });

    d3.select("#monthTo").on("change", function () {
      toMonth = d3.select(this).property("value");
      console.log(toMonth);
      update(fromYear, fromMonth, toYear, toMonth);
    });

    // funzione per filtrare i dati e sostituirli
    function update(fromY, fromM, toY, toM) {
      // filtro i dati in base alla selezione
      dataFilter = data.filter(function (d) {
        return d.year >= fromY && d.year <= toY && d.month >= fromM && d.month <= toM;
      });

      console.log("dataFilter: ", dataFilter);

      //rimuovo tutti i dati già plottati
      svg.selectAll("circle").remove();

      // aggiungo i dati con le caratteristiche selezionate
      svg
        .append("g")
        .selectAll("dot")
        .data(dataFilter)
        .join("circle")
        .attr("cx", function (d) {
          return x(d[X.cord]);
        })
        .attr("cy", function (d) {
          return y(d[Y.cord]);
        })
        .attr("r", 4.5)
        .style("fill", function (d) {
          return color(d.utente);
        })
        .on("mouseover", mouseover)
        .on("mouseleave", mouseout);
    }

    // ----- FINE FILTRAGGIO DATI IN BASE ALLA DATA -----

    // ----- OPACITÀ -----

    // append alla pagina della struttura generale
    var opacityPicker = d3
      .select("#opacityPicker")
      .append("svg")
      .attr("width", 400)
      .append("g")
      .attr("transform", "translate(30,30)");

    // set del formato dello slider
    var opSlider = sliderBottom()
      .min(0)
      .max(1)
      .step(0.01)
      .width(300)
      .tickFormat(d3.format(".0%"))
      .default(1)
      .on("onchange", (num) => {
        d3.selectAll("circle").transition().duration(500).style("opacity", num);
      });

    // append dello slider effettivo
    opacityPicker.append("g").attr("transform", "translate(30,30)").call(opSlider);

    // ----- FINE OPACITÀ -----

    //--------------CHIAMATA AD AZIONE-----------------
    this.dispatch(chartActions.active());
  }

  min(data, name) {
    let min = data[0][name];
    for (let row of data) {
      if (row[name] < min) {
        min = row[name];
      }
    }
    return min;
  }

  max(data, name) {
    let max = data[0][name];
    for (let row of data) {
      if (row[name] > max) {
        max = row[name];
      }
    }
    return max;
  }
}

export default scatterVM;
