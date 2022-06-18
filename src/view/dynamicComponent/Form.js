import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { formActions } from "../../stores/formSlice";
import formVM from "../../viewModel/FormVM";
function Form() {
  const formVm = new formVM();
  const dispatch = useDispatch();
  function gestioneCsv(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      sendCsv(text);
    };
    reader.readAsText(file);
  }
  function sendCsv(text) {
    //props.change();/*SI POTREBBE USARE LO STORE INVECE, USATO SOTTO*/
    dispatch(formActions.deactive());
    formVm.send(text);
  }
  return (
    <div className="box" id="contenitoreForm">
      <div className="form">
        <div className="title">Carica qui il CSV</div>
        <div className="contenuto">
          <form id="myForm">
            <div className="bottone" id="csvFile">
              <input type="file" accept=".csv" onChange={gestioneCsv} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Form;
