"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    if (document.querySelector("#placeholder")) {
        placeholderInitializer();
    }
    if (document.querySelector("header")) {
        headerInitializer();
    }
    if (document.querySelector("#index")) {
        indexInitializer();
    }
    if (document.querySelector("#prijs-pagina")) {
        prijsPaginaInitializer();
    }
    if (document.querySelector("#contactUs")) {
        contactUsPageInitializer();
    }
    if (document.querySelector("#explore-the-stars")) {
        exploreTheStarsInitializer();
    }
    if (document.querySelector("#faq")) {
        faqInitializer();
    }
}

function switchHiddenFaqAnswer($answerClassList) {
    if ($answerClassList.contains("hidden")) {
        $answerClassList.remove("hidden");
    } else {
        $answerClassList.add("hidden");
    }
}

function navigateArrowForFaqPage(e) {
    e.preventDefault();
    const $faqArrowClassList = e.target.closest("svg").classList;
    switchDirectionArrow($faqArrowClassList);
    console.log(e.target);
    switchHiddenFaqAnswer(e.target.closest(".outer-wrapper").querySelector(".antwoord").classList);
}

function faqInitializer() {
    document.querySelectorAll("#faq div.vraag svg").forEach((query) => {
        query.addEventListener("click", (e) => {
            navigateArrowForFaqPage(e);
        });
    });
}

function placeholderInitializer() {
    document.querySelector("#icons").addEventListener('click', e => {
        header_icon(e);
    });
}

function renderAllArrowsOnSlideShow() {
    document.querySelectorAll(".slideshow").forEach((slideShow) => {
        showArrows(slideShow);
    })
}

function exploreTheStarsInitializer() {
    document.querySelectorAll(".slideshow .left").forEach((querySelector) => {
        querySelector.addEventListener("click", (e) => {
            slide("left", e)
        });
    });
    document.querySelectorAll(".slideshow .right").forEach((querySelector) => {
        querySelector.addEventListener("click", (e) => {
            slide("right", e);
        });
    });
    renderAllArrowsOnSlideShow();
}

function slide(direction, e) {
    const $slideShow = e.target.closest(".slideshow");
    const activeSlidNumber = parseInt($slideShow.querySelector(".active").dataset.slidenumber);
    let newActiveSlideNumber;
    if (direction === "left") {
        newActiveSlideNumber = activeSlidNumber - 1;
    } else if (direction === "right") {
        newActiveSlideNumber = activeSlidNumber + 1;
    }
    showImage(newActiveSlideNumber, $slideShow);
}

function showArrows(slideshow) {
    const amountOfSlides = slideshow.querySelectorAll(".slide").length;
    const currentSlide = parseInt(slideshow.querySelector(".active").dataset.slidenumber);
    const leftButton = slideshow.querySelector(".left");
    const rightButton = slideshow.querySelector(".right");
    if (currentSlide === 1 && amountOfSlides > 1) {
        switchButton(rightButton, leftButton);
    } else if (currentSlide === amountOfSlides && amountOfSlides > 1) {
        switchButton(leftButton, rightButton)
    } else if (amountOfSlides === 1) {
        showOrHideButtons([leftButton, rightButton], "hidden");
    } else {
        showOrHideButtons([leftButton, rightButton], "show");
    }
}

function switchButton(button1, button2) {
    if (button1.classList.contains("hidden")) {
        button1.classList.remove("hidden");
    }
    button2.classList.add("hidden");
}

function showOrHideButtons(buttons, showOrHidden) {
    buttons.forEach(button => {
        if (showOrHidden === "show") {
            button.classList.remove("hidden");
        } else if (showOrHidden === "hidden") {
            button.classList.add("hidden");
        }
    })
}

function showImage(newActiveImageNumber, slideShow) {
    const $oldActiveSlide = slideShow.querySelector(`.active`);
    const $newActiveSlide = slideShow.querySelector(`[data-slideNumber="${newActiveImageNumber}"]`)
    $oldActiveSlide.classList.replace("active", "non-active");
    $newActiveSlide.classList.replace("non-active", "active");
    showArrows(slideShow);
    //selectSlideshowButtons();
}

function removeDisclaimerPopup() {
    document.querySelector("body").classList.remove("stop-scrolling");
    document.querySelector(".popup").classList.add("hidden");
    saveToStorage("popup", true);
}

function popup() {
    if (localStorage.key("popup") === null || loadFromStorage("popup") === false) {
        document.querySelector("body").classList.add("stop-scrolling");
        document.querySelector(".popup").classList.remove("hidden");
    } else {
        removeDisclaimerPopup();
    }
    document.querySelector(".popup-content button").addEventListener("click", removeDisclaimerPopup);
}

function indexInitializer() {
    popup();
    animateSectionWhenInViewport();
    document.querySelectorAll("#index .button")
        .forEach((Element) => {
            Element.addEventListener('click', (e) => {
                navigateHomePageButtons(e);
            });
        });
}

function headerInitializer() {
    document.querySelector("header #icons").addEventListener('click', e => {
        header_icon(e);
    });
    document.querySelector("header #smaller-format-icons").addEventListener('click', e => {
        header_icon(e);
    });
    document.querySelector("header h1").addEventListener('click', () => {
        navigateToDifferentHtmlPage("../index.html");
    });
    document.querySelector(".smaller-format svg").addEventListener("click", (e) => {
        navigateArrowForSmallerFormat(e);
    })
}

function prijsPaginaInitializer() {
    renderPrice();
    document.querySelectorAll("#prijs-pagina main div div").forEach((Element) => {
        Element.addEventListener('click', navigateFromPricingToContact)
    });
}

function contactUsPageInitializer() {
    if (loadFromStorage("selectedPriceCategory")) {
        document.querySelectorAll("#pricingOption option").forEach((Element) => {
            if (loadFromStorage("selectedPriceCategory") === Element.value) {
                Element.selected = "selected";
            }
        });
    }
    document.querySelector(".begin button").addEventListener("click", (e) => {
        navigateWithHidden(".begin", ".algemene-informatie", e)
    });

    /* Algemene informatie navigatie */

    document.querySelector(".algemene-informatie button[name='terug']").addEventListener("click", (e) => {
        navigateWithHidden(".algemene-informatie", ".begin", e)
    });

    document.querySelector(".algemene-informatie button[name='volgende']").addEventListener("click", (e) => {
        navigateWithHidden(".algemene-informatie", ".product-informatie", e)
    });

    /* Product informatie navigatie */

    document.querySelector(".product-informatie button[name='terug']").addEventListener("click", (e) => {
        navigateWithHidden(".product-informatie", ".algemene-informatie", e)
    });

    document.querySelector(".product-informatie button[name='volgende']").addEventListener("click", (e) => {
        navigateWithHidden(".product-informatie", ".bericht", e)
    });

    /* Bericht navigatie */

    document.querySelector(".bericht button[name='terug']").addEventListener("click", (e) => {
        navigateWithHidden(".bericht", ".product-informatie", e)
    });

    document.querySelector(".bericht button[name='volgende']").addEventListener("click", (e) => {
        const requirements = checkRequirements();
        if (requirements != null) {
            showNotEverythingFilledInFormError(requirements, e);
        } else {
            showFinalCheck(e);
            navigateWithHidden(".bericht", ".final-check", e);
            finalCheckClicker();
        }
    });

    /* Show final check */

    document.querySelector(".final-check button[name='terug']").addEventListener("click", (e) => {
        navigateWithHidden(".final-check", ".bericht", e)
    });

    document.querySelector(".final-check input[name='verstuur']").addEventListener("click", (e) => {
        postContactForm(e);
    });

    /* Show error if something bad happend with the server side*/

    document.querySelector(".form-error ul").addEventListener("click", (e) => {
        navigateWithHidden(".form-error", ".algemene-informatie", e);
        document.querySelector(`.algemene-informatie input[id="${e.target.closest("li").className}"]`).focus();
    });

    /* Show message that everything went well and is sent to the server */

    document.querySelector(".form-succes button").addEventListener("click", () => {
        navigateToDifferentHtmlPage("../index.html");
    });
}

function finalCheckClicker() {
    document.querySelectorAll(".final-check li").forEach(li => {
        li.addEventListener("click", (e) => {
            let className = e.target.classList;
            className.remove("no-input");
            navigateFinalCheckLi(className, e);
        })
    })
}
