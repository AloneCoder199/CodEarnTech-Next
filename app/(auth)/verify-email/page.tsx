import { Suspense } from "react";
import { PageLoader } from "@/components/ui/page-loader";
import VerifyEmailPage from "@/components/auth/verify-email";


export default function Page() {
  return (
    <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
      <VerifyEmailPage/>
    </Suspense>
  );
}
