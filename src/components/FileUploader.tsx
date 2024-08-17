"use client"
import {useDropzone} from 'react-dropzone'
import React, {useCallback, useEffect} from 'react'
import { CheckCircleIcon,CircleArrowDown, HammerIcon, RocketIcon, SaveIcon} from 'lucide-react'
import useUpload,{StatusText} from '../../hooks/useUpload'
import { useRouter } from 'next/navigation'
import useSubscription from '../../hooks/useSubscription'
import { useToast } from './ui/use-toast'


function FileUploader() {
  const {progress, status, fileId, handleUpload} = useUpload();
  const { isOverFileLimit, fileLoading } = useSubscription();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(()=>{
        if(fileId){
          router.push(`/dashboard/files/${fileId}`)
        }
  },[fileId, router])
    const onDrop = useCallback(async(acceptedFiles: File[]) => {
        // Do something with the files
        
        const file = acceptedFiles[0];

        if(file){
          if (!isOverFileLimit && !fileLoading) {
            await handleUpload(file);
          } else {
            toast({
              variant: "destructive",
              title: "Free Plan File Limit Reached",
              description:
                "You have reached the maximum number of files allowed for your account. Please upgrade to add more documents.",
            },
         
          );
          }
        }else{
            //do nothing..
            //toast...
        }

      }, [handleUpload, isOverFileLimit, fileLoading, toast]);
      
      const statusIcons: {
        [key in StatusText]: JSX.Element;
      } = {
        [StatusText.UPLOADING]: (
          <RocketIcon className="h-20 w-20 text-[#ff7e5f]" />
        ),
        [StatusText.UPLOADED]: (
          <CheckCircleIcon className="h-20 w-20 text-[#ff7e5f]" />
        ),
        [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-[#ff7e5f]" />,
        [StatusText.GENERATING]: (
          <HammerIcon className="h-20 w-20 text-[#ff7e5f] animate-bounce" />
        ),
      };
      

      const {getInputProps, getRootProps, isDragActive, isDragAccept, isFocused} = 
      useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
          'application/pdf': ['.pdf'],
        },
      });

  const uploadInProgress = progress != null && progress >= 0 && progress <= 100;    

  


  return (
    <div className='flex flex-col gap-4 items-center max-w-7xl mx-auto'>
        
        {/* Loading section */}
        {uploadInProgress &&(
          <div className='mt-32 flex flex-col justify-center items-center gap-5'>
            <div className={`radial-progress bg-[#feb47b] text-white border-[#ff7e5f] border-4 ${
              progress === 100 && "hidden"
            }`}
            role='progressbar'
            style={{
               "--value": progress,
               "--size" : "12rem",
               "--thickness": "1.3rem",
            }as React.CSSProperties}
            >
              {progress} %
            </div>

            {/* Render status Icon */}
            {
            // @ts-ignore
            statusIcons[status!]
          }

             {/* @ts-ignore */}
          <p className="text-[#ff7e5f]  animate-pulse">{status}</p>
          </div>
        )}

     {!uploadInProgress &&( 
      <div {...getRootProps()}
        className={`p-10 border-2 border-dashed mt-10 w-[90%] border-[#ff7e5f] text-[#ff7e5f] 
        rounded-lg h-96 flex items-center justify-center
        ${isFocused || isDragAccept ? 'bg-gray-300':'bg-gray-100'}`}
    >
    <input {...getInputProps()} />

    <div className="flex flex-col items-center justify-center">
    {
      isDragActive ?(
        <>
        <RocketIcon className='h-20 w-20 animate-ping'/>
        <p>Drop the files here ...</p>
        </>
      ) :(
        <>
        <CircleArrowDown className='h-20 w-20 animate-bounce cursor-pointer' />
        <p className='cursor-pointer'>Drag 'n' drop some files here, or click to select files</p>
        </>
      )
    }
    </div>
  </div>
     )}
  </div>
  )
}

export default FileUploader