import RentalForm from '../RentalForm';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function RentalFormExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <RentalForm />
    </QueryClientProvider>
  );
}
