"use client"
import {UploadButton} from "@/helpers/uploadthing";
import {toast} from "sonner";
import Image from "next/image";
import {useProduct} from "@/context/ProductContext";
import {Button} from "@/components/generic/Button";
import React, {useState} from "react";

const UploadImage = () => {

    const [image, setImage] = useState<string >("");
    return (

        <>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="hidden" value={image} name="image"  />
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    setImage(res[0].ufsUrl)

                    toast.success("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    setImage("")
                    toast.error(`ERROR! ${error.message}`);
                }}

            />
            {image && (
                <Image
                    src={image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded border"
                    width={128}
                    height={128}
                />
            )}
        </>)

}
const CancelButton = () => {

    const {setPopupState} = useProduct();
    return (
        <Button variant="outline" type="button" onClick={() => setPopupState({type: 'none'})}>
            Cancel
        </Button>
    )
}

export { UploadImage, CancelButton };