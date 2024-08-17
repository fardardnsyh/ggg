export const dynamic = "froce-dynamic";
import Documents from "@/components/Documents";

function Dashboard(){
    return <div className="h-full max-w-4xl mx-auto">
        <h1 className="text-3xl p-5 bg-gray-100 font-extralight text-[#ff7e5f]">
            My Documents
            </h1>
        
        
        <Documents/>
        </div>
}

export default Dashboard;