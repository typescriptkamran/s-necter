// page.tsx
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/generic/Card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/cart/Sidebar";
import AddToCart from "@/components/product/AddToCart";
import { Metadata } from "next";
import Image from "next/image";
import { supabase } from "@/supabase/db";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata(
  { params: $params }: PageProps,
): Promise<Metadata> {
  const params = await $params;
  const { error, data: product } = await getProductWithSlug(params.slug);
  if (error || !product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      // TODO FIX
      url: `http://localhost:3000/${params.locale}/product/${params.slug}`,
      images: [
        {
          url: product.image!,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      locale: params.locale,
      type: "website",
    },
  };
}

async function getProductWithSlug(slug: string) {
  return supabase.from("organic_Product").select().eq("slug", slug).single();
}

export default async function ProductPage({ params: $params }: PageProps) {
  const params = await $params;
  const { error, data: product } = await getProductWithSlug(params.slug);
  if (error || !product) return notFound();
  
  if (product.state === "archived") return notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Sidebar />

      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-lg overflow-hidden shadow-md">
              <Image
                src={product.image!}
                alt={product.name!}
                className="w-full h-auto object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>

            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-xl font-bold text-natural-charcoal">
                ₹{product.price}
              </p>

              {product.weight && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
              )}

              <p className="text-gray-600">{product.description}</p>

              <div className="pt-4">
                <AddToCart product={product} />
              </div>
            </div>
          </div>

          {product.details && (
            <Card className="mb-12">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
                <p className="text-gray-600">{product.details}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
