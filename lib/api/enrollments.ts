// lib/api/enrollments.ts
import { EnrollmentFormData, EnrollmentResponse } from '@/types/enrollment';

const API_BASE = '/api';

export async function createEnrollment(formData: EnrollmentFormData): Promise<EnrollmentResponse> {
  const data = new FormData();
  
  // Append all fields
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'receipt' && value instanceof File) {
        data.append('receipt', value);
      } else {
        data.append(key, String(value));
      }
    }
  });

  const response = await fetch(`${API_BASE}/enrollments`, {
    method: 'POST',
    body: data,
  });

  return response.json();
}

export async function checkEnrollmentStatus(email: string, courseId: string) {
  const response = await fetch(
    `${API_BASE}/enrollments/check?email=${encodeURIComponent(email)}&courseId=${courseId}`
  );
  return response.json();
}

export async function getMyEnrollments(email: string) {
  const response = await fetch(
    `${API_BASE}/enrollments/my?email=${encodeURIComponent(email)}`
  );
  return response.json();
}

export async function getCourseBySlug(slug: string) {
  const response = await fetch(`${API_BASE}/courses/${slug}`);
  return response.json();
}