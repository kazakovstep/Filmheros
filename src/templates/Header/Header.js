import cn from "classnames";
import header from "./Header.module.css";
import {Logo} from "../../components/Logo/Logo";
import {Button} from "../../components/Button/Button";
import buttonStyle from "../../components/Button/Button.module.css"
import {Input} from "../../components/Input/Input";
import {useState} from "react";
import {Link} from "react-router-dom";
import InputStyle from "../../components/Input/Input.module.css"
import {Menu} from "../../components/Menu/Menu"
export const Header = ({
  className,
  ...props
}) => {

  return (
    <header className={cn(header.header, className)}>
        <Logo/>
        <nav className={header.nav_comp}>
            <div className={cn(header.items, className)}>
                <Link to={"/catalog"} className={header.link}>
                    <Button state={"default"} type={"text"} className={cn(header.textButton, className)}>Каталог</Button>
                </Link>
                <Input placeholder={"Фильмы, новинки..."} type={"find"} className={cn(InputStyle.input,header.input)}/>
                <Button state={"default"} type={"text"} className={cn(header.textButton)}>Новости</Button>
            </div>
            <Link to={"/advert"} className={header.link}>
                <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, header.addButton)}>Добавить статью</Button>
            </Link>
        </nav>
        <nav className={header.nav_mob}>
            <Menu/>
        </nav>
    </header>
  );
};
