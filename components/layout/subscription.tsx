import { SubscriptionForm } from "../subscription-form";

/**
 * SubscribeSection - A professional call-to-action section 
 * for newsletter signups.
 */
export default function SubscribeSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading & Subtext */}
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Stay in the loop
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
          Get the latest articles, tutorials, and insights delivered straight to your inbox. 
          No spam, unsubscribe anytime.
        </p>
        
        {/* Form Component */}
        <div className="flex justify-center">
          <SubscriptionForm />
        </div>
        
        {/* Social Proof/Footer Text */}
        <p className="text-xs text-muted-foreground mt-6">
          Join <span className="font-semibold text-foreground text-sm">5,000+</span> developers. 
          Weekly updates, no spam.
        </p>
      </div>
    </section>
  );
}
