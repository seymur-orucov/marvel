import error from "../../resources/img/error.gif";

export const ErrorMessage = () => {
  return (
    <img
      src={error}
      style={{ height: "260px", width: "100%", objectFit: "contain" }}
      alt="Error"
    />
  );
};
