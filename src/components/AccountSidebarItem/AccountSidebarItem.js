import React, {JSX, useCallback, useEffect, useState} from "react";
import styles from './AccountSidebarItem.module.css'
import homeImg from '../../images/HouseSimple.svg'
import articleImg from '../../images/NotePencil.svg'
import settingsImg from '../../images/Gear.svg'
import likeImg from '../../images/heartAcc.svg'
import {Link, useLocation} from "react-router-dom";
import cn from 'classnames'
import {H} from "../Htag/Htag";

interface AccountSidebarItemProps{
    content: "Главная" | "Мои статьи" | "Избранное" | "Настройки",
}

export const AccountSidebarItem = ({content, ...props}: AccountSidebarItemProps): JSX.Element => {
    const[active, setActive] = useState(false)
    const[href, setHref] = useState(null)
    const path = useLocation()

    const switchHref = useCallback((href) => {
        setHref(href)
    })

    useEffect(() => {
        switch (content) {
            case "Главная":
                switchHref("/lk")
                break
            case "Мои статьи":
                switchHref("/lk/articles")
                break
            case "Избранное":
                switchHref("/lk/features")
                break
            case "Настройки":
                switchHref("/lk/settings")
                break
            default:
                break
        }
    }, [])

    useEffect(() => {
        if (path.pathname === href){
            setActive(true)
        }
    }, [href]);

    return (
        <>
            <Link to={href}>
                <li className={cn(styles.container, {
                    [styles.active]: active
                })} {...props}>
                    {
                        content === "Главная" ? <img src={homeImg} alt={content} className={active ? styles.activeImg : null}/> :
                            content === "Мои статьи" ? <img src={articleImg} alt={content}/> :
                                content === "Избранное" ? <img src={likeImg} alt={content}/> :
                                    content === "Настройки" ? <img src={settingsImg} alt={content}/> : null
                    }
                    <H type={'body-bold'}>{content}</H>
                </li>
            </Link>
        </>
    )
}