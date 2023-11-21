import {withCatalogLayout} from "../../Layout/CatalogLayout/CatalogLayout";
import React, {useLayoutEffect, useState} from "react";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";
import queryString from 'query-string';

export const Catalog = () => {

    const [advertStorage, setAdvertStorage] = useState([]);

    useLayoutEffect(()=>{
        const storedAdvert = localStorage.getItem("adverts");
        if (storedAdvert) {
          setAdvertStorage(JSON.parse(storedAdvert));
        }
    }, [])



  return (
    <>
        <CatalogPreview/>
        {advertStorage.map((ad, index) => (
            <CatalogPreview
                key={index}
                data={ad}
                link={{
                  pathname: '/catalog/advert',
                  search: queryString.stringify({ advert_id: index }),
                }}
            />
        ))}
    </>
  );
}

export default withCatalogLayout(Catalog);