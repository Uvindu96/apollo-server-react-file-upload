import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

export const filesQuery = gql`
  {
    files
  }
`;

export const Files = () => {
  const { data, loading } = useQuery(filesQuery);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return null
    }
  return (
    <div>
      {data.files.map(x => (
        <img
          style={{ width: 200 }}
          key={x}
          src={`https://storage.cloud.google.com/stone-semiotics-297911-images-input/${x}`}
          alt={x}
        />
      ))}
    </div>
  );
};
