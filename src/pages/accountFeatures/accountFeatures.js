import React from 'react';
import styles from '../../style/AccountFeatures.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";

const AccountFeatures = () => {
    return (
        <div className={styles.container}>
            Features
        </div>
    );
};

export default withAccountLayout(AccountFeatures);