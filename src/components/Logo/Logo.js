import styles from './Logo.module.css';
import cn from "classnames"
import LogoSVG from "../../images/Logo_svg.svg"
import {H} from "../Htag/Htag";
export const Logo=(classname, ...props)=>{
    return(
        <>
            <div className={cn(styles.logo, classname)}>
                <img src={LogoSVG} alt={"logo"} width={40} height={40}/>
                <H type={"h2"}>Киногерои</H>
            </div>
        </>
    );
}