import cn from "classnames"
import { Link } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import buttonStyle from "../../components/Button/Button.module.css"
import { Logo } from "../../components/Logo/Logo"
import { Menu } from "../../components/Menu/Menu"
import header from "./Header.module.css"
import {useGetCurrentUserQuery} from "../../redux/api/user.api";
export const Header = ({
    className,
    ...props
}) => {
    const {data, isLoading, error} = useGetCurrentUserQuery();

    return (
        <header className={cn(header.header, className)}>
            <Logo />
            <nav className={header.nav_comp}>
                <div className={cn(header.items, className)}>
                    <Link to={data ? "/catalog" : "/login"} className={header.link}>
                        <Button state={"default"} type={"text"} className={cn(header.textButton, className)}>Каталог</Button>
                    </Link>
                </div>
                <Link to={data ? "/advert" : "/login"} className={header.link}>
                    <Button state={"default"} type={"primary"} className={cn(buttonStyle.button, header.addButton)}>{data ? "Добавить статью" : "Войти"}</Button>
                </Link>
            </nav>
            <nav className={header.nav_mob}>
                <Menu />
            </nav>
        </header>
    )
}
