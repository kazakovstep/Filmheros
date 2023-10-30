import styles from "./Main.module.css";
import cn from "classnames";

export const Main = ({ type, ...props }) => {
  return (
      <main>
          <div
              className={cn({
                  [styles.main]: type === "main",
                  [styles.auth]: type === "auth",
                  [styles.advert]: type === "advert",
                   [styles.account]: type === "account",
              })}
              {...props}
            ></div>
      </main>
  );
};
