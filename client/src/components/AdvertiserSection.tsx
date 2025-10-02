import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertAdvertiserApplicationSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Megaphone, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const formSchema = insertAdvertiserApplicationSchema.extend({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, "올바른 전화번호를 입력해주세요"),
});

type FormData = z.infer<typeof formSchema>;

const benefits = [
  "캠퍼스 내 타겟 마케팅으로 높은 광고 효과",
  "대학생 고객층에 직접 브랜드 노출",
  "합리적인 광고 비용과 효율적인 운영",
];

export default function AdvertiserSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      representative: "",
      phone: "",
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("POST", "/api/advertisers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/advertisers"] });
      toast({
        title: "신청 완료!",
        description: "광고 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "신청 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-accent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Megaphone className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            광고주를 모집합니다
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            대학생들에게 직접 닿는 광고 효과를 경험하세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <Card className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                광고 파트너십의 이점
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-chart-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
              광고 신청
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>기업명</FormLabel>
                      <FormControl>
                        <Input placeholder="(주)우산대여" data-testid="input-company-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="representative"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>대표자명</FormLabel>
                      <FormControl>
                        <Input placeholder="김대표" data-testid="input-representative" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전화번호</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" data-testid="input-advertiser-phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@company.com" data-testid="input-advertiser-email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={mutation.isPending}
                  data-testid="button-submit-advertiser"
                >
                  {mutation.isPending ? "신청 중..." : "광고 신청하기"}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
}
