import React from 'react';
import styles from '../../style/AccountFeatures.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {H} from "../../components/Htag/Htag";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";

const AccountFeatures = () => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <H type={"h2"}>
                    Здесь представлены понравившиеся вами статьи
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

export default withAccountLayout(AccountFeatures);