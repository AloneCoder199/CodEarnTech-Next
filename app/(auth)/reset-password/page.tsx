import ResetPasswordPage from "@/components/auth/resetpaswordmain";
import { Suspense } from "react";
import PageLoader from "@/components/ui/page-loader";
export default function resetPass () {
  return(
    <>
    <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
     <ResetPasswordPage/>
    </Suspense>
    </>
  )
}