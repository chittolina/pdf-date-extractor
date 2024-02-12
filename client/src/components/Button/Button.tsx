import React from "react";
import "./Button.css";
import Spinner from "./Spinner";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  disabled = false,
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
    if (isLoading) {
      generatedClassName += " loading";
    }

    return generatedClassName;
  };
  return (
    <button
      className={generateClassName()}
      onClick={() => {
        if (!disabled) {
          onClick && onClick();
        }
      }}
      style={{ pointerEvents: isLoading ? "none" : "all" }}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};
