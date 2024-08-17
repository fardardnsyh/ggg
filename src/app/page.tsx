import { BrainCogIcon, EyeIcon, GlobeIcon, MonitorSmartphoneIcon, ServerCogIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import Image from "next/image";


const features=[
  {
    name: "Store your PDF Documents",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere.",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Responses",
    description:
      "Experience lightning-fast answers to your queries, ensuring you get the information you need instantly.",
    icon: ZapIcon,
  },
  {
    name: "Chat Memorisation",
    description:
      "Our intelligent chatbot remembers previous interactions, providing a seamless and personalized experience.",
    icon: BrainCogIcon,
  },
  {
    name: "Interactive PDF Viewer",
    description:
      "Engage with your PDFs like never before using our intuitive and interactive viewer.",
    icon: EyeIcon,
  },
  {
    name: "Cloud Backup",
    description:
      "Rest assured knowing your documents are safely backed up on the cloud, protected from loss or damage.",
    icon: ServerCogIcon,
  },
  {
    name: "Responsive Across Devices",
    description:
      "Access and chat with your PDFs seamlessly on any device, whether it's your desktop, tablet, or smartphone.",

    icon: MonitorSmartphoneIcon,
  },

]


export default function Home(){
  return (
       <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-[#ff7e5f]">
        <div className="bg-white py-20 sm:py-25 rounded-md drop-shadow-xl">
          <div className="flex flex-col justify-center items-center mx-auto max-w-7xl
          px-6 lg:px-8">
               <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="text-base font-semibold leading-7 text-gradient2">Your Interactive Documnet Companion</h2>

                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Chat with Your PDFs: <span className="text-gradient2">Intelligent Document</span> Conversations
                </p>

                <p className="mt-6 text-base leading-7 text-gray-600">
                  Introducing{" "}
                  <span className="font-bold text-gradient2">DocTalk.</span>
                    <br />
                    <br />Upload your document, and our chatbot will answer questions, summarize content, and answer all your Qs. Ideal for
                    everyone, <span className="text-gradient2">
                      DocTalk
                    </span>{" "}
                    turns static documents into{" "}
                    <span>enchancing productivity 10x fold effortlessly</span>
                </p>
               </div>
                
               <div className="flex space-x-4">
                <Button asChild className="mt-10">
                     <Link href="/dashboard">Get Started</Link>
                 </Button>

                <Button asChild className="mt-10">
                    <Link href="/sign-up">Sign-up</Link>
                   </Button>
                   </div>  
          </div>

         <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 flex justify-center relative">
          <Image
          alt="App Screenshot"
          src="/ss73.png"
          width={800}
          height={600}
          className="rounded-xl shadow-2xl ring-1 ring-gray-900/10"
        />
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent h-10 pointer-events-none" />
        </div>
       </div>

       <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-5 w-5 text-[#feb47b]"
                  />
                </dt>

                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        </div>
       </main>
  );
}