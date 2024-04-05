import cn from "classnames"
import { Link } from "react-router-dom"
import LogoSVG from "../../images/Logo_svg.svg"
import { H } from "../Htag/Htag"
import styles from './Logo.module.css'
export const Logo = ({ className, ...props }) => {
    return (
        <>
            <Link to={"/"} className={cn(styles.logo, className)}>
                <img src={LogoSVG} alt={"logo"} width={40} height={40} />
                <H type={"h2"}>Киногерои</H>
            </Link>
        </>
    )
}