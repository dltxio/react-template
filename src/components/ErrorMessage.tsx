type Props = {
  error: any;
  isHidden?: boolean;
};

const ErrorMessage = ({ error, isHidden }: Props) => {
  let message = error;
  const data = error?.response?.data;

  if (typeof error !== "string") {
    message = data?.error || error?.message || error;
  }
  if (typeof data === "string" && data) {
    message = data;
  }
  return error && !isHidden ? (
    <div className="alert alert-error">{message}</div>
  ) : null;
};

export default ErrorMessage;
