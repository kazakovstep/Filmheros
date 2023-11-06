import styles from "./CatalogPreview.module.css";
import cn from "classnames";
import {H} from "../Htag/Htag";
import HStyle from "../Htag/Htag.module.css"
import {Badge} from "../Badge/Badge";
import {Button} from "../Button/Button";
import Eye from "../../images/eye.svg";
import Heart from "../../images/heart.svg"
import BadgeStyle from "../Badge/Badge.module.css"
import React, {useState} from "react";
import Favourite from "../../images/favourite.svg"
import Spider from "./spider-man.jpg"
export const CatalogPreview = ({
  children,
    className,
    status = "actual",
  ...props
}): JSX.Element => {

  const[isFavorite, setFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);

  const handleSetFavorite = (event) => {
    setFavorite(!isFavorite);
  };

   const handleMouseMove = (event) => {
    const newPosition = { x: event.clientX, y: event.clientY };
    setFavorites((prevFavorites) => [...prevFavorites, newPosition]);
  };

   const handleDivClick = () => {
    setFavorites([]);
  };

  return (
      <>
          <div className={cn(styles.actual_block)} onMouseMove={handleMouseMove} onClick={handleDivClick}>
            <div className={cn(styles.img_container)}>
                <img src={Spider} alt={"Spider"} className={styles.img}/>
                {isFavorite ?
                    (favorites.map((favorite) => (
                        <img
                  src={Favourite}
                  alt={"FavouriteHeart"}
                  style={{
                    position: "absolute",
                    top: favorite.y + "px",
                    left: favorite.x + "px",
                  }}
                />
              ))) :null}

            </div>
            <div className={cn(styles.info_container)}>
                <div className={styles.title_block}>
                    <H type={"h3"}>Человек-паук</H>
                </div>
                <div className={styles.description_block}>
                    <H type={"body"} className={cn(HStyle.body, styles.description)}>Питер Паркер – обыкновенный школьник. Однажды он отправился с классом на экскурсию, где его кусает странный паук-мутант. Через время парень почувствовал в себе нечеловеческую силу и ловкость в движении, а главное – умение лазать по стенам и метать стальную паутину.</H>
                </div>
                <div className={styles.badges}>
                    <div className={styles.badge_row}>
                    <Badge
                      type={"category"}
                      className={cn(BadgeStyle.category, styles.category)}
                    >
                      Супергерой
                    </Badge>
                    <Badge
                      type={"tag"}
                      className={cn(BadgeStyle.tag, styles.tag)}
                    >
                      Мужчина
                    </Badge>
                    </div>
                </div>
            </div>
            <div className={styles.price_container}>
                <div className={styles.stats_blocks}>
                   <div className={styles.stats_block}>
                        <img src={Eye} alt={"Eye"}/>
                        <H type={"body"}>11</H>
                    </div>
                     <div className={styles.stats_block}>
                         {isFavorite ? <img src={Favourite} alt={"FavouriteHeart"}/> : <img src={Heart} alt={"Heart"}/>}
                        <H type={"body"}>11</H>
                    </div>
                </div>
                {isFavorite ?
                    <Button type={"text"} state={"default"} onClick={handleSetFavorite}>В избранном</Button> :
                    <Button type={"text"} state={"default"} onClick={handleSetFavorite}>Добавить в избранное</Button>
                }
            </div>
        </div>
      </>
  );
};
