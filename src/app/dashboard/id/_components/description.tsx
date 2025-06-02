"use client"

import { useState, ChangeEvent, useRef } from "react"
import { debounce } from 'lodash'
import { changeDescription } from "../_actions/change-bio"
import { toast } from "sonner"

export function Description({ initialDescription }: { initialDescription: string }) {
    const [description, setDescription] = useState(initialDescription);
    const [originalDescription] = useState(initialDescription);

    const debouncedChangeName = useRef(
        debounce(async (currentDescription: string) => {
        if (currentDescription.trim() === '') {
            setDescription(originalDescription);
            return;
        }

        if (currentDescription !== description) {
            try {
            const response = await changeDescription({ description: currentDescription });

            if (response.error) {
                toast.error(response.error);
                setDescription(originalDescription);
                return;
            }
            
            toast.success('Bio atualizada com sucesso!');
            } catch (err) {
            console.error(err);
            setDescription(originalDescription);
            }
        }
        }, 500)
    ).current;

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setDescription(value);
        debouncedChangeName(value);
    }

    return (
        <div className="mt-4 w-full">
        <label className="text-sm font-medium text-gray-600 mb-1 block">Biografia:</label>
        <textarea 
            className="w-full p-3 text-sm border border-gray-200 rounded-none bg-white resize-none min-h-[100px] focus:outline-none focus:border-gray-400"
            value={description}
            onChange={handleChange}
        />
        </div>
    );
}