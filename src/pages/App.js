import {H} from "../components/Htag/Htag";
import {withMainLayout} from "../Layout/MainLayout/Main";
import cn from "classnames";
import React from "react";
import styles from "../style/App.module.css";
import Shooter from "../images/boeviki.jpg";
import Comedy from "../images/comedy.jpg";
import Superheros from "../images/superheros.jpg";
import HStyle from "../components/Htag/Htag.module.css"
import {Link} from "react-router-dom";
import Voody from "../images/voody.jpg";
import {List} from "../components/List/List";
import Superman from "../images/Superman.jpg";
import Bond from "../images/Bond.jpg";
import IronMan from "../images/IronMan.jpeg";
import DreamWorks from "../images/Dreamworks.jpg";
import Paramount from "../images/Paramount.png";
import twentiethFox from "../images/20th Century Fox.jpg";
import Columbia from "../images/Columbia.jpg";
export const App = () => {
  return (
    <>
        <div className={cn(styles.center_block)}>
            <H type={"h2"}>Киногерои - это <span>море интересных фактов</span><br/>
                о различных персонажах,
                наполненность<br/> которого полностью зависит <span>от вас</span></H>
        </div>
        <section>
            <div className={cn(styles.center_block)}>
              <H type={"h2"}>Топ <span>популярных</span> категорий:</H>
          </div>
          <div className={cn(styles.popular_categories)}>
              <Link to={"/superheros"} className={cn(styles.image_container)}>
                <img src={Superheros} alt={"Superheros"}/>
                <H type={"h3"} className={cn(styles.sub, HStyle.h3)}>Супергерои</H>
              </Link>
              <Link to={"/shooters"} className={cn(styles.image_container)}>
                <img src={Shooter} alt={"Shooter"}/>
                <H type={"h3"} className={cn(styles.sub, HStyle.h3)}>Персонажи боевиков</H>
              </Link>
              <Link to={"/comedy"} className={cn(styles.image_container)}>
                <img src={Comedy} alt={"Comedy"}/>
                <H type={"h3"} className={cn(styles.sub, HStyle.h3)}>Персонажи комедии</H>
              </Link>
          </div>
        </section>
        <section>
          <div className={cn(styles.center_block)}>
            <H type={"h2"}>Цитата <span>дня</span></H>
          </div>
          <div className={cn(styles.quote)}>
            <img src={Voody} alt={"Voody"}/>
            <aside className={cn(styles.aside)}>
              <H type={"h3"}><q>Для игрушки самое главное — сделать ребенка счастливым</q></H>
            </aside>
          </div>
        </section>
        <section>
          <div className={cn(styles.center_block)}>
            <H type={"h2"}>Топ <span>искомых</span> персонажей</H>
          </div>
          <div className={cn(styles.quote)}>
            <img src={Superman} alt={"Superman"}/>
            <aside className={cn(styles.aside)}>
              <List orientation={"vertical"}>
                <H type={"h3"}>Супермен</H>
                <H type={"body"}>супергерой комиксов и фильмов, обладающий сверхчеловеческой силой, летающими способностями и
                  непробиваемостью.</H>
              </List>
            </aside>
          </div>
          <div className={cn(styles.quote)}>
            <img src={Bond} alt={"Bond"}/>
            <aside className={cn(styles.aside)}>
              <List orientation={"vertical"}>
                <H type={"h3"}>Джеймс Бонд</H>
                <H type={"body"}>известный герой из серии фильмов "007". Он является секретным агентом британской разведки MI6, и его основная задача - обезвреживать врагов и спасать мир.</H>
              </List>
            </aside>
          </div>
          <div className={cn(styles.quote)}>
            <img src={IronMan} alt={"IronMan"}/>
            <aside className={cn(styles.aside)}>
              <List orientation={"vertical"}>
                <H type={"h3"}>Железный человек</H>
                <H type={"body"}>миллиардер и изобретатель, который создал боевой костюм с уникальными возможностями,
                  позволяющими ему стать супергероем.</H>
              </List>
            </aside>
          </div>
        </section>
        <section>
          <div className={cn(styles.center_block)}>
            <H type={"h2"}>Топ <span>кинокомпаний</span></H>
          </div>
          <div className={cn(styles.center_block,styles.list)}>
            <List orientation={"vertical"}>
              <a href={"https://www.dreamworks.com/"} className={styles.circle_img} target={"_blank"}>
                <img src={DreamWorks} alt={"DreamWorks"}/>
              </a>
              <H type={"h3"} className={cn(HStyle.h3, styles.companyName)}>DreamWorks</H>
            </List>
            <List orientation={"vertical"}>
              <a href={"https://www.paramountpictures.com/"} className={styles.circle_img} target={"_blank"}>
                <img src={Paramount} alt={"Paramount"}/>
              </a>
              <H type={"h3"} className={cn(HStyle.h3, styles.companyName)}>Paramount</H>
            </List>
            <List orientation={"vertical"}>
              <a href={"https://www.20thcenturystudios.com/"} className={styles.circle_img} target={"_blank"}>
                <img src={twentiethFox} alt={"twentiethFox"}/>
              </a>
              <H type={"h3"} className={cn(HStyle.h3, styles.companyName)}>20th Century Fox</H>
            </List>
            <List orientation={"vertical"} className={styles.list_block}>
              <a href={"https://www.sonypictures.com/"} className={styles.circle_img} target={"_blank"}>
                <img src={Columbia} alt={"Columbia"}/>
              </a>
              <H type={"h3"} className={cn(HStyle.h3, styles.companyName)}>Columbia</H>
            </List>
          </div>
        </section>
        <div className={cn(styles.center_block)}>
            <H type={"h2"}>Отзывы</H>
          </div>
        <div className={styles.feedback}>
            <div className={styles.bg}>
                <div className={styles.card}>
                    <H type={"h2"} className={cn(HStyle.h2, styles.name)}>Степан</H>
                    <br/>
                     <H type={"h3"}><q>Сайт просто пушечный, каждый вечер захожу почитать про кино, рекомендую</q></H>
                </div>
            </div>
            <div className={styles.bg}>
                <div className={styles.card}>
                    <H type={"h2"} className={cn(HStyle.h2, styles.name)}>Николай</H>
                    <br/>
                     <H type={"h3"}><q>Лучший форум про киногероев, который я посещал. Затянуло с головой!!! 10/10</q></H>
                </div>
            </div>
            <div className={styles.bg}>
                <div className={styles.card}>
                    <H type={"h2"} className={cn(HStyle.h2, styles.name)}>Георгий</H>
                    <br/>
                     <H type={"h3"}><q>Искал информацию про героя и нигде кроме данного сайта не мог найти</q></H>
                </div>
            </div>
        </div>
    </>
  );
}

export default withMainLayout(App);