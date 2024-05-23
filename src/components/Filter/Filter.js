import styles from "./Filter.module.css";
import cn from "classnames";
import React, {useEffect} from "react";
import Arrow from "../../images/arrow_down.svg";
import {H} from "../Htag/Htag";
import {Input} from "../Input/Input";
import {Badge} from "../Badge/Badge";
import {useState} from "react";
import {categories, tags} from "../../pages/advert/advert";
import {useDispatch} from "react-redux";
import {actions as filterActions} from "../../redux/slices/filter.slice"

export const Filter = ({
                           state = "default",
                           type,
                           className,
                           ...props
                       }): JSX.Element => {
    const [visibleTags, setVisibleTags] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(false);
    const [arrowRotation, setArrowRotation] = useState(false);
    const handleVisibleTagsClick = () => {
        setVisibleTags(!visibleTags);
        setArrowRotation(!arrowRotation);
    }

    const handleVisibleCategoriesClick = () => {
        setVisibleCategories(!visibleCategories);
        setArrowRotation(!arrowRotation);
    }

    const [selectedCategories, setSelectedCategories] = useState("");

    const handleBadgeChangeCategories = (value: string) => {
        if (selectedCategories === value) {
            setSelectedCategories("");
            dispatch(filterActions.updateSelectedCategories(""));
        } else {
            dispatch(filterActions.updateSelectedCategories(value));
            setSelectedCategories(value);
        }
    };

    const [selectedTags, setSelectedTags] = useState("");

    const handleBadgeChangeTags = (value: string) => {
        if (selectedTags === value) {
            setSelectedTags("");
            dispatch(filterActions.updateSelectedTags(""));
        } else {
            dispatch(filterActions.updateSelectedTags(value));
            setSelectedTags(value);
        }
    };

    const dispatch = useDispatch();


    return (
        <div className={cn(styles.filter_container, className)}>
            <div className={styles.filter} onClick={
                type === "tags" ? handleVisibleTagsClick : handleVisibleCategoriesClick
            }>
                <div>
                    {type === "category" ? <H type={"body"}>Категории</H> :
                        <H type={"body"}>Теги</H>}
                </div>
                <img src={Arrow} alt={"arrow"} className={cn(styles.arrowIcon, {
                    [styles.arrow]: arrowRotation,
                })}/>
            </div>
            {type === "tags" ?
                <div className={cn({
                    [styles.tags_click_sex]: visibleTags,
                    [styles.tags_sex]: !visibleTags,
                })}>
                    <div className={cn(styles.badge_list)}>
                        {Object.entries(tags).map((tag, index) => (
                            <Badge key={index} type="tag" size="small"
                                   checked={selectedTags === tags[tag[0]]}
                                   onChange={() => handleBadgeChangeTags(tags[tag[0]])}>
                                {tag[0]}
                            </Badge>
                        ))}
                    </div>
                </div>
                :
                <div className={cn({
                    [styles.tags_click]: visibleCategories,
                    [styles.tags]: !visibleCategories,
                })}>
                    <div className={cn(styles.badge_list)}>
                        {Object.entries(categories).map((category, index) => (
                            <Badge key={index} type="category" size="small"
                                   checked={selectedCategories === categories[category[0]]}
                                   onChange={() => handleBadgeChangeCategories(categories[category[0]])}>
                                {category[0]}
                            </Badge>
                        ))}
                    </div>
                </div>}
            <></>
        </div>
    );
};
