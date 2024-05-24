import React, {useState} from 'react';
import styles from '../../style/Account.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {H} from "../../components/Htag/Htag";
import groot from '../../images/greeting.png'
import {useGetMyArticleQuery} from "../../redux/api/user.api";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";

const Account = () => {

    const {data: articles} = useGetMyArticleQuery();

    console.log(articles)

    return (
        <div className={styles.container}>
            <div className={styles.lkInfo}>
                <div className={styles.lkInfoText}>
                    <H type={"h2"}>
                        Добро пожаловать в <span className={styles.span}>личный кабинет</span>
                    </H>
                    <div className={styles.description}>
                        <H type={"body"}>
                            Здесь ты найдешь самую актуальную информацию о твоих любимых киногероях, будь то супергерои
                            из вселенной Marvel или персонажи из франшизы "Звездные войны".
                        </H>
                        <H type={"body"}>
                            Мы стремимся собрать самую полную базу данных о киногероях, чтобы ты всегда мог найти
                            информацию о деталях их амплуа, личных историях и многое другое.
                        </H>
                    </div>
                </div>
                <div className={styles.imgBlcok}>
                    <img src={groot} alt={"pokemon"} width={400} style={{transform: "scaleX(-1)"}}/>
                </div>
            </div>
            <div className={styles.courses}>
                <div className={styles.coursesTitle}>
                    <H type={"h3"}>
                        Ваши статьи
                    </H>
                </div>
                <div className={styles.Content}>
                    {articles?.length > 0 ? (articles?.slice(0, 3).map((article) => (
                        <CatalogPreview data={article} key={article.id}/>
                    ))) : "Вы ещё не опубликовывали статьи"}
                </div>
            </div>
        </div>
    );
};

export default withAccountLayout(Account);