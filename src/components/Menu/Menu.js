import styles from "./Menu.module.css";
import cn from "classnames";
import { useState } from "react";
import MenuSVG from "../../images/menu.svg"
import header from "../../templates/Header/Header.module.css";
import {Button} from "../Button/Button";
import {Link} from "react-router-dom";
import {Input} from "../Input/Input";
import InputStyle from "../Input/Input.module.css";
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

     const handleCatalogClick = () => {
    const user = sessionStorage.getItem('user');

    if (!user) {
      window.location.href= "/login"
    } else {
      window.location.href= "/catalog"
    }
  }

  const handlAdvertClick = () => {
    const user = sessionStorage.getItem('user');

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
                    <Input placeholder={"Фильмы..."} type={"find"} className={cn(InputStyle.input,styles.input)}/>
                    <Button state={"default"} type={"primary"} onClick={handleCatalogClick}>Каталог</Button>
                    <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, styles.addButton)} onClick={handlAdvertClick}>Добавить статью</Button>
                </div>
            </>
          : null}
      </>
  )
};
