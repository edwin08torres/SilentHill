export interface Character {
    name: string;
    role: string;
    image: string;
    description: string;
}

export const characters: Character[] = [
    {
        name: "James Sunderland",
        role: "Protagonista",
        image: "/James.webp",
        description: "Buscando una carta que no debería existir.",
    },
    {
        name: "Maria",
        role: "La ilusión",
        image: "/Maria.webp",
        description: "Nacida de la niebla y un deseo oscuro.",
    },
    {
        name: "Angela Orosco",
        role: "Fugitiva",
        image: "/Angela.webp",
        description: "Para mí, siempre es como si estuviera ardiendo.",
    },
    {
        name: "Pyramid Head",
        role: "El castigador",
        image: "/RedPiramed.webp",
        description: "El castigador nacido de la culpa.",
    },
];
