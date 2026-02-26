// hooks/use-courses.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ICourse } from "@/lib/data";
import { toast } from "sonner";

const COURSES_KEY = "courses";
export type CreateCourseInput = Omit<ICourse, 'id'>;
export type UpdateCourseInput = Partial<CreateCourseInput>;
// Get all courses with filters
export function useCourses(filters?: any) {
  return useQuery({
    queryKey: [COURSES_KEY, filters],
    queryFn: async () => {
      // ❌ Pehle ye tha: .get("/admin/courses")
      // ✅ Ab ye karein:
      const response = await api.get("/api/admin/courses", { params: filters });
      
      // Data extract karein (Aapke backend utility ke mutabiq)
      const resData = response.data?.data || response.data;
      const finalArray = resData.courses || resData || [];
      
      return finalArray as ICourse[];
    },
  });
}

// Get single course
export function useCourse(id: string) {
  return useQuery({
    queryKey: [COURSES_KEY, id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/courses/${id}`);
      return data as ICourse;
    },
    enabled: !!id,
  });
}

// Create course
// use-courses.ts mein useCreateCourse ko is tarah update karein:

// Create course
export function useCreateCourse() {
  const queryClient = useQueryClient();

  // ✅ Fix: Input type ko 'any' ya 'FormData' rakhein agar logic component se bhej rahe hain
  // Ya phir logic yahan handle karein:
  return useMutation({
    mutationFn: async (formData: FormData) => {
      // 🔥 IMPORTANT: Axios with multipart/form-data doesn't need manual boundary
      const { data } = await api.post("/api/admin/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create course";
      console.error("Mutation Error:", error);
      toast.error(message);
    },
  });
}

// Update course
export function useUpdateCourse(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateCourseInput) => {
      const { data } = await api.put(`/admin/courses/${id}`, input);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY] });
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY, id] });
      toast.success("Course updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    },
  });
}

// Soft delete course
export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/admin/courses/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY] });
      toast.success("Course deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete course");
    },
  });
}

// Add module to course
export function useAddModule(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleData: {
      title: string;
      description: string;
      order: number;
      isPreview: boolean;
    }) => {
      const { data } = await api.post(
        `/admin/courses/${courseId}/modules`,
        moduleData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY, courseId] });
      toast.success("Module added successfully");
    },
  });
}

// Schedule live class
export function useScheduleLiveClass(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (liveClassData: {
      title: string;
      description: string;
      meetingLink: string;
      meetingId?: string;
      password?: string;
      scheduledAt: string;
      duration: number;
    }) => {
      const { data } = await api.post(
        `/admin/courses/${courseId}/live-classes`,
        liveClassData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_KEY, courseId] });
      toast.success("Live class scheduled successfully");
    },
  });
}

// Manage coupons
export function useCourseCoupons(courseId: string) {
  return useQuery({
    queryKey: [COURSES_KEY, courseId, "coupons"],
    queryFn: async () => {
      const { data } = await api.get(`/admin/courses/${courseId}/coupons`);
      return data;
    },
    enabled: !!courseId,
  });
}

export function useAddCoupon(courseId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (couponData: {
      code: string;
      discountType: "percentage" | "fixed";
      discountValue: number;
      validFrom: string;
      validUntil: string;
      maxUses?: number;
      description?: string;
    }) => {
      const { data } = await api.post(
        `/admin/courses/${courseId}/coupons`,
        couponData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COURSES_KEY, courseId, "coupons"],
      });
      toast.success("Coupon added successfully");
    },
  });
}