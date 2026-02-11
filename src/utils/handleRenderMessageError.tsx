import React from "react";

export const handleRenderMessageError = (errorMessage: string): JSX.Element => {
  return <p className="text-danger md:text-12 text-14">{errorMessage}</p>;
};
