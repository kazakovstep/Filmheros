import React, {useState} from 'react';
import styles from '../../style/Account.module.css'
import {withAccountLayout} from "../../Layout/AccountLayout/AccountLayout";
import {H} from "../../components/Htag/Htag";
import groot from '../../images/lkImg.png'
import {useGetTestQuery} from "../../redux/api/TestAPI.js";
import {Button} from "../../components/Button/Button";
import {Link} from "react-router-dom";
import ArticleCard, {IArticleCard} from "../../components/ArticleCard/ArticleCard";


// export interface IArticleCard{
//     heroName: string,
//     date: string,
//     selectedTags: string[],
//     shortDescription: string
// }

const Account = () => {
    const [array, setArray] = useState([
        {
            heroName: "SpiderMan",
            date: "12-10-2004",
            selectedTags: ["boevic", "comedy"],
            shortDescription: "SpiderMan is a superhero that wanna fuck his MJ which often call hor"
        },
        {
            heroName: "SpiderMan",
            date: "12-10-2004",
            selectedTags: ["boevic", "comedy"],
            shortDescription: "SpiderMan is a superhero that wanna fuck his MJ which often call hor"
        },
        {
            heroName: "SpiderMan",
            date: "12-10-2004",
            selectedTags: ["boevic", "comedy"],
            shortDescription: "SpiderMan is a superhero that wanna fuck his MJ which often call hor"
        }
    ])

    return (
        <div className={styles.container}>
            <div className={styles.lkInfo}>
                <div className={styles.lkInfoText}>
                    <H type={"h2"}>
                        Добро пожаловать в <span>личный кабинет</span>
                    </H>
                    <div className={styles.description}>
                        <H type={"body"}>
                            Здесь ты найдешь самую актуальную информацию о твоих любимых киногероях, будь то супергерои из вселенной Marvel или персонажи из франшизы "Звездные войны".
                        </H>
                        <H type={"body"}>
                            Мы стремимся собрать самую полную базу данных о киногероях, чтобы ты всегда мог найти информацию о деталях их амплуа, личных историях и многое другое.
                        </H>
                    </div>
                </div>
                <div className={styles.imgBlcok}>
                    <img src={groot} alt={"pokemon"}/>
                </div>
            </div>
            <div className={styles.courses}>
                <div className={styles.coursesTitle}>
                    <H type={"h3"}>
                        Ваши статьи
                    </H>
                </div>
                <div className={styles.Content}>
                    Вы ещё не опубликовывали статьи
                </div>
            </div>
        </div>
    );
};

export default withAccountLayout(Account);