import React, { useState ,useEffect} from 'react';
import { Cloudinary } from 'cloudinary-core';

const FileUpload = ({setLoadApi,setTempProducts,tempProducts,productList,setUrl,setProductList,handleProductSubmit,draggerFileList, setDraggerFileList,loadApi}) => {

  const uploadImageInCloudinary=async(selectedFile)=>{
    let temp=[]
    const uploadPromises = async()=>{
    
    const linkVariable=await  selectedFile.map(async (file) => {
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
  
        return  await fetch('https://api.cloudinary.com/v1_1/dxhqcov11/image/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const cloudinary =new Cloudinary({ cloud_name: 'dxhqcov11' });
            const imageUrl = cloudinary.url(data.public_id);
            temp.push({imageUrl,name:file.name})
            return {productImage:imageUrl,productName:file.name}
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            return null;
          });
      })
    return linkVariable;
    };
  // debugger;
  const uploadReturn=await uploadPromises()
  Promise.all(uploadReturn)
  .then((uploadedImages) => {
    setUrl(uploadedImages)
    setTempProducts([])
    setDraggerFileList([])
    setLoadApi(false)
    return uploadedImages;
    // Perform any further actions with the image URLs
  })
  .catch((error) => {
    console.error('Error uploading files:', error);
  });
  
   
  }
  const generateFileLink=(data)=>{
    const files = Promise.all(
      data.map((image) =>
        fetch(image.image)
          .then((response) => response.blob())
          .then((blob) => new File([blob], image.name, { type: blob.type }))
      )
    );
    
    files
      .then((fileList) => {
        // Use the fileList for upload or any other required operation
        // For example, you can pass it to an upload function
        // debugger
        uploadImageInCloudinary(fileList);
      })
      .catch((error) => {
        console.error('Error converting image URLs to files:', error);
      });
  }
  const handleUpload = (selectedFile) => {
    console.log("selectedfile===",selectedFile)

    generateFileLink(selectedFile)

    
  }
  
useEffect(() => {
 if(tempProducts?.length>0){
    handleUpload(tempProducts)
    
 }
}, [loadApi])

  return (
    ""
  );
};

export default FileUpload;
