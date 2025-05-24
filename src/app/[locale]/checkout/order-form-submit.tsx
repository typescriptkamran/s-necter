"use client"

import {useFormStatus} from "react-dom";
import {useTranslations} from "next-intl";
import {useEffect, useRef} from "react";
import {useRouter} from "@/i18n/navigation";
import {useCart} from "@/context/CartContext";
import {toast} from 'sonner'
type Props = {
    success: false | { value: true; id: number },
    cartLen?: number
};
const SubmitButton = ({success, cartLen}: Props) => {
    const {pending} = useFormStatus()
    const router = useRouter()
    const {clearCart} = useCart();
    const hasRedirected = useRef(false); // prevent multiple redirects
    const t = useTranslations('checkout')
    useEffect(() => {
        if (!hasRedirected.current && success !== false && success.value) {
            hasRedirected.current = true;
            toast.success("Order successful!");
            clearCart()
            sessionStorage.setItem("orderId", success.id.toString())
            router.push('/thank-you')
        }

    }, [success, router, clearCart])
    return (
        <button
            type="submit"
            disabled={cartLen === 0 || pending}
            className="w-full btn-primary py-3 font-medium disabled:bg-primary/40 "
        >
            { cartLen === 0 ? "Cart is Empty" :
                pending ? 'Placing Order...' : t("placeOrder")}
        </button>
    )
}

export default SubmitButton