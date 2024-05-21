import React from 'react';
import styles from '../../style/AccountArticles.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {H} from "../../components/Htag/Htag";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";

const AccountArticles = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <H type={"h2"}>
                    Здесь представлены все составленные вами статьи
                </H>
            </div>
            <div className={styles.content}>
                <CatalogPreview/>
                <CatalogPreview/>
                <CatalogPreview/>
                <CatalogPreview/>
            </div>
        </div>
    );
};

export default withAccountLayout(AccountArticles);