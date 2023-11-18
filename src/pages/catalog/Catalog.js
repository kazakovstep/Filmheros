import {withCatalogLayout} from "../../Layout/CatalogLayout/CatalogLayout";
import React, {useLayoutEffect, useState} from "react";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";

export const Catalog = () => {

    const [advertStorage, setAdvertStorage] = useState();

    useLayoutEffect(()=>{
        const storedAdvert = localStorage.getItem("advert");
        if (storedAdvert) {
          setAdvertStorage(JSON.parse(storedAdvert));
        }
    }, [])



  return (
    <>
        <CatalogPreview/>
        <CatalogPreview data={advertStorage}/>
    </>
  );
}

export default withCatalogLayout(Catalog);