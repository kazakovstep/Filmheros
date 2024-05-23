import React from 'react';
import styles from '../../style/AccountArticles.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {H} from "../../components/Htag/Htag";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";
import queryString from "query-string";
import {useGetMyArticleQuery} from "../../redux/api/user.api";

const AccountArticles = () => {

    const {data: articles} = useGetMyArticleQuery();

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <H type={"h2"}>
                    {articles?.length > 0 ? "Здесь представлены все составленные вами статьи" : "Вы пока не опубликовали ни одной статьи"}
                </H>
            </div>
            <div className={styles.content}>
                {articles?.map(article => (
                    <CatalogPreview key={article.id} data={article} link={{
                        pathname: '/catalog/article',
                        search: queryString.stringify({article_id: article?.articleId})
                    }}/>
                ))}
            </div>
        </div>
    );
};

export default withAccountLayout(AccountArticles);