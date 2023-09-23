import cn from "classnames";
import header from "./Header.module.css";
import {Logo} from "../../components/Logo/Logo";
import {Button} from "../../components/Button/Button";
import buttonStyle from "../../components/Button/Button.module.css"
import {Input} from "../../components/Input/Input";
import {useState} from "react";
import {Link} from "react-router-dom";
import InputStyle from "../../components/Input/Input.module.css"
export const Header = ({
  className,
  ...props
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className={cn(header.header, className)}>
        <Logo/>
        <nav>
            <div className={cn(header.items, className)}>
                <Button state={"default"} type={"text"} className={cn(header.textButton, className)} onClick={handleDropdownToggle}>Каталог</Button>
                {showDropdown && (
                            <div className={cn(header.dropdown)}>
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
                          )}
                <Input placeholder={"Фильмы, новинки..."} type={"find"} className={cn(InputStyle.input,header.input)}/>
                <Button state={"default"} type={"text"} className={cn(header.textButton)}>Новости</Button>
            </div>
            <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, header.addButton)}>Добавить статью</Button>
        </nav>
    </header>
  );
};
