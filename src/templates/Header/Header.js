import cn from "classnames";
import header from "./Header.module.css";
import {Logo} from "../../components/Logo/Logo";
import {Button} from "../../components/Button/Button";
import buttonStyle from "../../components/Button/Button.module.css"
import {Input} from "../../components/Input/Input";
import InputStyle from "../../components/Input/Input.module.css"
import {Menu} from "../../components/Menu/Menu"
export const Header = ({
  className,
  ...props
}) => {

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

  return (
    <header className={cn(header.header, className)}>
        <Logo/>
        <nav className={header.nav_comp}>
            <div className={cn(header.items, className)}>
                <Button state={"default"} type={"text"} className={cn(header.textButton, className)} onClick={handleCatalogClick}>Каталог</Button>
            </div>
            <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, header.addButton)} onClick={handlAdvertClick}>{user ? "Добавить статью" : "Войти"}</Button>
        </nav>
        <nav className={header.nav_mob}>
            <Menu/>
        </nav>
    </header>
  );
};
