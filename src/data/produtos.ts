import { Produto } from "@/interfaces/ProdutoInterface";
import image1 from "@/assets/img/air-jordan-1-mid-dutch-green-1-400.png";
import image2 from "@/assets/img/air-jordan-1-high-zoom-cmft-tropical-twist-1-400.png";
import image3 from "@/assets/img/air-jordan-1-retro-high-court-purple-w-1-400.png";
import image4 from "@/assets/img/air-jordan-1-mid-light-smoke-grey-gs-1-1000.png";
import image5 from "@/assets/img/air-jordan-1-mid-bright-citrus-1-1000 1.png";
import image6 from "@/assets/img/air-jordan-1-mid-grey-camo-1-1000 1.png";


export const produtos: Produto[] = [
    {
        id: 1,
        image: image1,
        nome: "Air Jordan 1 Mid Dutch Green",
        categoria: "Tênis Air Jordan",
        preco: 1199.99
    },
    {
        id: 2,
        image: image2,
        nome: "Air Jordan 1 High Zoom CMFT Tropical Twist",
        categoria: "Tênis Air Jordan",
        preco: 1049.00
    },
    {
        id: 3,
        image: image3,
        nome: "Air Jordan 1 Mid Dutch Green",
        categoria: "Tênis Air Jordan",
        preco: 1350.00
    },
    {
        id: 4,
        image: image4,
        nome: "Air Jordan 1 Mid GS \"Light Smoke Grey\"",
        categoria: "Tênis Air Jordan",
        preco: 1585.00
    },
    {
        id: 5,
        image: image5,
        nome: "Air Jordan 1 Mid SE Bright Citrus",
        categoria: "Tênis Air Jordan",
        preco: 949.99
    },
    {
        id: 6,
        image: image6,
        nome: "Air Jordan 1 Mid Grey Camo",
        categoria: "Tênis Air Jordan",
        preco: 999.99
    },
]