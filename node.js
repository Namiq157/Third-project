let rub = document.querySelector(".rub");
let rub1 = document.querySelector(".rub1");
let usd = document.querySelector(".usd");
let usd1 = document.querySelector(".usd1");
let eur = document.querySelector(".eur");
let eur1 = document.querySelector(".eur1");
let gbp = document.querySelector(".gbp");
let gbp1 = document.querySelector(".gbp1");
let buttonsLeft = document.querySelectorAll(".left-block");
let rightInput = document.querySelector(".right-input");
let leftInput = document.querySelector(".left-input");
let buttonsRight = document.querySelectorAll(".right-block");

buttonsLeft.forEach(button => {
    button.addEventListener("click", () => {
        buttonsLeft.forEach(btn => btn.classList.remove("active-left", "rub"));
        button.classList.add("active-left");
    });
});

buttonsRight.forEach(item => {
    item.addEventListener("click", () => {
        buttonsRight.forEach(element => {
            element.classList.remove("active-right", "usd1");
        });
        item.classList.add("active-right");
    });
});

let leftcontainer = document.querySelector(".left-conv-box");
let rightcontainer = document.querySelector(".right-conv-box");
let buttons = document.querySelectorAll(".btn");

if (rub.classList.contains("active-left") && usd1.classList.contains("active-right")) {
    fetch("https://v6.exchangerate-api.com/v6/52a67d8fc61ac14f127e08d1/latest/RUB")
        .then(res => res.json()).then(dataRUB => {
            let leftval = document.createElement("p");
            leftval.classList.add("p");
            let usd = dataRUB.conversion_rates.USD;
            leftval.textContent = `1 RUB = ${usd} USD`;
            leftcontainer.append(leftval);
        });

    fetch("https://v6.exchangerate-api.com/v6/52a67d8fc61ac14f127e08d1/latest/USD")
        .then(res => res.json()).then(dataUSD => {
            let rightval = document.createElement("p");
            rightval.classList.add("p");
            let rub = dataUSD.conversion_rates.RUB;
            rightval.textContent = `1 USD = ${rub} RUB`;
            rightcontainer.append(rightval);
        });
}

function currency(inputcurrency, outputcurrency, container, text) {
    fetch(`https://v6.exchangerate-api.com/v6/52a67d8fc61ac14f127e08d1/latest/${inputcurrency}`)
        .then(res => res.json()).then(data => {
            let value = data.conversion_rates[outputcurrency];
            let val = document.createElement("p");
            val.classList.add("p");
            val.textContent = text.replace("{value}", value);
            container.append(val);
        });
}

function choosecurrency(leftside, rightside, leftcontainer, rightcontainer) {
    removeOnlyParagraphs(leftcontainer);
    removeOnlyParagraphs(rightcontainer);
    valyuta(leftside, rightside, leftcontainer, `1 ${leftside} = {value} ${rightside}`);
    valyuta(rightside, leftside, rightcontainer, `1 ${rightside} = {value} ${leftside}`);
}

buttons.forEach(item => {
    item.addEventListener("click", () => {
        let leftside = rub.classList.contains("active-left") ? "RUB" :
            eur.classList.contains("active-left") ? "EUR" :
                gbp.classList.contains("active-left") ? "GBP" :
                    "USD";
        let rightside = rub1.classList.contains("active-right") ? "RUB" :
            eur1.classList.contains("active-right") ? "EUR" :
                gbp1.classList.contains("active-right") ? "GBP" :
                    "USD";
        choosecurrency(leftside, rightside, leftcontainer, rightcontainer);
    });
});

function removeOnlyParagraphs(container) {
    let paragraphs = container.querySelectorAll("p");
    paragraphs.forEach(p => p.remove());
}

leftInput.addEventListener("input", () => {
    leftInput.value = leftInput.value.replace(/[^0-9.,]/g, "");
    leftInput.value = leftInput.value.replace(/,/g, ".");
    if ((leftInput.value.match(/\./g) || []).length > 1) {
        leftInput.value = leftInput.value.replace(/\.$/, "");
    }
});

rightInput.addEventListener("input", () => {
    rightInput.value = rightInput.value.replace(/[^0-9.,]/g, "");
    rightInput.value = rightInput.value.replace(/,/g, ".");
    if ((rightInput.value.match(/\./g) || []).length > 1) {
        rightInput.value = rightInput.value.replace(/\.$/, "");
    }
});

let mainDiv = document.querySelector(".converter");
let alert = document.createElement("p");

function internet() {
    if (navigator.onLine === false) {
        leftInput.value = "";
        rightInput.value = "";
        alert.style.display = "block";
        alert.classList.add("alert");
        alert.textContent = "No Internet";
        mainDiv.insertBefore(alert, mainDiv.children[1]);

        function choosecurrency2(leftside, rightside) {
            if (leftside === rightside) {
                leftInput.addEventListener("input", () => {
                    rightInput.value = leftInput.value;
                });
                rightInput.addEventListener("input", () => {
                    leftInput.value = rightInput.value;
                });
            } else {
                leftInput.addEventListener("input", () => {
                    rightInput.value = "";
                });
                rightInput.addEventListener("input", () => {
                    leftInput.value = "";
                });
            }
        }

        let leftside = rub.classList.contains("active-left") ? "RUB" :
            eur.classList.contains("active-left") ? "EUR" :
                gbp.classList.contains("active-left") ? "GBP" :
                    "USD";

        let rightside = rub1.classList.contains("active-right") ? "RUB" :
            eur1.classList.contains("active-right") ? "EUR" :
                gbp1.classList.contains("active-right") ? "GBP" :
                    "USD";

        choosecurrency2(leftside, rightside);

        buttons.forEach(item => {
            item.addEventListener("click", () => {
                let leftside = rub.classList.contains("active-left") ? "RUB" :
                    eur.classList.contains("active-left") ? "EUR" :
                        gbp.classList.contains("active-left") ? "GBP" :
                            "USD";

                let rightside = rub1.classList.contains("active-right") ? "RUB" :
                    eur1.classList.contains("active-right") ? "EUR" :
                        gbp1.classList.contains("active-right") ? "GBP" :
                            "USD";

                choosecurrency2(leftside, rightside);
            });
        });
    } else {
        alert.style.display = "none";

        if (rub.classList.contains("active-left") && usd1.classList.contains("active-right")) {
            fetch("https://v6.exchangerate-api.com/v6/52a67d8fc61ac14f127e08d1/latest/RUB")
                .then(res => res.json())
                .then(data => {
                    let conversionRate1 = data.conversion_rates.USD;
                    leftInput.addEventListener("input", () => {
                        if (leftInput.value.trim() !== "") {
                            rightInput.value = (leftInput.value * conversionRate1).toFixed(5);
                        } else {
                            rightInput.value = "";
                        }
                    });
                    rightInput.addEventListener("input", () => {
                        if (rightInput.value.trim() !== "") {
                            leftInput.value = (rightInput.value / conversionRate1).toFixed(5);
                        } else {
                            leftInput.value = "";
                        }
                    });
                });
        }

        function choosecurrency1(leftside, rightside) {
            fetch(`https://v6.exchangerate-api.com/v6/52a67d8fc61ac14f127e08d1/latest/${leftside}`)
                .then(res => res.json())
                .then(data => {
                    let conversionRate = data.conversion_rates[rightside];
                    function convertValues() {
                        if (conversionRate !== 1) {
                            if (leftInput.value.trim() !== "") {
                                rightInput.value = (leftInput.value * conversionRate).toFixed(5);
                            } else if (rightInput.value.trim() !== "") {
                                leftInput.value = (rightInput.value / conversionRate).toFixed(5);
                            }
                        } else if (conversionRate === 1) {
                            if (leftInput.value.trim() !== "") {
                                rightInput.value = (leftInput.value * conversionRate).toFixed(0);
                            } else if (rightInput.value.trim() !== "") {
                                leftInput.value = (rightInput.value / conversionRate).toFixed(0);
                            }
                        }
                    }

                    leftInput.addEventListener("input", () => {
                        if (leftInput.value.trim() !== "") {
                            rightInput.value = (leftInput.value * conversionRate).toFixed(5);
                        } else {
                            rightInput.value = "";
                        }
                    });
                    rightInput.addEventListener("input", () => {
                        if (rightInput.value.trim() !== "") {
                            leftInput.value = (rightInput.value / conversionRate).toFixed(5);
                        } else {
                            leftInput.value = "";
                        }
                    });

                    convertValues();
                });
        }

        buttons.forEach(item => {
            item.addEventListener("click", () => {
                let leftside = rub.classList.contains("active-left") ? "RUB" :
                    eur.classList.contains("active-left") ? "EUR" :
                        gbp.classList.contains("active-left") ? "GBP" :
                            "USD";

                let rightside = rub1.classList.contains("active-right") ? "RUB" :
                    eur1.classList.contains("active-right") ? "EUR" :
                        gbp1.classList.contains("active-right") ? "GBP" :
                            "USD";

                choosecurrency1(leftside, rightside);
            });
        });
    }
}

internet();
window.addEventListener("online", internet);
window.addEventListener("offline", internet);

let menu = document.querySelector(".menu");
let newUl = null;

menu.addEventListener("click", () => {
    if (!newUl) {
        newUl = document.createElement("ul");
        newUl.classList.add("newUl");
        let items = ["БАНК", "БИЗНЕС", "ИНВЕСТИЦИИ", "СТРАХОВАНИЕ", "МОБАЙЛ", "ПУТЕШЕСТВИЯ", "РАЗВЛЕЧЕНИЯ"];
        items.forEach(item => {
            let Li = document.createElement("li");
            Li.classList.add("Li");
            Li.textContent = item;
            newUl.append(Li);
        });
        mainDiv.insertBefore(newUl, mainDiv.children[0]);
    } else {
        newUl.remove();
        newUl = null;
    }
});
leftInput.addEventListener("input", () => {
    leftInput.value = leftInput.value.replace(/[^0-9.,]/g, ""); 
    leftInput.value = leftInput.value.replace(/,/g, "."); 
    if ((leftInput.value.match(/\./g) || []).length > 1) {
        leftInput.value = leftInput.value.replace(/\.$/, ""); 
    }
    if (leftInput.value.includes(".")) {
        let parts = leftInput.value.split(".");
        if (parts[1].length > 5) {
            leftInput.value = parts[0] + "." + parts[1].substring(0, 5);
        }
    }
});

rightInput.addEventListener("input", () => {
    rightInput.value = rightInput.value.replace(/[^0-9.,]/g, ""); 
    rightInput.value = rightInput.value.replace(/,/g, "."); 
    if ((rightInput.value.match(/\./g) || []).length > 1) {
        rightInput.value = rightInput.value.replace(/\.$/, ""); 
    }
    if (rightInput.value.includes(".")) {
        let parts = rightInput.value.split(".");
        if (parts[1].length > 5) {
            rightInput.value = parts[0] + "." + parts[1].substring(0, 5);
        }
    }
});
