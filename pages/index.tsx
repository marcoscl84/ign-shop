import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";

import { useKeenSlider } from "keen-slider/react";

import camiseta1 from "../public/images/camiseta-1.png";
import camiseta2 from "../public/images/camiseta-2.png";
import camiseta3 from "../public/images/camiseta-3.png";
import camiseta4 from "../public/images/camiseta-4.png";

import "keen-slider/keen-slider.min.css";
import { stripe } from "../lib/stripe";
import { GetServerSideProps, GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className={"keen-slider"}>
      {/* <pre>{JSON.stringify(products)}</pre> */}

      {products.map((product) => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} alt={""} width={520} height={480} />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        );
      })}
    </HomeContainer>
  );
}

// getStaticProps cria a versão estática em cache para melhorar a performance da pág,
// ao invés de getServerSideProps que revalida a cada carregamento da pág.
// Só é possível utilizar quando não houver necessidade de requisição de informações dinâmicas do servidor
// (quando não usa cookies, quando não há usuário logado, ou qualquer dado em tempo real...)
export const getStaticProps: GetStaticProps = async () => {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      // url: product.url,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format((price.unit_amount as number) / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas,
  };
};
