import Image from "next/image";
import { HomeContainer, Product } from "./home";

import { useKeenSlider } from 'keen-slider/react'


import camiseta1 from "../public/images/camiseta-1.png";
import camiseta2 from "../public/images/camiseta-2.png";
import camiseta3 from "../public/images/camiseta-3.png";
import camiseta4 from "../public/images/camiseta-4.png";

import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe";
import { GetServerSideProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageURL: string;
    price: number
  }[]
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className={"keen-slider"}>
      <pre>{JSON.stringify(products)}</pre>

      {products.map(product => {
        return(
          <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imageURL} alt={""} width={520} height={480} />
            <footer>
              <strong>{product.name}</strong>
              <span>R$ {product.price}</span>
            </footer>
          </Product>
        )
      })}
      

      
    </HomeContainer>
  );
}


export const getServerSideProps: GetServerSideProps = async () => {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  

  console.log(response.data)
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      // url: product.url,
      price: price.unit_amount as number / 100
    }    
  })

  return {
    props: {
      products
    }
  }
}