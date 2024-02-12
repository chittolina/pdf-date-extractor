import React from "react";
import "./index.css";
import Spinner from "./Spinner";

interface Props {
  children: React.ReactNode;
  inverted?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  isLoading = false,
  inverted = false,
  onClick,
  className,
}: Props) => {
  const generateClassName = () => {
    let generatedClassName = "button";
    if (className) {
      generatedClassName += ` ${className}`;
    }
    if (inverted) {
      generatedClassName += " inverted";
    }
    return generatedClassName;
  };
  return (
    <button
      className={generateClassName()}
      onClick={onClick}
      style={{ pointerEvents: isLoading ? "none" : "all" }}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
