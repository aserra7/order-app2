import { amanida, begudes, botifarra, calamarsromana, canalons, complements, costello, entrants, escalivada, patatesolot, pollastrealast, vegetariaimg } from "./index";

const categories = [
    {
        name: "vegetaria",
        image: vegetariaimg
    },
    {
        name: "carns",
        image: pollastrealast,
    },
    {
        name: "complements",
        image: complements
    },
    {
        name: "entrants",
        image: entrants,
    },
    {
        name: "begudes",
        image: begudes
    },
]


const menjars = [
    {
        id: '1',
        name: "amanida",
        image: amanida,
        categories: ["vegetaria", "entrants"],
        preu: 2
    },
    {
        id: '2',
        name: "botifarra",
        image: botifarra,
        categories: ["carns"],
        preu: 3.65
    },
    {
        id: '3',
        name: "calamar a romana",
        image: calamarsromana,
        categories: ["entrants", "complements"],
        preu: 6.95
    },
    {
        id: '4',
        name: "canalons",
        image: canalons,
        categories: ["carns", "entrants"],
        preu: 6.50
    },
    {
        id: '5',
        name: "costello",
        image: costello,
        categories: ["carns"],
        preu: 8.70
    },
    {
        id: '6',
        name: "escalivada",
        image: escalivada,
        categories: ["entrants", "vegetaria"],
        preu: 3.70
    },
    {
        id: '7',
        name: "patates d'olot",
        image: patatesolot,
        categories: ["complements"],
        preu: 4.50
    },
    {
        id: '8',
        name: "pollastre a l'ast",
        image: pollastrealast,
        categories: ["carns"],
        preu: 6.50
    },
]

export {
    categories, menjars
}