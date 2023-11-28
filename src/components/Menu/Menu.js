import styles from "./Menu.module.css";
import cn from "classnames";
import { useState } from "react";
import MenuSVG from "../../images/menu.svg"
import {Button} from "../Button/Button";
import buttonStyle from "../Button/Button.module.css";
export const Menu = ({
  children,
  className,
  ...props
}) => {

    const [isClicked, setClicked] = useState(false);

    const handleIsClicked = () => {
        setClicked(!isClicked)
    }
    const user = sessionStorage.getItem('user');
    const handleCatalogClick = () => {
        if (!user) {
          window.location.href= "/login"
        } else {
          window.location.href= "/catalog"
        }
    }

    const handlAdvertClick = () => {
        if (!user) {
            window.location.href= "/login"
        } else {
            window.location.href= "/advert"
        }
    }


  return(
      <>
          <img src={MenuSVG} alt={"menu"} width={40} height={40} onClick={handleIsClicked}
          className={cn({
              [styles.img]: !isClicked,
              [styles.img_clicked]: isClicked
          })}/>
          {isClicked ?
            <>
                <div className={styles.menu}>
                    <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, styles.addButton)} onClick={handleCatalogClick}>Каталог</Button>
                    <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, styles.addButton)} onClick={handlAdvertClick}>{user ? "Добавить статью" : "Войти"}</Button>
                </div>
            </>
          : null}
      </>
  )
};
