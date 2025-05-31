"use client"

import { useState, ChangeEvent, useRef } from "react"
import {debounce} from 'lodash'
import { changeName } from "../_actions/change-name"
import { toast } from "sonner"
export function Name ({initialName}: {initialName: string}) {

    const [name, setName] = useState(initialName)
    const [originalName] = useState(initialName)

    const debouncedChangeName = useRef(
        debounce(async (currentName: string) => {
            if(currentName.trim() === '') {
                setName(originalName)
                return
            }

            if(currentName !== name) {
                try{
                    const response = await changeName({name: currentName})

                    if(response.error){
                        console.log(response.error)
                        toast.error(response.error)
                        setName(originalName)
                        return
                    }
                    
                    toast.success('Nome alterado com sucesso!')
                }catch(err){
                    console.log(err)
                    setName(originalName)
                }
            }

        }, 500)
    ).current

    function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setName(value);
        debouncedChangeName(value)
    }

    return (
        <input className="text-xl md:text-2xl font-normal bg-zinc-50 outline-none w-full max-w-2xl tezt-center"
            value={name}
            onChange={handleChangeName}
        ></input>
    )
}