import React, { Dispatch, FunctionComponent, useCallback, useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import spheron from '../public/icon-spheron-network.png'

const Dropzonee: FunctionComponent<{ setFile: Dispatch<any> }> = ({ setFile }) => {
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleFileSelection = async () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/jpeg, image/png'; // Specify accepted file types
      fileInput.onchange = async (event) => {
        const selectedFile = (event.target as HTMLInputElement).files?.[0];
        if (selectedFile) {
          try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            const apiEndpoint = 'https://abhishek3.onrender.com/upload/file';
            const response = await axios.post(apiEndpoint, formData);

            if (response.status === 200) {
              alert("File successfully uploaded!");
              const apiUrl = 'https://abhishek3.onrender.com/api/upload';
              const responseData = await axios.get(apiUrl);
              console.log(responseData);
              setFile(responseData.data.url);
            } else {
              alert("Upload failed");
            }
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      };
      // Trigger the file input dialog when the element is clicked
      fileInput.click();
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const { getRootProps, isDragReject } = useDropzone({
    onDrop: () => {}, // Clear onDrop, as we handle it in handleFileSelection
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'] 
    }
  });

  return (
    <div className="h-[200px] w-full glassmorphism flex justify-center items-center">
      <div
        id="dropzone"
        {...getRootProps()}
        onClick={handleFileSelection} // Call handleFileSelection when the drop zone is clicked
        className={` w-[90%] md:w-[70%] h-[100px] border-4 transition glasmorphism border-dashed flex justify-center items-center ${isDragReject ? "border-green-500" : "border-red-500"}`}
      >
        <div className="flex flex-col justify-center items-center">
          {isDragReject ? (
            <p className="text-[1.2em] font-[600]">Only JPG and PNG files allowed.</p>
          ) : (
            <div className="flex gap-3"> 
              <p className="text-[1em] md:text-[1.6em] font-[600] text-white">Drag and drop or click to upload </p>
              <Image width={30} src={spheron} alt="logo"></Image> 
            </div>
          )}
        </div>
      </div>
      <div id="response">{responseText}</div>
    </div>
  );
};

export default Dropzonee;
