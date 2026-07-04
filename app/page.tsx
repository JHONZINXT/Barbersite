import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProductCarousel from "@/components/ProductCarousel";
import TransformGallery from "@/components/TransformGallery";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <ProductCarousel />
      <TransformGallery />
      <Blog />
      <Testimonials />
      <CTA />
    </main>
  );
}
