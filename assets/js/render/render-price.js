"use strict";
function prettyPrice(price,extraOption = false) {
    if (price === "gratis"){
        return "gratis";
    } else if(!extraOption) {
        return `€${price}`;
    } else if(extraOption){
        return `+€${price}`;
    }
}
function renderPrice(){
    document.querySelector("#prijs-pagina #kleine-sterrenhemel h3").innerHTML = prettyPrice(_pricesAfterDiscount.smallOption.price);
    document.querySelector("#prijs-pagina #gemiddelde-sterrenhemel h3").innerHTML = prettyPrice(_pricesAfterDiscount.mediumOption.price);
    document.querySelector("#prijs-pagina #grote-sterrenhemel h3").innerHTML = prettyPrice(_pricesAfterDiscount.largeOption.price);
    document.querySelector("#prijs-pagina #meteorietenregen h3").innerHTML = prettyPrice(_pricesAfterDiscount.meteorietenregen.price,true);
    document.querySelector("#prijs-pagina #twee-kleuren h3").innerHTML = prettyPrice(_pricesAfterDiscount.tweeKleuren.price,true);

    document.querySelector("#prijs-pagina #exclusieve-sterrenhemel h3").innerHTML = `${_pricesAfterDiscount.exclusiveOption.price}`;
    document.querySelector("#prijs-pagina #logo h3").innerHTML = `${_pricesAfterDiscount.logo.price}`;

}
