import Image from "next/image";
import { Name } from "./name";
import { Description } from "./description";
interface CardProfileProps {
    user: {
        id: string;
        name: string | null;
        username: string| null;
        bio: string | null;
        email: string | null;
        image: string | null;
    }
}

export function CardProfile({user}: CardProfileProps) {
    return(
        <section className="w-full flex flex-col items-center mx-auto px-4">
            <div className="">
                <Image src={user.image ?? 'https://github.com/devfraga.png'} alt="Foto de Perfil" width={96} height={96} className="w-24 h-24 rounded-full border-4 border-zinc-900" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Name initialName={user.name ?? 'Digite seu Nome...'}/>
                <Description initialDescription={user.bio ?? 'Digite sua Biografia...'}/>
            </div>
        </section>
    )
}