import Image from "next/image";
import { Name } from "./name";
import { Description } from "./description";

interface CardProfileProps {
    user: {
        id: string;
        name: string | null;
        username: string | null;
        bio: string | null;
        email: string | null;
        image: string | null;
    }
}

export function CardProfile({ user }: CardProfileProps) {
    return (
        <div className="w-full  border border-gray-200 rounded-none p-6 mb-6">
        <div className="flex flex-col items-center text-center">
            <div className="mb-4">
            <Image 
                src={user.image || 'https://github.com/devfraga.png'} 
                alt="Foto de Perfil" 
                width={96} 
                height={96} 
                className="w-24 h-24 rounded-full border border-gray-200 object-cover"
            />
            </div>
            
            <div className="w-full max-w-3xl">
            <Name initialName={user.name || 'Digite seu Nome...'} />
            <Description initialDescription={user.bio || 'Digite sua Biografia...'} />
            </div>
        </div>
        </div>
    );
}