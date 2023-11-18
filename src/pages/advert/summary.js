import cn from "classnames";
import styles from "../../style/summary.module.css";
import {H} from "../../components/Htag/Htag";
import Htag from "../../components/Htag/Htag.module.css";
import React, {useEffect, useState} from "react";
import {withSummaryAdvertLayout} from "../../Layout/SummaryAdvertLayout/SummaryAdvertLayout";
import {List} from "../../components/List/List";
import {Badge} from "../../components/Badge/Badge";
import list from "../../components/List/List.module.css"
import {Button} from "../../components/Button/Button";
import Arrow from "../../images/arrow.svg"
import {Link} from "react-router-dom";
export function Summary(): JSX.Element {

    const [heroName, setHeroName] = useState("");
    const [heroDesc, setHeroDesc] = useState("");
    const [actorName, setActorName] = useState("");
    const [filmYear, setFilmYear] = useState("");
    const [filmName, setFilmName] = useState("");
    const [facts, setFacts] = useState([]);
    const [importantFact, setImportantFact] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [heroPics, setHeroPics] = useState([]);
    const [actorPic, setActorPic] = useState("");

    useEffect(() => {
        const advertStorage = sessionStorage.getItem("advert");
        if (advertStorage) {
            const parsedAdvert = JSON.parse(advertStorage);
            const heroName = parsedAdvert.heroName;
            const heroDesc = parsedAdvert.heroDesc;
            const actorName = parsedAdvert.actorName;
            const filmName = parsedAdvert.filmName;
            const filmYear = parsedAdvert.filmYear;
            const facts = parsedAdvert.facts;
            const importantFact = parsedAdvert.importantFact;
            const heroPics = parsedAdvert.heroPics;
            const actorPic = parsedAdvert.actorPic;
            const selectedCategories = parsedAdvert.selectedCategories;
            const selectedTags = parsedAdvert.selectedTags;
            setHeroDesc(heroDesc);
            setHeroName(heroName);
            setActorName(actorName);
            setFilmName(filmName);
            setFilmYear(filmYear);
            setFacts(facts);
            setImportantFact(importantFact);
            setHeroPics(heroPics);
            setActorPic(actorPic);
            setSelectedCategories(selectedCategories);
            setSelectedTags(selectedTags);
        }
    }, []);

    const handlePublish = () => {
        const advert = {
            heroName,
            heroDesc,
            actorName,
            filmName,
            filmYear,
            facts,
            importantFact,
            heroPics,
            actorPic,
            selectedCategories,
            selectedTags,
          };

        localStorage.setItem("advert", JSON.stringify(advert));
        sessionStorage.clear();
        window.location.href="/catalog";
    }


    return <>
        <div className={cn(styles.title_block)}>
            <H type={"h2"} className={cn(styles.title, Htag.h2)}>Проверьте данные перед публикацией объявления</H>
            <H type={"h3"} className={cn(styles.title_mobile, Htag.h3)}>Проверьте данные перед публикацией объявления</H>
            <H type={"body"} className={cn(styles.text, Htag.body)}>После публикации, объявление нельзя будет
                отредактировать.</H>
            <H type={"body"} className={cn(Htag.body)}>Сейчас вы видите его так же, как потенциальный читатель.</H>
        </div>
        <div className={cn(styles.advert)}>
            <List orientation={"vertical"} className={cn(list.v_ul, styles.ul)}>
                <div className={cn(styles.advert_block)}>
                    <div className={styles.mainInfo}>
                        <H type={"h2"} className={cn(Htag.h2, styles.first_title)}>{heroName}</H>
                        <div className={styles.badges}>
                            <List orientation={"horizontal"} className={cn(styles.tags)}>
                                {selectedCategories.map((category, index) => (
                                    <Badge key={index} type={"category"} checked={false}>{category}</Badge>
                                ))}
                            </List>
                            <List orientation={"horizontal"} className={cn(styles.tags)}>
                                {selectedTags.map((tag, index) => (
                                    <Badge key={index} type={"tag"} checked={false}>{tag}</Badge>
                                ))}
                            </List>
                        </div>

                    </div>
                    <H type={"body"}>{heroDesc}</H>
                </div>
            </List>
        </div>
        <div className={styles.film_info}>
            <H type={"h3"}>Актер: {actorName}</H>
            <div className={styles.film_info_name}>
                <H type={"h3"}>Фильм: {filmName}</H>
                <H type={"h3"}>Год: {filmYear}</H>
            </div>
        </div>
        <div className={styles.img_block}>
            <div className={styles.img_container}>
                <img src={actorPic} alt={"actorPic"} className={styles.img}/>
            </div>
            <H type={"h2"}>➜</H>
            {heroPics.map((pic, index) => (
                <div key={index} className={styles.img_container}>
                    <img src={pic} alt={"heroPic"} className={styles.img}/>
                </div>
            ))}
        </div>
        <div className={styles.Fact}>
            <H type={"h2"}>Главный факт:</H>
            <div className={styles.fact}>
                <H type={"h3"}>{importantFact[0]?.fact}</H>
                <H type={"body"}>{importantFact[0]?.desc}</H>
            </div>
        </div>
        {facts.length >= 1 ?
        <div className={styles.Fact}>
            <H type={"h2"}>Факты:</H>
            {facts.map((fact, index)=>(
                <div key={index} className={styles.fact}>
                    <H type={"h3"}>{fact?.fact}</H>
                    <H type={"body"}>{fact?.desc}</H>
                </div>
            ))}
        </div> : null}
        <div className={styles.buttons}>
            <Link to={"/advert"}>
                <Button state={"default"} type={"back"} icon_url={Arrow}>Назад</Button>
            </Link>
            <Button state={"default"} type={"primary"} onClick={handlePublish}>Опубликовать</Button>
        </div>
    </>
}

export default withSummaryAdvertLayout(Summary);