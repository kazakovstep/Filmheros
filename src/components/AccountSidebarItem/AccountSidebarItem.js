import React, {JSX, useCallback, useEffect, useState} from "react";
import styles from './AccountSidebarItem.module.css'
import {Link, useLocation} from "react-router-dom";
import cn from 'classnames'
import {H} from "../Htag/Htag";

interface AccountSidebarItemProps{
    content: "Главная" | "Мои статьи" | "Избранное" | "Настройки",
}

const HomeImg = ({className}): JSX.Element => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20.0062 10.275L12.5062 3.45933C12.368 3.33284 12.1874 3.2627 12 3.2627C11.8126 3.2627 11.632 3.33284 11.4937 3.45933L3.99375 10.275C3.91828 10.3462 3.85783 10.4319 3.81597 10.5269C3.77411 10.6219 3.75168 10.7243 3.75 10.8281V19.5C3.75 19.6989 3.82902 19.8896 3.96967 20.0303C4.11032 20.1709 4.30109 20.25 4.5 20.25H19.5C19.6989 20.25 19.8897 20.1709 20.0303 20.0303C20.171 19.8896 20.25 19.6989 20.25 19.5V10.8281C20.2483 10.7243 20.2259 10.6219 20.184 10.5269C20.1422 10.4319 20.0817 10.3462 20.0062 10.275Z" fill="#585858" stroke="#585858" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

const ArticleImg = ({className}): JSX.Element => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15H9V12L18 3L21 6L12 15Z" fill="white" stroke="#585858" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}/>
            <path d="M15.75 5.25L18.75 8.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.25 11.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H12.75" stroke="#585858" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}/>
        </svg>
    )
}

const SettingsImg = ({className}): JSX.Element => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M17.2218 6.10352C17.4593 6.32227 17.6843 6.54727 17.8968 6.77852L20.4562 7.14414C20.8732 7.86836 21.1946 8.64357 21.4124 9.45039L19.8562 11.5223C19.8562 11.5223 19.8843 12.1598 19.8562 12.4785L21.4124 14.5504C21.1956 15.3576 20.8741 16.1329 20.4562 16.8566L17.8968 17.2223C17.8968 17.2223 17.4562 17.6816 17.2218 17.8973L16.8562 20.4566C16.1319 20.8737 15.3567 21.1951 14.5499 21.4129L12.478 19.8566C12.1599 19.8848 11.8399 19.8848 11.5218 19.8566L9.4499 21.4129C8.64274 21.1961 7.8674 20.8746 7.14365 20.4566L6.77803 17.8973C6.54678 17.6785 6.32178 17.4535 6.10303 17.2223L3.54365 16.8566C3.12664 16.1324 2.80521 15.3572 2.5874 14.5504L4.14365 12.4785C4.14365 12.4785 4.11553 11.841 4.14365 11.5223L2.5874 9.45039C2.8042 8.64322 3.12568 7.86789 3.54365 7.14414L6.10303 6.77852C6.32178 6.54727 6.54678 6.32227 6.77803 6.10352L7.14365 3.54414C7.86788 3.12712 8.64308 2.8057 9.4499 2.58789L11.5218 4.14414C11.8399 4.11601 12.1599 4.11601 12.478 4.14414L14.5499 2.58789C15.3571 2.80469 16.1324 3.12617 16.8562 3.54414L17.2218 6.10352Z" fill="#585858" stroke="#585858" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" fill="white" stroke="#585858" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

const LikeImg = ({className}): JSX.Element => {
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g id="ic/heart">
                <path id="Vector" d="M16.5436 3.75C13.5005 3.75 12.0005 6.75 12.0005 6.75C12.0005 6.75 10.5005 3.75 7.45735 3.75C4.98423 3.75 3.02579 5.81906 3.00048 8.28797C2.94892 13.4128 7.06595 17.0573 11.5786 20.1202C11.703 20.2048 11.85 20.2501 12.0005 20.2501C12.151 20.2501 12.2979 20.2048 12.4224 20.1202C16.9345 17.0573 21.0516 13.4128 21.0005 8.28797C20.9752 5.81906 19.0167 3.75 16.5436 3.75Z" fill="#585858" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
        </svg>
    )
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
                        content === "Главная" ? <HomeImg className={active ? styles.activeHomeImg : null}/> :
                            content === "Мои статьи" ? <ArticleImg className={active ? styles.activeArticleImg : null}/> :
                                content === "Избранное" ? <LikeImg className={active ? styles.activeLikeImg : null}/> :
                                    content === "Настройки" ? <SettingsImg className={active ? styles.activeSettingsImg : null}/> : null
                    }
                    <H type={'body-bold'}>
                        {content}
                    </H>
                </li>
            </Link>
        </>
    )
}