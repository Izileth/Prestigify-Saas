"use client"

import { useState, ChangeEvent, useRef } from "react"
import { debounce } from 'lodash'
import { changeName } from "../_actions/change-name"
import { toast } from "sonner"

export function Name({ initialName }: { initialName: string }) {
    const [name, setName] = useState(initialName);
    const [originalName] = useState(initialName);

    const debouncedChangeName = useRef(
        debounce(async (currentName: string) => {
        if (currentName.trim() === '') {
            setName(originalName);
            return;
        }

        if (currentName !== name) {
            try {
            const response = await changeName({ name: currentName });

            if (response.error) {
                toast.error(response.error);
                setName(originalName);
                return;
            }
            
            toast.success('Nome atualizado com sucesso!');
            } catch (err) {
            console.error(err);
            setName(originalName);
            }
        }
        }, 500)
    ).current;

    function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setName(value);
        debouncedChangeName(value);
    }

    return (
        <div className="w-full">
        <label className="text-sm font-medium text-gray-600 mb-1 block">Nome:</label>
        <input 
            className="w-full p-3 text-base border border-gray-200 rounded-none bg-white focus:outline-none focus:border-gray-400"
            value={name}
            onChange={handleChangeName}
        />
        </div>
    );
}