import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

export const filesQuery = gql`
  {
    files
  }
`;

export const Resized = () => {
  const { data, loading } = useQuery(filesQuery);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return null
    }
  return (
    <div className="droped-image">
      <p>Resized Images</p>  
      {data.files.map(x => (
        <img
          key={x}
          src={`https://storage.cloud.google.com/stone-semiotics-297911-images-output/beach-400x400-watermark.jpeg`}
          alt={x}
        />
      ))}
    </div>
  );
};
