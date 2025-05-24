"use client"
import React, {PropsWithChildren} from "react";
import {Plus, Pencil} from "lucide-react";
import {Button} from "@/components/generic/Button";
import {useProduct} from '@/context/ProductContext'
export const AddState = ({children}: PropsWithChildren) => {
    const { popupState} = useProduct();

    return (
        popupState.type === 'add' ? <div>{children}</div> : <></>
    )
}
export const EditState = ({children}: PropsWithChildren) => {
    const { popupState} = useProduct();

    return (
        popupState.type === 'edit' ? <div>{children}</div> : <></>
    )
}


export const AddButton = () => {
    const {setPopupState} = useProduct();

    return (
        <Button onClick={() => setPopupState({type: 'add'})}>
            <Plus size={16} className="mr-1" /> Add Product
        </Button>
    )
}

export const EditButton = ({id}: {id: number}) => {
    const {setPopupState} = useProduct();
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() =>
                setPopupState({
                    type: "edit",
                    id,
                })}
        >
            <Pencil size={16} />
        </Button>
    )
}