import cn from "classnames"
import React, {useEffect, useState} from "react"
import {Link, useLocation} from "react-router-dom"
import {withSummaryAdvertLayout} from "../../Layout/SummaryAdvertLayout/SummaryAdvertLayout"
import {Badge} from "../../components/Badge/Badge"
import {Button} from "../../components/Button/Button"
import {Comment} from "../../components/Comment/Comment"
import {H} from "../../components/Htag/Htag"
import Htag from "../../components/Htag/Htag.module.css"
import {List} from "../../components/List/List"
import list from "../../components/List/List.module.css"
import {Textarea} from '../../components/Textarea/Textarea'
import Send from "../../images/send.svg"
import SendHover from "../../images/sendHover.svg"
import styles from "../../style/summary.module.css"
import {useGetArticleQuery} from "../../redux/api/article.api";
import {categories, tags} from "../advert/advert";

export function AdvertCatalog() {
    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const articleId = params.get("article_id");

    const {data: article, isFetching, error} = useGetArticleQuery(articleId);

    const [heroPics, setHeroPics] = useState([]);
    const [actorPic, setActorPic] = useState();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (article?.heroPics) {
                    const heroPicsArray = article.heroPics.split(", ");
                    const imagePromises = heroPicsArray.map(async (pic) => {
                        const response = await fetch(`http://localhost:8080/api/v1/image/${pic}`, {
                            method: "POST",
                        });
                        const blob = await response.blob();
                        return URL.createObjectURL(new File([blob], `${pic}.jpg`, {type: 'image/jpeg'}));
                    });

                    const imageUrls = await Promise.all(imagePromises);
                    setHeroPics(imageUrls);
                }
                if (article?.actorPic) {
                    fetch(`http://localhost:8080/api/v1/image/${article?.actorPic}`, {
                        method: "POST",
                    }).then(response => response.blob())
                        .then(data => {
                            const file = new File([data], 'image.jpg', {type: 'image/jpeg'});
                            setActorPic(URL.createObjectURL(file));
                        })
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchImages();
    }, [article]);


    return <>
        <div className={cn(styles.title_block)}>
            <H type={"h2"} className={cn(styles.title, Htag.h2)}>Приятного чтения интересных фактов
                о {article?.heroName}</H>
            <H type={"h3"} className={cn(styles.title_mobile, Htag.h3)}>Приятного чтения интересных фактов
                о {article?.heroName}</H>
            <H type={"body"} className={cn(styles.text, Htag.body)}>Если вы с чем-то не согласны, не судите автора
                строго,<br/>напишите в поддержку на главной странице сайта</H>
        </div>
        <div className={cn(styles.advert)}>
            <List orientation={"vertical"} className={cn(list.v_ul, styles.ul)}>
                <div className={cn(styles.advert_block)}>
                    <div className={styles.mainInfo}>
                        <H type={"h2"} className={cn(Htag.h2, styles.first_title)}>{article?.heroName}</H>
                        <div className={styles.badges}>
                            <List orientation={"horizontal"} className={cn(styles.tags)}>
                                <Badge type={"category"}
                                       checked={false}>{Object.keys(categories).find(key => categories[key] === article?.selectedCategories)}</Badge>
                            </List>
                            <List orientation={"horizontal"} className={cn(styles.tags)}>
                                <Badge type={"tag"}
                                       checked={false}>{Object.keys(tags).find(key => tags[key] === article?.selectedTags)}</Badge>
                            </List>
                        </div>
                    </div>
                    <H type={"body"}>{article?.heroDesc}</H>
                </div>
            </List>
        </div>
        <div className={styles.film_info}>
            <H type={"h3"}>Актер: {article?.actorName}</H>
            <div className={styles.film_info_name}>
                <H type={"h3"}>Фильм: {article?.filmName}</H>
                <H type={"h3"}>Год: {article?.filmYear}</H>
            </div>
        </div>
        <div className={styles.img_block}>
            <div className={styles.img_container}>
                <img src={actorPic} alt={"actorPic"} className={styles.img}/>
            </div>
            <H type={"h2"} className={cn(Htag.h2, styles.arrow)}>➜</H>
            {heroPics.map((pic, index) => (
                <div key={index} className={styles.img_container}>
                    <img src={pic} alt={"heroPic"} className={styles.img}/>
                </div>
            ))}
        </div>
        <div className={styles.Fact}>
            <H type={"h2"}>Главный факт:</H>
            <div className={styles.fact}>
                <H type={"h3"}>{article?.importantFact?.fact}</H>
                <H type={"body"}>{article?.importantFact?.description}</H>
            </div>
        </div>
        {article?.facts.length >= 1 ?
            <div className={styles.Fact}>
                <H type={"h2"}>Факты:</H>
                {article?.facts.map((fact, index) => (
                    <div key={index} className={styles.fact}>
                        <H type={"h3"}>{fact?.fact}</H>
                        <H type={"body"}>{fact?.description}</H>
                    </div>
                ))}
            </div> : null}
        <div className={cn(styles.comments)}>
            <div className={cn(styles.commentsTitle)}>
                <H type={'h2'}><span className={cn(styles.purple)}>Рецензии</span> пользователей</H>
                <div className={cn(styles.circle)}>
                    <H type={'h3'}>0</H>
                </div>
            </div>
            <div className={cn(styles.userComment)}>
                <H type={'h3'}>Ваше <span className={cn(styles.purple)}>мнение</span></H>
                <div className={cn(styles.commentForm)}>
                    <Textarea placeholder={'Что думаете насчет статьи?'}/>
                    <Button type={'primary'} state={'default'} className={cn(styles.sendButton)} icon_url={Send}
                            icon_url_hover={SendHover}/>
                </div>
            </div>
            <div className={cn(styles.commentsBlock)}>
                <Comment/>
            </div>
        </div>
        <div className={cn(styles.buttons, styles.catalogAdvert)}>
            <div></div>
            <Link to={"/catalog"}>
                <Button state={"default"} type={"primary"} className={cn(styles.button)}>В каталог</Button>
            </Link>
        </div>
    </>
}

export default withSummaryAdvertLayout(AdvertCatalog)