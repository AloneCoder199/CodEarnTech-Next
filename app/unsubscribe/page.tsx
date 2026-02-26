import { Suspense } from "react";
import { PageLoader } from "@/components/ui/page-loader";
import UnsubscribePage from "@/components/shared/un-subscribe";


export default function Page() {
  return (
    <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
      <UnsubscribePage/>
    </Suspense>
  );
}
