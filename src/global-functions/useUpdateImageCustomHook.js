import React,{useState} from 'react'
import  { globalFunctions } from './GlobalFunctions';

function useCustomGenerateUrls() {
    const [loading,setLoading]=useState(false);
 
  
    const generateLinks=async(selectedFiles)=>{
    // debugger
    setLoading(true)
    
    const allUrls=await globalFunctions.handleUpload(selectedFiles);
    console.log("wait------------------------")
    setLoading(false)
    return allUrls
      
  }

  
  return{ loading,generateLinks}
  
}

export default useCustomGenerateUrls