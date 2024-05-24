import React from 'react';
import styles from '../../style/AccountFeatures.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {H} from "../../components/Htag/Htag";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";
import {useGetLikedArticleQuery} from "../../redux/api/user.api";

const AccountFeatures = () => {

    const {data: articles} = useGetLikedArticleQuery();

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <H type={"h2"}>
                    {articles?.length > 0 ? "Здесь представлены понравившиеся вами статьи" : "Пока что вы не оценили ни одной статьи"}
                </H>
            </div>
            <div className={styles.content}>
                {articles?.map(article => (
                    <CatalogPreview key={article.id} data={article}/>
                ))}
            </div>
        </div>
    );
};

export default withAccountLayout(AccountFeatures);