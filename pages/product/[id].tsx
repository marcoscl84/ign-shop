import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetailsContainer,
} from "../../styles/pages/product";

export default function Product1() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetailsContainer>
        <h1>Camiseta x</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ratione
          ad sit! Dolorem quaerat iste dolor earum eveniet consectetur ipsam,
          deleniti labore expedita corporis ea magnam, veniam quia iure. Cum!
        </p>

        <button>Comprar agora</button>
      </ProductDetailsContainer>
    </ProductContainer>
  );
}
