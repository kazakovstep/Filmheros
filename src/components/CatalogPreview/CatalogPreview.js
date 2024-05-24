import styles from "./CatalogPreview.module.css";
import cn from "classnames";
import {H} from "../Htag/Htag";
import HStyle from "../Htag/Htag.module.css"
import {Badge} from "../Badge/Badge";
import {Button} from "../Button/Button";
import Eye from "../../images/eye.svg";
import Heart from "../../images/heart.svg"
import BadgeStyle from "../Badge/Badge.module.css"
import React, {useEffect, useState} from "react";
import Favourite from "../../images/favourite.svg"
import Spider from "../../images/spider-man.jpg"
import {Link, useLocation} from "react-router-dom";
import {categories, tags} from "../../pages/advert/advert";
import {useGetImageMutation} from "../../redux/api/image.api";
import {useDoDislikeMutation, useDoLikeMutation} from "../../redux/api/article.api";
import {useGetCurrentUserQuery} from "../../redux/api/user.api";

export const CatalogPreview = ({
                                   children,
                                   className,
                                   data,
                                   link,
                                   status = "actual",
                                   ...props
                               }): JSX.Element => {


    const [doLike] = useDoLikeMutation();
    const [doDislike] = useDoDislikeMutation();

    const handleSetFavorite = async () => {
        if (!isFavorite) {
            setAmountLikes((prev) => (prev + 1));
            await doLike(data?.articleId);
        }
        if (isFavorite) {
            setAmountLikes((prev) => (prev - 1));
            await doDislike(data?.articleId);
        }
        setFavorite(!isFavorite);
    };

    const [amountLikes, setAmountLikes] = useState(0);

    const {data: user, isLoading, error} = useGetCurrentUserQuery();

    useEffect(() => {
        setAmountLikes(data?.likeCount)
        if (data?.userLikes?.includes(user?.userId)) {
            setFavorite(true);
        }
    }, [data])

    const heroPicIds = data?.heroPics.split(", ")[0];

    const [file, setFile] = useState();

    useEffect(() => {
        try {
            fetch(`http://localhost:8080/api/v1/image/${heroPicIds}`, {
                method: "POST",
            }).then(response => response.blob())
                .then(data => {
                    const file = new File([data], 'image.jpg', {type: 'image/jpeg'});
                    setFile(URL.createObjectURL(file));
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }
    }, [data])

    const location = useLocation();
    const currentUrl = location.pathname;
    const [isFavorite, setFavorite] = useState(currentUrl === "/lk/features" || false);

    return (
        <>
            <div className={cn(styles.actual_block)}>
                <Link to={link} className={cn(styles.link_block)}>
                    <div className={cn(styles.img_container)}>
                        <img src={file} alt={"Spider"} className={styles.img}/>
                    </div>
                    <div className={cn(styles.info_container)}>
                        <div className={styles.title_block}>
                            <H type={"h3"}>{data?.heroName ?? "Человек-паук"}</H>
                        </div>
                        <div className={styles.description_block}>
                            <H type={"body"}
                               className={cn(HStyle.body, styles.description)}>{data?.heroDesc ?? "Питер Паркер – обыкновенный школьник. Однажды он отправился с классом на экскурсию, где его кусает странный паук-мутант. Через время парень почувствовал в себе нечеловеческую силу и ловкость в движении, а главное – умение лазать по стенам и метать стальную паутину."}</H>
                        </div>
                        <div className={styles.badges}>
                            <div className={styles.badge_row}>
                                <Badge
                                    type={"category"}
                                    className={cn(BadgeStyle.category, styles.category)}
                                >
                                    {Object.keys(categories).find(key => categories[key] === data?.selectedCategories)}
                                </Badge>
                                <Badge
                                    type={"tag"}
                                    className={cn(BadgeStyle.tag, styles.tag)}
                                >
                                    {Object.keys(tags).find(key => tags[key] === data?.selectedTags)}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </Link>
                {currentUrl === "/lk/articles" ?
                    <Button type={"text"} style={{cursor: "pointer"}}>Удалить</Button> : null}
                <div className={styles.like_container}>
                    <div className={styles.stats_blocks}>
                        <div className={styles.stats_block}>
                            {isFavorite ? <img src={Favourite} alt={"FavouriteHeart"}/> :
                                <img src={Heart} alt={"Heart"}/>}
                            <H type={"body"}>{amountLikes}</H>
                        </div>
                    </div>
                    {isFavorite ?
                        <Button type={"text"} style={{cursor: "pointer"}} onClick={handleSetFavorite}>В
                            избранном</Button> :
                        <Button type={"text"} style={{cursor: "pointer"}} onClick={handleSetFavorite}>Добавить в
                            избранное</Button>
                    }
                </div>
            </div>
        </>
    );
};
