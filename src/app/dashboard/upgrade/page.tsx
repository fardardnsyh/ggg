"use client"

import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import useSubscription from '../../../../hooks/useSubscription';
import { useTransition } from 'react';
import getStripe from '@/lib/stripe-js';
import { createCheckoutSession } from '../../../../actions/createCheckoutSession';
import { createStripePortal } from '../../../../actions/createStripePortal';

export type UserDetails ={
  email:string;
  name: string;
}


const PricingPages = () => {
  const {user} = useUser();
  const router = useRouter();

//pull in user's subscriptions
const {hasActiveMembership, loading} = useSubscription();
const [isPending, startTransition] = useTransition();

const handleUpgrade = ()=>{
  if(!user) return;

  const userDetails:UserDetails = {
    email : user.primaryEmailAddress?.toString()!,
    name : user.fullName!
  };

  startTransition(async () =>{
    //Load 
    
    const stripe = await getStripe()

    if(hasActiveMembership){
      //create stripe portal
      const stripePortalUrl = await createStripePortal();
        return router.push(stripePortalUrl);
    }

    const sessionId = await createCheckoutSession(userDetails);

    await stripe?.redirectToCheckout({
      sessionId,
    })
  })
}



  return (
    <div>
      <div className='py-10 sm:py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className="text-[#ff7e5f] text-base font-semibold leading-7">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Supercharge your Document Companion
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
          choose an affodable plan thats packed with best features for interacting with your PDFs, 
          enchancing productivity, and streamliming your workflow.
        </p>


        <div className='max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl'>
          {/* FREE */}
          <div className='ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl'>
            <h3 className="text-lg font-semibold leading-8 text-gray-900">
              Starter Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Explore Core Features at NO Cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                Free
              </span>
            </p>

            <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-gray-600'>
              <li className='flex gap-x-3'>
                <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
                2 Documents
              </li>
              <li className='flex gap-x-3'>
              <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
              Up to 3 messages per document
              </li>
              <li className='flex gap-x-3'>
              <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
              Try out the AI Chat Functionality
              </li>
            </ul>
          </div>

          {/* PRO */}
          <div className="ring-2 ring-[#ff7e5f] rounded-3xl p-8">
            <h3 className="text-lg font-semibold leading-8 text-[#ff7e5f]">
              Pro Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#ff7e5f]">
              Maximize Productivity with PRO Features
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className='text-4xl font-bold tracking-tight text-gray-900'>
                $5.99
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/ month</span>
            </p>


            <Button className='bg-[#ff7e5f] w-full text-white shadow-sm
            hover:bg-[#feb47b] mt-6 block rounded-md px-3 py-2
            text-center text-sm font-semibold leading-6 focus-visible:outline
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7e5f]'
            disabled={loading || isPending}
            onClick={handleUpgrade}
            >
               {isPending || loading 
               ? "Loading..." 
               : hasActiveMembership 
               ? "Manage Plan" 
               : "Upgrade to Pro"}
            </Button>

            <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-[#ff7e5f]'>

              <li className="flex gap-x-3">
                <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
                Store upto 20 Documents
              </li>

              <li className="flex gap-x-3">
                <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
                 Ability to Delete Documents
              </li>

              <li className="flex gap-x-3">
                <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
                Up to 100 messages per Document
              </li>

              <li className="flex gap-x-3">
                <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
                Full Power AI Chat Functionality with Memory Recall
              </li>

              <li className="flex gap-x-3">
                <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
                Advanced analytics
              </li>

              <li className="flex gap-x-3">
                <CheckIcon className='h-6 w-5 flex-none text-[#ff7e5f]'/>
                24-hour support response time
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default PricingPages