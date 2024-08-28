import React from "react";

interface SuccessAlert2Props {
  message: string;
}

const SuccessAlert2: React.FC<SuccessAlert2Props> = ({ message }) => {
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
      <p className="font-bold">Success</p>
      <p>{message}</p>
    </div>
  );
};

export default SuccessAlert2;