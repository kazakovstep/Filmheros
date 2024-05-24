import React from 'react';
import styles from './AccountSidebar.module.css'
import cn from 'classnames'
import logo from '../../images/Logo_svg.svg'
import {Link, useLocation} from "react-router-dom";
import {AccountSidebarItem} from "../../components/AccountSidebarItem/AccountSidebarItem";
import {Logo} from "../../components/Logo/Logo";




const AccountSidebar = ({className, ...props}) => {

    return (
        <aside className={cn(styles.sidebar, className)} {...props}>
            <div content={styles.logoContainer}>
                <Link to={'/catalog'}>
                    <Logo/>
                </Link>
            </div>
            <ul className={styles.menu}>
                <AccountSidebarItem content={"Главная"} />
                <AccountSidebarItem content={"Мои статьи"} />
                <AccountSidebarItem content={"Избранное"}/>
                <AccountSidebarItem content={"Настройки"}/>
            </ul>
        </aside>
    );
};

export default AccountSidebar;