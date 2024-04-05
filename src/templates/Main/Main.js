import styles from "./Main.module.css";
import cn from "classnames";

export const Main = ({ type, className, ...props }) => {
    return (
        <main className={className}>
            <div
                className={cn({
                    [styles.main]: type === "main",
                    [styles.auth]: type === "auth",
                    [styles.advert]: type === "advert",
                    [styles.account]: type === "account",
                    [styles.summary]: type === "summary",
                    [styles.lk]: type === "lk"
                })}
                {...props}
            ></div>
        </main>
    );
};
