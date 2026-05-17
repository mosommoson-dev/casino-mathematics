import { Hero } from "@/components/hero/Hero";
import { ChapterMap } from "@/components/home/ChapterMap";
import { IntroNarrative } from "@/components/home/IntroNarrative";
import { KeyPrinciples } from "@/components/home/KeyPrinciples";
import { MathCanvas } from "@/components/home/MathCanvas";
import { CallToStudy } from "@/components/home/CallToStudy";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroNarrative />
      <KeyPrinciples />
      <MathCanvas />
      <ChapterMap />
      <CallToStudy />
    </>
  );
}
