import { useSelector } from "react-redux";
import parallelCoordinatesVM from "./parallelCoordinatesVM";
import scatterVM from "./scatterVM";
import SankeyVM from "./SankeyVM";
import forceDirectedVM from "./forceDirectedVM";

class chartVM {
  constructor(name) {
    this.graph = name;
    this.scatter = new scatterVM(this.data);
    this.parallel = new parallelCoordinatesVM(this.data);
    this.sankey = new SankeyVM(this.data);
    this.force = new forceDirectedVM(this.data);
  }
  data = useSelector((state) => state.data.data);
  makeChart() {
    if (this.graph === "scatter plot") {
      try {
        this.scatter.makeChart();
      } catch (error) {
        alert(error.message + error.messageDim()); //DA MODIFICARE LA VISUALIZZAZIONE DEGLI ERRORI PER L'UTENTE
      }
    } else if (this.graph === "parallel coordinates") {
      try {
        this.parallel.makeChart();
      } catch (error) {
        alert(error.message); //DA MODIFICARE LA VISUALIZZAZIONE DEGLI ERRORI PER L'UTENTE
      }
    } else if (this.graph === "sankey diagram") {
      try {
        this.sankey.makeChart();
      } catch (error) {
        alert(error.message); //DA MODIFICARE LA VISUALIZZAZIONE DEGLI ERRORI PER L'UTENTE
      }
    } else {
      if (this.graph === "force Directed") {
        try {
          this.force.makeChart();
        } catch (error) {
          alert(error.message); //DA MODIFICARE LA VISUALIZZAZIONE DEGLI ERRORI PER L'UTENTE
        }
      }
    }
  }
}

export default chartVM;
