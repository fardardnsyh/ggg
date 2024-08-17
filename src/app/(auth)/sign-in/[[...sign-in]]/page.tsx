import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return( 
    <div className="flex items-center justify-center h-screen w-full">
           <SignIn/>
    </div>
  

);
}


// import { SignIn } from "@clerk/nextjs";

// export default function CustomSignInPage() {
//   return(
//     <div className="flex items-center justify-center h-screen w-full bg-gray-100">
//       <div className="p-8 bg-white rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Sign In to Your Account</h1>
//         <SignIn
//           appearance={{
//             elements: {
//               card: 'shadow-none border rounded-lg p-6',
//               headerTitle: 'text-lg font-semibold',
//               input: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
//               button: 'bg-indigo-500 text-white hover:bg-indigo-600',
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }
