import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

export const filesQuery = gql`
  {
    files
  }
`;

export const Resized = () => {
  return (
        <dev class="container">
         <div class="col text-left">
         <button type="button" class="btn btn-success mr-2">View Results</button>
         </div>
        </dev>
  );
};
