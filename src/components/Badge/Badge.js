import styles from './Badge.module.css';
import cn from "classnames";
import Htag from "../Htag/Htag.module.css"
export const Badge=({type,children,disabled, ...props})=>{

      switch(type) {
             case 'category':
                 return <>
                     <input className={cn(styles.input, styles.category)} id={children} type="checkbox"/>
                     <label for={children} className={cn(styles.div, Htag.body, {
                     [styles.category]: type === "category",
                 })}>{children}</label>
                 </>;
             case 'tag':
                 return <>
                     <input className={cn(styles.input, styles.tag)} id={children} type="checkbox"/>
                     <label for={children} className={cn(styles.div, Htag.body, {
                     [styles.tag]: type === "tag",
                 })}>{children}</label>
                 </>;
             default:
                 return <></>;
         }
}