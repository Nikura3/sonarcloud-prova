class graphException extends Error {
    constructor(message, selectionDim, rigthDim) {
        super(message);
        this.selectionDim = selectionDim;
        this.rigthDim = rigthDim;
    }
    messageDim() {
        if (this.selectionDim < this.rigthDim) {
            const selez = this.rigthDim - this.selectionDim;
            const dim = selez == 1 ? "dimensione mancante" : "dimensioni mancanti";
            return `, selezionare ${selez} ${dim}`;
        }
        else {
            const selez = this.selectionDim - this.rigthDim;
            const dim = selez == 1 ? "dimensione" : "dimensioni";
            return `, deselezionare ${selez} ${dim}`;
        }
    }
}

export default graphException;