import cn from "classnames";
import footer from "./Footer.module.css";
import { H } from "../../components/Htag/Htag";
import Htag from "../../components/Htag/Htag.module.css";
import Chat from "../../images/chat.svg";
import Vk from "../../images/vk.svg"
import Tg from "../../images/tg.svg"
import Tn from "../../images/tenchat.svg"
import {Logo} from "../../components/Logo/Logo";
import {Link} from "react-router-dom";

export const Footer = ({
  className,
  ...props
}) => {

    const user = sessionStorage.getItem("user");

  return (
    <footer className={cn(footer.footer, className)}>
      <ul className={cn(footer.v_ul)}>
        <Logo/>
          <section className={cn(footer.info)}>
              <H type={"h3"}>Контактная информация</H>
              <address>
                  <a href={"tel:+1234567890"}>
                      <H type={"body"} className={cn(footer.item, Htag.body)}>Наш контактный телефон</H>
                    </a>
              </address>
              <address>
                 <a href={"mailto:superheros@gmail.com"}>
                  <H type={"body"} className={cn(footer.item, Htag.body)}>Наша электронная почта</H>
                </a>
              </address>
              <Link to={user ? "/catalog" : "/login"}>
                  <H type={"h3"}>Каталог</H>
              </Link>
              <address>
                <H type={"body"} className={cn(footer.cr, Htag.body)}>
                  © ООО «Киногерои» 2023
                </H>
              </address>
          </section>
      </ul>
            <ul className={cn(footer.v_ul, footer.r_ul)}>
                <ul className={cn(footer.h_ul)}>
                  <img src={Chat} alt={"chat"}/>
                  <H type={"h3"}>Задать вопрос</H>
                </ul>
                 <ul className={cn(footer.h_ul)}>
                     <div className={footer.img}>
                         <div className={footer.bg}>
                             <img src={Vk} alt={"vk"} className={cn(footer.vk_sm_icon)} />
                         </div>
                     </div>
                     <div className={footer.img}>
                         <div className={footer.bg}>
                              <img src={Tg} alt={"tg"} className={cn(footer.tg_sm_icon)} />
                         </div>
                     </div>
                     <div className={footer.img}>
                         <div className={footer.bg}>
                             <img src={Tn} alt={"tn"} className={cn(footer.tn_sm_icon)} />
                         </div>
                     </div>
                </ul>
                <H type={"body"} className={cn(footer.pc, Htag.body)}>
                  Политика конфиденциальности
                </H>
              </ul>
    </footer>
  );
};
