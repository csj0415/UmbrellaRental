import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertUmbrellaRentalSchema } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { z } from "zod";

const formSchema = insertUmbrellaRentalSchema.extend({
  rentalDate: z.string().min(1, "대여 날짜를 선택해주세요"),
  returnDate: z.string().min(1, "반납 날짜를 선택해주세요"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, "올바른 전화번호를 입력해주세요"),
});

type FormData = z.infer<typeof formSchema>;

export default function RentalForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rentalDate, setRentalDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      studentId: "",
      phone: "",
      rentalDate: "",
      returnDate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => apiRequest("POST", "/api/rentals", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rentals"] });
      toast({
        title: "신청 완료!",
        description: "우산 대여 신청이 성공적으로 접수되었습니다.",
      });
      form.reset();
      setRentalDate(undefined);
      setReturnDate(undefined);
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
    <section id="rental-form" className="py-16 md:py-24 px-4 bg-card">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            우산 대여 신청
          </h2>
          <p className="text-lg text-muted-foreground">
            간단한 정보만 입력하면 바로 대여 가능합니다
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">대여 정보</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rentalDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>대여 날짜</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                data-testid="button-rental-date"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {rentalDate ? format(rentalDate, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={rentalDate}
                              onSelect={(date) => {
                                setRentalDate(date);
                                field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                              }}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="returnDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>반납 날짜</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                data-testid="button-return-date"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {returnDate ? format(returnDate, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={returnDate}
                              onSelect={(date) => {
                                setReturnDate(date);
                                field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                              }}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold text-foreground">개인 정보</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" data-testid="input-name" {...field} />
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
                        <Input type="email" placeholder="student@university.ac.kr" data-testid="input-email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>학과</FormLabel>
                        <FormControl>
                          <Input placeholder="컴퓨터공학과" data-testid="input-department" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>학번</FormLabel>
                        <FormControl>
                          <Input placeholder="2021123456" data-testid="input-student-id" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전화번호</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" data-testid="input-phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto md:min-w-[200px]"
                disabled={mutation.isPending}
                data-testid="button-submit-rental"
              >
                {mutation.isPending ? "신청 중..." : "신청하기"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
