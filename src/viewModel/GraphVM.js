import { useDispatch, useSelector } from "react-redux";
import { dimActions } from "../stores/dimension";

class graphVM {
  constructor(data) {
    this.data = data;
    if (new.target === graphVM) {
      //la rende stratta
      throw new Error("non instanziabile, classe astratta");
    }
  }
  dim = useSelector((state) => state.dim.dimension);
  isSelected = useSelector((state) => state.dim.isSelected);
  dispatch = useDispatch();

  takeCord(index) {
    for (let i = 0; i < this.dim.length; i++) {
      if (this.isSelected[i]) {
        if (!index) {
          return { cord: this.dim[i], index: i };
        } else {
          index -= 1;
        }
      }
    }
  }
  trasformaArray(array, cord) {
    /*fa accoppiamento chiave valore per darlo in pasto a d3*/
    let headers = [];
    cord.forEach((element) => {
      headers.push(element);
    });
    return array.map(function (row) {
      return headers.reduce(function (object, header, index) {
        object[header] = row[index];
        return object;
      }, {});
    });
  }
  dimensionNumber() {
    /*ritorna il numero delle dimensioni selelzionate dall'utente*/
    let selection = 0;
    this.isSelected.forEach((element) => {
      if (element) {
        selection += 1;
      }
    });
    return selection;
  }
}

export default graphVM;
