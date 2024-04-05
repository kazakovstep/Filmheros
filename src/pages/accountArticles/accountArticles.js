import React from 'react';
import styles from '../../style/AccountArticles.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";

const AccountArticles = () => {
    return (
        <div className={styles.container}>
            Articles
        </div>
    );
};

export default withAccountLayout(AccountArticles);