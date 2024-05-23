import sidebar from "./CatalogSidebar.module.css";
import {Button} from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import {Filter} from "../../components/Filter/Filter";
import cn from "classnames";
import {useDispatch} from "react-redux";
import {actions as filterActions} from "../../redux/slices/filter.slice"

export const CatalogSidebar = ({
                                   className,
                                   onReset,
                                   ...props
                               }): JSX.Element => {

    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterActions.updateHeroName(event.target.value));
    };

    return (
        <>
            <div className={cn(sidebar.sidebar, className)}>
                <div>
                    <Input state={"default"} type={"search"} placeholder={"Поиск"} style={{marginBottom: "1rem"}}
                           onChange={handleInputChange}/>
                    <Filter state={"default"} type={"category"}/>
                    <Filter state={"default"} type={"tags"}/>
                </div>
            </div>
        </>
    );
};
