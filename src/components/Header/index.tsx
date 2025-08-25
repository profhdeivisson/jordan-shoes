import Image from "next/image";
import logo from "@/assets/img/logo-jordan.svg";
import { FaTruck } from "react-icons/fa";

export default function Header() {
    return (
        <header className="w-full">
            <div className="flex justify-center items-center bg-dark-20 text-dark-10 font-medium text-sm md:text-base xl:text-2xl h-[39px] md:h-[41px] xl:h-[64px]">
                Frete grátis para todo o Brasil <FaTruck className="ml-3" />
            </div>
            <div className="w-full h-[350px] xl:h-[400px] relative bg-cover bg-center bg-[url('@/assets/img/banner-jordan.png')] md:bg-top">
                <div className="absolute inset-0 bg-dark-10/75 z-0"></div>
                <div className="relative z-10 w-full max-w-[1216px] h-full m-auto text-dark-30 flex flex-col justify-center p-6">
                    <div className="flex gap-1 items-center mb-8">
                        <Image
                            src={logo}
                            alt="Logo"
                            width={38.4}
                            height={35.94}
                            className="w-[19.2px] h-auto xl:w-[38.4px]"
                        />
                        <span className="font-medium text-lg xl:text-2xl">JordanShoes</span>
                    </div>
                    <h1 className="font-medium text-2xl xl:text-[32px] mb-2 xl:mb-6">A melhor loja de Jordan</h1>
                    <p className="text-base md:text-lg xl:text-2xl w-full">O tênis Jordan é fruto de uma velha e forte<br />parceria entre a Nike e o jogador de basquete Michael Jordan.</p>
                </div>
            </div>
        </header>
    )
}