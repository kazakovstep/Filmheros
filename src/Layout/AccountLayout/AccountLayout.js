import React from 'react';
import styles from './AccountLayout.module.css'
import AccountSidebar from "../../templates/AccountSidebar/AccountSidebar";
import {Main} from "../../templates/Main/Main";

const AccountLayout = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <AccountSidebar className={styles.sidebar}/>
            <Main type={"lk"} className={styles.main}>
                {children}
            </Main>
        </div>
    );
};

export const withAccountLayout = function(Component) {
    return function withAccountLayoutComponent(props) {
        return (
            React.createElement(AccountLayout, null,
                React.createElement(Component, props)
            )
        );
    };
};
