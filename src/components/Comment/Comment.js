import cn from "classnames"
import { useState } from 'react'
import { H } from '../Htag/Htag'
import styles from "./Comment.module.css"
import Dislike from "./dislike.svg"
import DislikeHover from "./dislikeHover.svg"
import Like from "./like.svg"
import LikeHover from "./likeHover.svg"
import Person from "./person.svg"

export const Comment = ({ data, className, ...props }) => {

  const [isHoveredLike, setIsHoveredLike] = useState(false)

  const handleMouseEnterLike = () => {
    setIsHoveredLike(true)
  }

  const handleMouseLeaveLike = () => {
    setIsHoveredLike(false)
  }

  const [isHoveredDislike, setIsHoveredDislike] = useState(false)

  const handleMouseEnterDislike = () => {
    setIsHoveredDislike(true)
  }

  const handleMouseLeaveDislike = () => {
    setIsHoveredDislike(false)
  }

  const [isLiked, setLiked] = useState(false)
  const [isDisliked, setDisliked] = useState(false)

  const handleClickLike = () => {
    setLiked(true)
    setDisliked(false)
  }

  const handleClickDislike = () => {
    setDisliked(true)
    setLiked(false)
  }


  return (
    <div className={cn(styles.comment)}>
      <div className={cn(styles.firstBlock)}>
        <div className={cn(styles.userInfo)}>
          <img src={Person} width={80} />
          <div className={cn(styles.name)}>
            <H type={'h3'}>
              Имя пользователя
            </H>
            <H type={'caption'}>
              04.04.2024
            </H>
          </div>
        </div>
        <div className={cn(styles.feedback)}>
          <img
            src={isHoveredLike || isLiked ? LikeHover : Like}
            className={cn(styles.feedbackButton)}
            onClick={handleClickLike}
            onMouseEnter={handleMouseEnterLike}
            onMouseLeave={handleMouseLeaveLike}
            alt="Like Button"
          />
          <H type={'body-bold'}>0</H>
          <img
            src={isHoveredDislike || isDisliked ? DislikeHover : Dislike}
            className={cn(styles.feedbackButton)}
            onClick={handleClickDislike}
            onMouseEnter={handleMouseEnterDislike}
            onMouseLeave={handleMouseLeaveDislike}
            alt="Dislike Button"
          />
          <H type={'body-bold'}>0</H>
        </div>
      </div>
      <div className={cn(styles.commentText)}>
        <H type={'body-bold'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</H>
      </div>
    </div>
  )
}