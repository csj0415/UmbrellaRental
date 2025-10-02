import { Button } from "@/components/ui/button";
import { Umbrella } from "lucide-react";

export default function Hero() {
  const scrollToRentalForm = () => {
    const rentalSection = document.getElementById('rental-form');
    rentalSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-chart-2">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary-foreground/10 backdrop-blur-sm">
            <Umbrella className="w-16 h-16 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 md:mb-6">
          우산 걱정 끝!
        </h1>
        <p className="text-lg md:text-2xl text-primary-foreground/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
          캠퍼스 곳곳에서 편하게 대여하고 반납하는<br className="hidden md:block" />
          학생을 위한 우산 대여 서비스
        </p>
        <Button 
          size="lg"
          variant="outline"
          onClick={scrollToRentalForm}
          className="bg-primary-foreground/95 hover:bg-primary-foreground text-primary border-0 backdrop-blur-sm text-base md:text-lg px-8 py-6"
          data-testid="button-scroll-to-form"
        >
          지금 바로 신청하기
        </Button>
      </div>
    </section>
  );
}
