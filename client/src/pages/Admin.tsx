import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { UmbrellaRental, AdvertiserApplication } from "@shared/schema";
import { LogOut, Umbrella, Megaphone } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => apiRequest("POST", "/api/admin/login", data),
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({
        title: "로그인 성공",
        description: "관리자 페이지에 오신 것을 환영합니다.",
      });
    },
    onError: () => {
      toast({
        title: "로그인 실패",
        description: "아이디 또는 비밀번호를 확인해주세요.",
        variant: "destructive",
      });
    },
  });

  const { data: rentals = [] } = useQuery<UmbrellaRental[]>({
    queryKey: ["/api/rentals"],
    enabled: isAuthenticated,
  });

  const { data: advertisers = [] } = useQuery<AdvertiserApplication[]>({
    queryKey: ["/api/advertisers"],
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    form.reset();
    toast({
      title: "로그아웃",
      description: "로그아웃되었습니다.",
    });
  };

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-card">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Umbrella className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              관리자 로그인
            </h1>
            <p className="text-muted-foreground">
              우산대여 관리 시스템
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" data-testid="input-username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" data-testid="input-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={loginMutation.isPending}
                data-testid="button-login"
              >
                {loginMutation.isPending ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Umbrella className="w-6 h-6 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              우산대여 관리자
            </h1>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="rentals" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2" data-testid="tabs-admin">
            <TabsTrigger value="rentals" data-testid="tab-rentals">
              <Umbrella className="w-4 h-4 mr-2" />
              우산 대여 신청
            </TabsTrigger>
            <TabsTrigger value="advertisers" data-testid="tab-advertisers">
              <Megaphone className="w-4 h-4 mr-2" />
              광고 신청
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rentals" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                우산 대여 신청 목록 ({rentals.length}건)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">이름</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">학과</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">학번</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">전화번호</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">이메일</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">대여일</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">반납일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentals.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-muted-foreground">
                          아직 신청 내역이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      rentals.map((rental) => (
                        <tr key={rental.id} className="border-b hover-elevate" data-testid={`row-rental-${rental.id}`}>
                          <td className="py-3 px-2 text-sm text-foreground">{rental.name}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{rental.department}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{rental.studentId}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{rental.phone}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{rental.email}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{rental.rentalDate}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{rental.returnDate}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advertisers" className="mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                광고 신청 목록 ({advertisers.length}건)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">기업명</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">대표자명</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">전화번호</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-foreground">이메일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advertisers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-muted-foreground">
                          아직 신청 내역이 없습니다.
                        </td>
                      </tr>
                    ) : (
                      advertisers.map((advertiser) => (
                        <tr key={advertiser.id} className="border-b hover-elevate" data-testid={`row-advertiser-${advertiser.id}`}>
                          <td className="py-3 px-2 text-sm text-foreground">{advertiser.companyName}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{advertiser.representative}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{advertiser.phone}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">{advertiser.email}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
