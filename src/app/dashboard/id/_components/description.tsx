"use client"

import { useState, ChangeEvent, useRef } from "react"
import {debounce} from 'lodash'
import { changeDescription } from "../_actions/change-bio"
import { toast } from "sonner"
export function Description ({initialDescription}: {initialDescription: string}) {

    const [description, setDescription] = useState(initialDescription)
    const [originalDescription] = useState(initialDescription)

    const debouncedChangeName = useRef(
        debounce(async (currentDescription: string) => {
            if(currentDescription.trim() === '') {
                setDescription(originalDescription)
                return
            }

            if(currentDescription !== description) {
                try{
                    const response = await changeDescription({description: currentDescription})

                    if(response.error){
                        console.log(response.error)
                        toast.error(response.error)
                        setDescription(originalDescription)
                        return
                    }
                    
                    toast.success('Sua Bio foi Alterada com sucesso!')
                }catch(err){
                    console.log(err)
                    setDescription(originalDescription)
                }
            }

        }, 500)
    ).current

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value
        setDescription(value);
        debouncedChangeName(value)
    }

    return (
        <textarea className="text-base md:text-base font-light bg-zinc-100 outline-none w-full max-w-2xl tezt-center h-32 resize-none "
            value={description}
            onChange={handleChange}
        ></textarea>
    )
}