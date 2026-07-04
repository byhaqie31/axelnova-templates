import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IntroBand } from "@/components/IntroBand";
import { Ingredients } from "@/components/Ingredients";
import { ChooseWeapon } from "@/components/ChooseWeapon";
import { WhyBucks } from "@/components/WhyBucks";
import { BuyPack } from "@/components/BuyPack";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <IntroBand />
        <Ingredients />
        <ChooseWeapon />
        <WhyBucks />
        <BuyPack />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
