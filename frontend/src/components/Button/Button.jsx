import "./Button.css";
const Button = ({ variant, onClickEvent, title, disabled, buttonType }) => {
  return (
    <button className={`btn ${variant ? variant : ""} ${disabled ? 'disabled' : ""}`} onClick={onClickEvent} disabled={disabled} type={buttonType}>
      {title}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  variant: undefined,
  disabled: false,
  onClickEvent: undefined,
  buttonType: "button"
};
