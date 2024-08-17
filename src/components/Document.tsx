"use client"

import { useRouter } from "next/navigation";
import byteSize from "byte-size";
import useSubscription from "../../hooks/useSubscription";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { DownloadCloud, Trash2Icon } from "lucide-react";
import { space } from "postcss/lib/list";
import { deleteDocument } from "../../actions/deleteDocument";

function Document({
    id,
    name,
    downloadUrl,
    size
}:{
    id: string;
    name: string;
    downloadUrl: string;
    size: number;
}) {

    const router = useRouter();

    const {hasActiveMembership} = useSubscription();
    const [ isDeleting, startTransaction] = useTransition();

  return (
    <div className="flex flex-col w-64 h-80 rounder-xl bg-white drop-shadow-md justify-between p-4 transition-all
    transform hover:scale-105 hover:bg-[#feb47b] hover:text-white cursor-pointer group">
        <div className="flex-1"
          onClick={()=>{
            router.push(`/dashboard/files/${id}`);
        }}>
            <p className="font-semibold line-clamp-2">{name}</p>
            <p className="text-sm text-gray-500 group-hover:text-gray-100">
                {/* render size in kbs */}
                {byteSize(size).value} KB
            </p>
        </div>

        {/* Action */}
        <div className="flex space-x-2 justify-end">
            
            <Button variant="outline"
             disabled={isDeleting|| !hasActiveMembership}
             onClick={() => {
                const prompt = window.confirm(
                    "Are you sure you want to delete this document?"
                );
                if(prompt){
                    startTransaction(async() => {
                           await deleteDocument(id);
                    })
                }
             }}
            >
                <Trash2Icon className="h-6 w-6 text-[#ff7e5f]"/>
                {!hasActiveMembership && (
                    <span className="text-red-500 ml-2">PRO Feature</span>
                )}
            </Button>

            <Button variant="outline" asChild>
                <a href={downloadUrl}>
                    <DownloadCloud className="h-6 w-6 text-[#ff7e5f]"/>
                </a>
            </Button>
        </div>
        <div>
            
        </div>
        </div>
  )
}

export default Document