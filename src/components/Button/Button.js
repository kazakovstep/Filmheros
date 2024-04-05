import cn from "classnames"
import { useState } from "react"
import styles from "./Button.module.css"
export const Button = ({
  type,
  state,
  icon_url,
  icon_url_hover,
  children,
  className,
  ...props
}) => {
  const [, setIsClicked] = useState(false)

  const handleClick = () => {
    if (state === "disabled") {
      return
    }
    setIsClicked(true)
  }

  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className={cn(styles.button, className, {
        [styles.default]: state === "default",
        [styles.click]: state === "click",
        [styles.disabled]: state === "disabled",
        "disabled primary": state === "disabled" && type === "primary",
        "disabled secondary": state === "disabled" && type === "secondary",
        "disabled text": state === "disabled" && type === "text",
        "disabled back": state === "disabled" && type === "back",
        "default text": state === "default" && type === "text",
        [styles.primary]: type === "primary",
        [styles.secondary]: type === "secondary",
        [styles.text]: type === "text",
        [styles.back]: type === "back",
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      {...props}
    >
      {!icon_url || icon_url === "" || icon_url === undefined ? (
        <></>
      ) : (
        <img
          src={isHovered ? icon_url_hover : icon_url}
          alt={"icon"}
        />
      )}
      {children}
    </button>
  )
}
