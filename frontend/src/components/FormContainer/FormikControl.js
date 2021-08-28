/** @format */

import React from "react";
import Input from "./Input";
import FileUpload from "./FileUpload";

const FormikControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;

    case "fileUpload":
      return <FileUpload {...rest} />;

    default:
      return null;
  }
};

export default FormikControl;
