import {withCatalogLayout} from "../../Layout/CatalogLayout/CatalogLayout";
import React from "react";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";

export const Catalog = () => {

  return (
    <>
        <CatalogPreview/>
    </>
  );
}

export default withCatalogLayout(Catalog);