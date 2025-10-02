import AdvertiserSection from '../AdvertiserSection';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function AdvertiserSectionExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdvertiserSection />
    </QueryClientProvider>
  );
}
