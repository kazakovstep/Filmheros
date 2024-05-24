import cn from "classnames"
import {useEffect, useState} from 'react'
import {H} from '../Htag/Htag'
import styles from "./Comment.module.css"
import Dislike from "./dislike.svg"
import DislikeHover from "./dislikeHover.svg"
import Like from "./like.svg"
import LikeHover from "./likeHover.svg"
import Person from "./person.svg"
import {useGetCurrentUserQuery, useGetUserQuery} from "../../redux/api/user.api";
import {
    useDeleteDislikeMutation,
    useDeleteLikeMutation,
    useDislikeCommentMutation,
    useLikeCommentMutation
} from "../../redux/api/comment.api";
import {useGetArticleQuery} from "../../redux/api/article.api";

export const Comment = ({data, className, ...props}) => {

    const {data: currentUser} = useGetCurrentUserQuery();

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

    const [isLiked, setLiked] = useState(false);
    const [isDisliked, setDisliked] = useState(false);

    const [likeComment] = useLikeCommentMutation();
    const [dislikeComment] = useDislikeCommentMutation();
    const [deleteLike] = useDeleteLikeMutation();
    const [deleteDislike] = useDeleteDislikeMutation();

    const [likeCount, setLikeCount] = useState();
    const [dislikeCount, setDislikeCount] = useState();

    useEffect(() => {
        if (data?.userLikes?.includes(currentUser?.userId)) {
            setLiked(true);
        } else if (data?.userDislikes?.includes(currentUser?.userId)) {
            setDisliked(true);
        }
        setLikeCount(data?.likeCount);
        setDislikeCount(data?.dislikeCount);
    }, [data, currentUser]);

    const handleClickLike = async () => {
        if (isLiked) {
            setLikeCount((prev) => prev - 1)
            await deleteLike(data?.commentId);
        }
        if (isDisliked) {
            await deleteDislike(data?.commentId);
            await likeComment(data?.commentId);
            setDisliked(false);
            setLikeCount((prev) => prev + 1)
            setDislikeCount((prev) => prev - 1)
        }
        if (!isLiked && !isDisliked) {
            setLikeCount((prev) => prev + 1)
            await likeComment(data?.commentId);
        }
        setLiked(!isLiked);
    }

    const handleClickDislike = async () => {
        if (isDisliked) {
            await deleteDislike(data?.commentId);
            setDislikeCount((prev) => prev - 1)
        }
        if (isLiked) {
            await deleteLike(data?.commentId);
            await dislikeComment(data?.commentId);
            setLiked(false);
            setLikeCount((prev) => prev - 1)
            setDislikeCount((prev) => prev + 1)
        }
        if (!isLiked && !isDisliked) {
            setDislikeCount((prev) => prev + 1)
            await dislikeComment(data?.commentId);
        }
        setDisliked(!isDisliked);
    }

    const [avatr, setAvatar] = useState();
    const {data: user} = useGetUserQuery(data?.user);

    useEffect(() => {
        try {
            fetch(`http://localhost:8080/api/v1/image/${user?.photo}`, {
                method: "POST",
            }).then(response => response.blob())
                .then(data => {
                    const file = new File([data], 'image.jpg', {type: 'image/jpeg'});
                    setAvatar(URL.createObjectURL(file));
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }
    }, [data, data?.photo, user]);

    const [time, setTime] = useState();

    useEffect(() => {
        const date = new Date(data?.date);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        setTime(date.toLocaleDateString('ru-RU', options))
    }, [])

    return (
        <div className={cn(styles.comment)}>
            <div className={cn(styles.firstBlock)}>
                <div className={cn(styles.userInfo)}>
                    <img src={data ? avatr : Person} style={{width: "80px", height: "80px", borderRadius: "50%"}}/>
                    <div className={cn(styles.name)}>
                        <H type={'h3'}>
                            {user?.userName}
                        </H>
                        <H type={'caption'}>
                            {time}
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
                    <H type={'body-bold'}>{likeCount}</H>
                    <img
                        src={isHoveredDislike || isDisliked ? DislikeHover : Dislike}
                        className={cn(styles.feedbackButton)}
                        onClick={handleClickDislike}
                        onMouseEnter={handleMouseEnterDislike}
                        onMouseLeave={handleMouseLeaveDislike}
                        alt="Dislike Button"
                    />
                    <H type={'body-bold'}>{dislikeCount}</H>
                </div>
            </div>
            <div className={cn(styles.commentText)}>
                <H type={'body-bold'}>{data?.text}</H>
            </div>
        </div>
    )
}