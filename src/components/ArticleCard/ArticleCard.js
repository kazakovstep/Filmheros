import React from 'react';
import styles from './ArticleCard.module.css'

export interface IArticleCard{
    heroName: string,
    date: string,
    selectedTags: string[],
    shortDescription: string
}

const ArticleCard = ({title, heroImg, date, selectedTags, shortDescription}) => {
    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            <p>{date}</p>
            <div>
                {selectedTags.map((el) => {
                    return (
                        <span>
                            {el}
                        </span>
                    )
                })}
            </div>
            <div>
                {shortDescription}
            </div>
        </div>
    );
};

export default ArticleCard;