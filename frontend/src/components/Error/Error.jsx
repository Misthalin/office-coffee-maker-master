import React from "react";
import Button from "../Button/Button";

const Error = () => {
  return (
    <>
      <h2 className="text-center">Oops, something went wrong!</h2>
      <Button title="Click to reload" onClickEvent={() => window.location.reload(false)} variant="long" />
    </>
  );
};

export default Error;
