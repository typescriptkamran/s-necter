import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/cart/Sidebar";
import Card from "@/components/product/Card";
import {getProducts} from "@/supabase/methods";
// import { useTranslations } from "next-intl";

const ProductsPage: React.FC = async () => {
    const { data: $data, error } = await getProducts();
    if (error) console.log(error)
    if (error || !$data) return <>{error}</>
    // const t = useTranslations('products')
    const data = $data.filter(product => product.state !== 'archived')
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <Sidebar />
            <main className="flex-grow pt-24">
                <div className="section-container">
                    {/* Our Products */}
                    <h1 className="text-center mb-12">Our Products</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((product) => (
                            <Card key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductsPage;
