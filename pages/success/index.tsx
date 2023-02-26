import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import Link from "next/link";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efeutada!</h1>

      <ImageContainer></ImageContainer>

      <p>
        Daleee <strong>meu rei</strong>, tua camiseta{" "}
        <strong>sei lá o nome</strong>, já tá a caminho da tua casa.
      </p>

      <Link href={""}>Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}
