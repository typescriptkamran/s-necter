// components/OrderForm.tsx
import {  checklistAction } from "@/actions/checkout";
import { useTranslations } from "next-intl";
import {CartItem, OrderItem} from "@/types";
import {useActionState} from "react";
import SubmitButton from "@/app/[locale]/checkout/order-form-submit";

type Props = {
    cartItems: CartItem[];
};

 const OrderForm = ({cartItems}: Props) => {
    const [state, formAction] = useActionState(checklistAction, {errors: {}, success: false})
     const orderItems = {items: cartItems.map((item): OrderItem => ({
             id: item.product.id!,
             count: item.quantity
         }))}
     const t = useTranslations('checkout')
     return (
    <form action={formAction} className="bg-white rounded-lg shadow-md p-6">
        {state.errors.general && <p className="p-2 text-red-400">{state.errors.general}</p>}
        <input
            type="hidden"
            name="cart"
            value={JSON.stringify(orderItems)}
        />

        <div className="mb-6">
            <label htmlFor="name" className="block mb-2 font-medium">
                {t("name")}
            </label>
            <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={t("namePlaceholder")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-natural-golden ${
                    state.errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {state.errors.name && <p className="mt-1 text-red-500 text-sm">{state.errors.name}</p>}
        </div>

        <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 font-medium">
                {t("phone")}
            </label>
            <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder={t("phonePlaceholder")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-natural-golden ${
                    state.errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {state.errors.phone && <p className="mt-1 text-red-500 text-sm">{state.errors.phone}</p>}        </div>

        <div className="mb-6">
            <label htmlFor="address" className="block mb-2 font-medium">
                {t("address")}
            </label>
            <textarea
                id="address"
                name="address"
                required
                placeholder={t("addressPlaceholder")}
                rows={3}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-natural-golden ${
                    state.errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {state.errors.address && <p className="mt-1 text-red-500 text-sm">{state.errors.address}</p>}

        </div>

        <div className="mb-8">
            <h3 className="font-medium mb-3">{t("paymentMethod")}</h3>
            <div className="flex items-center">
                <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    defaultChecked
                    className="w-5 h-5 accent-natural-golden"
                />
                <label htmlFor="cod" className="ml-2">
                    {t("cod")}
                </label>
            </div>
        </div>

     <SubmitButton success={state.success} cartLen={cartItems.length}/>
    </form>
)
}

export  default OrderForm