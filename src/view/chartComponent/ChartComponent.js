function Chart() {
  return (
    <div>
      <div
        id="my_dataviz"
        data-testid="my_dataviz"
        style={{ marginLeft: "27%" }}
      ></div>
      <div id="persContainer" style={{ display: "none" }}>
        <p>Modifica l'opacità:</p>
        <div id="opacityPicker"></div>
        <form>
          <p>Dal:</p>
          <div>
            <select id="yearFrom">
              <option value="" disabled selected hidden>
                Anno
              </option>
            </select>
            <select id="monthFrom">
              <option value="" disabled selected hidden>
                Mese
              </option>
            </select>
          </div>
          <p>Al:</p>
          <div>
            <select id="yearTo">
              <option value="" disabled selected hidden>
                Anno
              </option>
            </select>
            <select id="monthTo">
              <option value="" disabled selected hidden>
                Mese
              </option>
            </select>
          </div>
          <div>
            <p>Seleziona la dimensione per il colore:</p>
            <select id="dimColore"></select>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chart;
