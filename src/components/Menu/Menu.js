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

    const [isCatalog, setIsCatalog] = useState(false);

    const handleIsCatalog = () => {
        setIsCatalog(!isCatalog)
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
                    <Button state={"default"} type={"text"} className={cn(header.textButton, className)} onClick={handleIsCatalog}>Каталог</Button>
                    <Input placeholder={"Фильмы..."} type={"find"} className={cn(InputStyle.input,styles.input)}/>
                    <Button state={"default"} type={"text"} className={cn(header.textButton)}>Новости</Button>
                    <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, styles.addButton)}>Добавить статью</Button>
                </div>
                {
                    isCatalog ?
                        <>
                            <div className={cn(styles.menu, styles.catalog)}>
                               <Link to={"/superheros"}><Button
                                state={"default"}
                                type={"text"}
                                className={cn(header.textButton, className)}
                              >
                                Супергерои
                              </Button></Link>
                              <Link to={"/shooters"}><Button
                                state={"default"}
                                type={"text"}
                                className={cn(header.textButton, className)}
                              >
                                Персонажи боевиков
                              </Button></Link>
                              <Link to={"/comedy"}><Button
                                state={"default"}
                                type={"text"}
                                className={cn(header.textButton, className)}
                              >
                                Персонажи комедии
                              </Button></Link>
                                <Link to={"/detective"}><Button
                                state={"default"}
                                type={"text"}
                                className={cn(header.textButton, className)}
                              >
                                Персонажи детективов
                              </Button></Link>
                                <Link to={"/horror"}>
                                <Button
                                state={"default"}
                                type={"text"}
                                className={cn(header.textButton, className)}
                              >
                                Персонажи ужасов
                              </Button></Link>
                                <Link to={"/fantastic"}>
                                   <Button
                                state={"default"}
                                type={"text"}
                                className={cn(header.textButton, className)}
                              >
                                Персонажи фантастики
                              </Button>
                                </Link>
                            </div>
                        </> : null
                }
            </>
          : null}
      </>
  )
};
