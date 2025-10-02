import Hero from "@/components/Hero";
import WhyRent from "@/components/WhyRent";
import RentalForm from "@/components/RentalForm";
import AdvertiserSection from "@/components/AdvertiserSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyRent />
      <RentalForm />
      <AdvertiserSection />
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 우산대여. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
