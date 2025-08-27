import { StaticImageData } from "next/image";

export interface Produto {
    id: number;
    image: StaticImageData | string;
    nome: string;
    categoria?: string;
    preco: number;
}