import {withCatalogLayout} from "../../Layout/CatalogLayout/CatalogLayout";
import React, {useLayoutEffect} from "react";
import {CatalogPreview} from "../../components/CatalogPreview/CatalogPreview";

export const Catalog = () => {

    function Accumulator(startingValue) {
      this.value = startingValue;

      this.read = function() {
        const inputValue = parseFloat(prompt("Введите число"));
        if (!isNaN(inputValue)) {
          this.value += inputValue;
        }
      };
    }

    const accumulator = new Accumulator(10);

    /*useLayoutEffect(()=>{
        while(true){
            accumulator.read();
            alert(accumulator.value)
        }
    },[])*/



  return (
    <>
        <CatalogPreview/>
    </>
  );
}

export default withCatalogLayout(Catalog);