import { Produto as ProdutoType } from "@/interfaces/ProdutoInterface";

export interface CartItem {
    produto: ProdutoType;
    quantidade: number;
}