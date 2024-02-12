interface Props {
  text: string;
  className?: string;
}

export const ErrorAlert = ({ text, className }: Props) => {
  return (
    <div
      className={`${
        className || ""
      } text-red-700 border border-solid border-red-700 rounded-lg text-sm`}
      role="alert"
    >
      <p>{text}</p>
    </div>
  );
};
