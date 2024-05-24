import cn from "classnames"
import {Link} from "react-router-dom"
import {Button} from "../../components/Button/Button"
import buttonStyle from "../../components/Button/Button.module.css"
import {Logo} from "../../components/Logo/Logo"
import {Menu} from "../../components/Menu/Menu"
import header from "./Header.module.css"
import {useGetCurrentUserQuery} from "../../redux/api/user.api";
import {useEffect, useState} from "react";

export const Header = ({
                           className,
                           ...props
                       }) => {
    const {data, isLoading, error} = useGetCurrentUserQuery();

    const [avatr, setAvatr] = useState()

    useEffect(() => {
        console.log(data?.photo)
        try {
            fetch(`http://localhost:8080/api/v1/image/${data?.photo}`, {
                method: "POST",
            }).then(response => response.blob())
                .then(data => {
                    const file = new File([data], 'image.jpg', {type: 'image/jpeg'});
                    setAvatr(URL.createObjectURL(file));
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }
    }, [data, data?.photo])

    return (
        <header className={cn(header.header, className)}>
            <Logo/>
            <nav className={header.nav_comp}>
                <div className={cn(header.items, className, {
                    [header.width] : !data
                })}>
                    <Link to={data ? "/catalog" : "/login"} className={header.link}>
                        <Button state={"default"} type={"primary"}
                                className={cn(header.textButton, className)}>Каталог</Button>
                    </Link>
                    <Link to={data ? "/advert" : "/login"} className={header.link}>
                        <Button state={"default"} type={"primary"}
                                className={cn(buttonStyle.button, header.textButton)}>{data ? "Добавить статью" : "Войти"}</Button>
                    </Link>
                </div>
                {data ?
                    <Link to={"/lk"}>
                        <img src={avatr} alt={""} className={header.avatr}/>
                    </Link>
                    : null}
            </nav>
            <nav className={header.nav_mob}>
                <Menu/>
            </nav>
        </header>
    )
}
