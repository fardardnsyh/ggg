"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2Icon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import useSubscription from "../../hooks/useSubscription";
import { createStripePortal } from "../../actions/createStripePortal";

function UpgradeButton() {
  const { hasActiveMembership, loading } = useSubscription();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAccount = () => {
    startTransition(async () => {
      const stripePortalUrl = await createStripePortal();
      router.push(stripePortalUrl);
    });
  };

  if (!hasActiveMembership && !loading)
    return (
      <Button asChild variant="default" className="border-[#ff7e5f]">
        <Link href="/dashboard/upgrade">
          Upgrade <StarIcon className="ml-3 fill-[#ff7e5f] text-white" />
        </Link>
      </Button>
    );

  if (loading)
    return (
      <Button variant="default" className="border-[#ff7e5f]">
        <Loader2Icon className="animate-spin" />
      </Button>
    );

  return (
    <Button
      onClick={handleAccount}
      disabled={isPending}
      variant="default"
      className="border-[#ff7e5f] bg-[#ff7e5f]"
    >
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <p>
          <span className="font-extrabold">PRO </span>
          Account
        </p>
      )}
    </Button>
  );
}
export default UpgradeButton;