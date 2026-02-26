// hooks/use-payments.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";

// ✅ 1. Manually define types here to fix "Module not found" error
export interface IPayment {
  _id: string;
  enrollmentId: string;
  student: {
    name: string;
    email: string;
  };
  course: {
    title: string;
  };
  amount: number;
  method: string;
  transactionId: string;
  screenshotUrl: string;
  status: "pending" | "verified" | "rejected";
  createdAt: string;
  verifiedAt?: string;
  notes?: string;
}

export interface VerifyPaymentInput {
  status: "verified" | "rejected";
  notes?: string;
}

const PAYMENTS_KEY = "payments";

// ✅ 2. Hook to get all payments
export function usePayments(filters?: {
  status?: "pending" | "verified" | "rejected";
  studentId?: string;
  courseId?: string;
}) {
  return useQuery({
    queryKey: [PAYMENTS_KEY, filters],
    queryFn: async () => {
      const { data } = await api.get("/admin/payments", { params: filters });
      // Hum results ko 'data' object se nikaal rahe hain agar API structure waisa hai
      return (data.data || data) as IPayment[];
    },
  });
}

// ✅ 3. Hook to verify/reject payment
export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentId,
      input,
    }: {
      paymentId: string;
      input: VerifyPaymentInput;
    }) => {
      const { data } = await api.put(`/admin/payments`, {
        paymentId,
        ...input,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_KEY] });
      toast.success("Payment status updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to update payment status"
      );
    },
  });
}
