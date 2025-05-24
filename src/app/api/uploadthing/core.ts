import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();



export const imgFileRouter = {
  
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https:
       */
    
      maxFileSize: "4MB",
      maxFileCount: 1
        },
    
  })
    
    .middleware(async () => {
      
      
      return {};
    })
    .onUploadComplete(async () => {
      

      
      return {  };
    }),
} satisfies FileRouter;

export type ImgFileRouter = typeof imgFileRouter;
