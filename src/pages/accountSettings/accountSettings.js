import React from 'react';
import styles from '../../style/AccountSettings.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";

const AccountSettings = () => {
    return (
        <div className={styles.container}>
            Settings
        </div>
    );
};

export default withAccountLayout(AccountSettings);