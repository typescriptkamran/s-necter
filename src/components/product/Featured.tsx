import React from "react";
import Card from "@/components/product/Card";
import {getProducts} from "@/supabase/methods";

const Featured: React.FC = async () => {
  const { data: $data, error } = await getProducts();
  if (error) console.log(error)
  if (error || !$data) return <>{error}</>
  const data = $data.filter(p => p.state === 'featured')
    return <section id="featured-products" className="section-container">
    <h2 className="text-center mb-12">Our Featured Products</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {data.map((product) => <Card key={product.id} product={product} />)}
    </div>
  </section>;
};

export default Featured;
