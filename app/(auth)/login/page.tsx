import LoginForm from '@/components/auth/LoginForm';
import { Suspense } from "react";
import PageLoader from '@/components/ui/page-loader';
export default function LoginPage() {
  return (
      <> <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
                 <LoginForm />
                  </Suspense></>
       
              
            
      
  );
}