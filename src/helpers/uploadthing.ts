import {
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  import type { ImgFileRouter } from "@/app/api/uploadthing/core";
  
  export const UploadButton = (() => generateUploadButton<ImgFileRouter>())();
  export const UploadDropzone = generateUploadDropzone<ImgFileRouter>();
  