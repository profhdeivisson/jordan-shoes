import { produtos } from "@/data/produtos";
import Produto from "../Produto";

export default function MainContent() {
    return (
        <div className="w-full mb-10 md:mb-24">
            <div className="w-full max-w-[1216px] p-6 m-auto">
                <div className="flex flex-col justify-center items-center text-dark-10 w-full md:max-w-[520px] xl:max-w-[593px] m-auto py-4 md:py-6 xl:py-10">
                    <h2 className="font-semibold text-xl md:text-2xl xl:text-[32px] mb-4 xl:mb-5">Os melhores em um só lugar</h2>
                    <p className="text-sm md:text-base xl:text-2xl text-center">A marca Jordan na JordanShoes é a escolha certa para os amantes de sneakers que buscam estilo e conforto</p>
                </div>
                <div className="produtos gap-10 xl:gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center w-fit m-auto">
                    {produtos.map((produto) => (
                        <Produto key={produto.id} produto={produto} />
                    ))}
                </div>
            </div>
        </div>
    )
}