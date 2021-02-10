import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "./Files";
import style from "/home/uvindu/FypFrontEnd/apollo-server-react-file-upload/web/src/style.css"

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
export const Nav = () => {
  return(
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="#">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>
</nav>
  );
}
export const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }]
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="drop-message" {...getRootProps()}>
      <h1>Serverless Image Processor</h1>
      <div className="upload-icon"></div>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <dev class="container">
         <div class="col text-center">
         <button type="button" class="btn btn-primary">Upload image</button>
         </div>
        </dev>
      )}
    </div>
  );
};

