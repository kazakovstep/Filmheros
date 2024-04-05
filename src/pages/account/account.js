import React from 'react';
import styles from '../../style/Account.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";

const Account = () => {
    return (
        <div className={styles.container}>
            Account
        </div>
    );
};

export default withAccountLayout(Account);