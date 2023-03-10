import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra feita | Ign Shop</title>

        <meta name="robots" content="noindex"></meta>
      </Head>

      <SuccessContainer>
        <h1>Compra efeutada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} alt={""} width={120} height={110} />
        </ImageContainer>

        <p>
          Daleee <strong>{customerName}</strong>, tua camiseta{" "}
          <strong>{product.name}</strong>, já tá a caminho da tua casa.
        </p>

        <Link href={""}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  console.log(session);
  console.log(session.line_items?.data);

  const customerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};

// Fetch pode ser feito de trÊs formas:
//  - Client side (useEffect) -> não utilizado por algumas restrições na chamada da api.
//  - getServerSideProps -> opção ideal
//  - getStaticProps -> não faz sentido nesse caso porque viria sempre os mesmos dados na exibição da página
