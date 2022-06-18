import { render, screen } from '@testing-library/react';
import graphException from "./../graphException";
import '@testing-library/jest-dom/extend-expect';

test('controllo restituzione messaggio di errore sulle dimensioni plurale non in eccedenza', () => {
    const exception = new graphException("mesage", 1, 3);
    expect(exception.messageDim()).toBe(", selezionare 2 dimensioni mancanti");
});

test('controllo restituzione messaggio di errore sulle dimensioni singolare non in eccedenza', () => {
    const exception = new graphException("mesage", 1, 2);
    expect(exception.messageDim()).toBe(", selezionare 1 dimensione mancante");
});

test('controllo restituzione messaggio di errore sulle dimensioni plurale in eccedenza', () => {
    const exception = new graphException("mesage", 3, 1);
    expect(exception.messageDim()).toBe(", deselezionare 2 dimensioni");
});

test('controllo restituzione messaggio di errore sulle dimensioni singolare in eccedenza', () => {
    const exception = new graphException("mesage", 3, 2);
    expect(exception.messageDim()).toBe(", deselezionare 1 dimensione");
});

test('controllo restituzione messaggio di errore passato in costruzione all\'oggetto', () => {
    const exception = new graphException("errore", 3, 1);
    expect(exception.message).toBe("errore");
});

test('controllo doppio sul messaggio di errore', () => {
    const exception = new graphException("error", 3, 1);
    expect(exception.messageDim()).not.toBe("error messagge");
});