import { Suspense } from "react";
import { PageLoader } from "@/components/ui/page-loader";
import AdminEnrollmentsPage from "@/components/shared/admin-enrollment";


export default function Page() {
  return (
    <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
      <AdminEnrollmentsPage/>
    </Suspense>
  );
}
