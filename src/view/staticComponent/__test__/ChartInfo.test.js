import { render, screen } from '@testing-library/react';
import ChartInfo from "./../ChartInfo";
import '@testing-library/jest-dom/extend-expect';

test('controllo consistenza testo di introduzione a scatter plot', () => {
    render(<ChartInfo />);
    const text = "Un grafico di dispersione è spesso usato quando una delle variabili è sotto controllo dello sperimentatore. Un parametro che è incrementato e/o decrementato sistematicamente è chiamato parametro di controllo o variabile indipendente, ed è arbitrariamente posto sull'asse orizzontale. La variabile misurata (o dipendente) è arbitrariamente posta sull'asse verticale. Se non esistono variabili dipendenti, ogni variabile può essere messa su un asse a piacere. Il grafico di dispersione può' essere utile per visualizzare il grado di correlazione (cioè di dipendenza lineare) tra le due variabili.";
    const chartInfo = screen.getByTestId("scatter");
    expect(chartInfo).toHaveTextContent(text);
});

test('controllo consistenza testo di introduzione a scatter plot', () => {
    render(<ChartInfo />);
    const text = "Le coordinate parallele sono un sistema comunemente utilizzato per visualizzare spazi n-dimensionali e analizzare dati multivariati. Per mostrare un insieme di punti in uno spazio a n dimensioni, vengono disegnate n linee parallele, solitamente verticali e poste a uguale distanza l'una dall'altra. Un punto nello spazio n-dimensionale è rappresentato come una linea spezzata con i vertici sugli assi paralleli. La posizione del vertice sull'i-esimo asse corrisponde all'i-esima coordinata del punto.";
    const chartInfo = screen.getByTestId("parallel");
    expect(chartInfo).toHaveTextContent(text);
});

test('controllo consistenza testo di introduzione a parallel coordinates', () => {
    render(<ChartInfo />);
    const text = "Gli algoritmi di disegno di grafici forzati sono una classe di algoritmi per disegnare grafici in modo esteticamente gradevole. Il loro scopo è posizionare i nodi di un grafo nello spazio bidimensionale o tridimensionale in modo che tutti gli spigoli siano di lunghezza più o meno uguale e vi siano il minor numero possibile di archi di attraversamento, assegnando forze tra l'insieme degli spigoli e l'insieme dei nodi, in base alle loro posizioni relative, e quindi utilizzare queste forze per simulare il movimento dei bordi e dei nodi o per ridurre al minimo la loro energia. [2]Sebbene il disegno di grafi possa essere un problema difficile, gli algoritmi a forza diretta, essendo simulazioni fisiche, di solito non richiedono conoscenze speciali sulla teoria dei grafi come la planarità.";
    const chartInfo = screen.getByTestId("force");
    expect(chartInfo).toHaveTextContent(text);
});

test('controllo consistenza testo di introduzione a scatter plot', () => {
    render(<ChartInfo />);
    const text = "Il diagramma di Sankey è un particolare tipo di diagramma di flusso in cui l'ampiezza delle frecce è disegnata in maniera proporzionale alla quantità di flusso.Esso è usualmente utilizzato per indicare trasferimenti di energia, materiali, costi o dati in un processo.I diagrammi di Sankey accentuano visivamente i grandi trasferimenti o flussi all'interno di un sistema: sono perciò utili per individuare i contributi dominanti in un flusso complessivo.";
    const chartInfo = screen.getByTestId("sankey");
    expect(chartInfo).toHaveTextContent(text);
});