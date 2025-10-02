import { Card } from "@/components/ui/card";
import { Wallet, MapPin, Cloud } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "비 올 때마다 우산 사기? 이제 그만!",
    description: "갑자기 내리는 비에도 걱정 없이 편리하게 우산을 대여하세요."
  },
  {
    icon: MapPin,
    title: "캠퍼스 곳곳에서 편하게 대여 & 반납",
    description: "학교 곳곳에 위치한 대여소에서 자유롭게 빌리고 반납하세요."
  },
  {
    icon: Wallet,
    title: "학생 친화적 가격으로 부담 없이",
    description: "합리적인 가격으로 경제적 부담 없이 이용할 수 있습니다."
  }
];

export default function WhyRent() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            왜 우산을 대여해야 할까요?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            우산대여 서비스가 캠퍼스 생활을 더 편리하게 만들어드립니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 md:p-8 hover-elevate" data-testid={`card-feature-${index}`}>
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-lg bg-primary/10 mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
