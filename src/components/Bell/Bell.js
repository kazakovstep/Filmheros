import BellSVG from "../../images/bell.svg";
import styles from "./Bell.module.css"
import cn from "classnames";
import {useState} from "react";
import {Button} from "../Button/Button";
import {H} from "../Htag/Htag";
export const Bell = (className) => {

    const [isPressed, setPressed] = useState(false);
    const[isPressed2, setPressed2] = useState(false);
    const[isPressedClose, setPressedClose] = useState(false);
    const handleClick = () => {
        setPressed(true);
    }

    const handleClick2 = () => {
        setPressed2(true);
    }

    const handleClose = () => {
        setPressedClose(true);
    }

    return (
    <>
        <div className={cn(styles.bell_container, className, { [styles.active]: isPressed, [styles.active2]: isPressedClose })} onClick={handleClick}>
            {(isPressed && !isPressed2) ?
                <>
                    <div className={cn(styles.question_container, { [styles.close]: isPressed2 })}>
                        <H type={"body-bold"}>Какой фильм вы смотрели в последний раз?</H>
                        <div className={styles.column}>
                            <Button type={"primary"} state={"default"} onClick={handleClick2}>Комедия</Button>
                            <Button type={"primary"} state={"default"} onClick={handleClick2}>Детектив</Button>
                            <Button type={"primary"} state={"default"} onClick={handleClick2}>Фантастика</Button>
                            <Button type={"primary"} state={"default"} onClick={handleClick2}>Ужасы</Button>
                            <Button type={"primary"} state={"default"} onClick={handleClick2}>Приключения</Button>
                            <Button type={"primary"} state={"default"} onClick={handleClick2}>Боевик</Button>
                        </div>
                    </div>
                </>
                : ((isPressed2 && !isPressedClose) ?
                    <div className={cn(styles.question_container_2)}>
                        <H type={"h3"}>Спасибо за уделенное время!</H>
                        <Button type={"secondary"} state={"default"} onClick={handleClose}>Закрыть</Button>
                    </div>
                    : (isPressedClose ? <img src={BellSVG} alt={"Bell"}/> : <img src={BellSVG} alt={"Bell"}/>)
                    )}
        </div>
    </>
);
};