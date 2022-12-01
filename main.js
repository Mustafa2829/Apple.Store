// http://localhost:8000/products
let API = "http://localhost:8000/products";
// inputi i knopki dlu sozdania novih dannih
let inpDetalis = document.querySelector(".section__add_details")
let inpPrice = document.querySelector(".section__add_price")
let inpQuantity = document.querySelector(".section__add_quantity")
let inpSales = document.querySelector(".section__add_sales")
let inpCategory = document.querySelector(".section__add_category")
let inpUrl = document.querySelector(".section__add_url")
let btnAdd = document.querySelector(".section__add_btn-add")
let accordion = document.querySelector(".accordion__header")


// teg dly otobrajenia dannih v brauzere
let sectionRead = document.getElementById("section__read");
console.log(sectionRead);
// !=================  KODOVOE SLOVO =============//
let section_add = document.querySelector(".section__add")
let clickAdmin = document.getElementById("open-admin");
// let admin_panel_arr = document.getElementsByClassName("admin-panel");
let code = ""

function adminReturn() {
    if (code == "2811") {
        section_add.style.display = "block"
    } else if (code == "exit") {
        section_add.style.display = "none"
    } else {
        alert("неверный пароль")
    }
}
clickAdmin.addEventListener("click", () => {
    code = prompt("Ведите кодовое слово: ");
    adminReturn()
})

// ! ============== Accordoin start =============
accordion.addEventListener("click", () => {
    accordion.classList.toggle("active");
    let accordionBody = document.getElementById("accordion__body");
    if (accordion.classList.contains("active")) {
        accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
    } else {
        accordionBody.style.maxHeight = 0;
    }
})
//? =============== accordion end ============
// ! =================create start ================
async function createProduct(obj) {
    await fetch(API, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(obj),
    }).then((res) => res.json())
}

btnAdd.addEventListener("click", () => {
    // proverka na zopolninnost polei
    if (
        !inpDetalis.value.trim() ||
        !inpQuantity.value.trim() ||
        !inpPrice.value.trim() ||
        !inpCategory.value.trim() ||
        !inpSales.value.trim() ||
        !inpUrl.value.trim()
    ) {
        alert("Заполните поле");
        return;
    }
    let obj = {
        details: inpDetalis.value,
        price: inpPrice.value,
        quantity: inpQuantity.value,
        category: inpCategory.value,
        sale: inpSales.value,
        urlImg: inpUrl.value,
    };
    console.log(obj);
    inpQuantity.value = "";
    inpPrice.value = "";
    inpCategory.value = "";
    inpSales.value = "";
    inpUrl.value = "";
    inpDetalis.value = "";
    createProduct(obj)
});

// ? =================== creat end ============

//! =================read start================
async function readProducts() {
    let data = await fetch(API).then((res) => res.json())
    // console.log(data);
    sectionRead.innerHTML = ""
    data.forEach((item) => {
        // let productCard = document.createElement("div")
        sectionRead.innerHTML += `
          <div class="card">
          <div class="card2">
           <div class="front2" style="background-image: url(${item.urlImg})"></div>
           <div class="back2">
           <div id="card-details2">
           <p>${item.details}</p>
           <div class="text">
           <h2>${item.category}</h2>
           <span class="card_price">Цена: ${item.price} som </span>
           <br />
           <span class="card_sales">Скидка: ${item.sale} %</span>
           </div>
           <div class="userIcon" id="userPanel">
           <img src="https://thumbs.dreamstime.com/b/like-icon-vector-line-thumb-up-symbol-like-icon-vector-line-thumb-up-symbol-web-icon-113716348.jpg" alt="" width="30px" />
           <button class="btnBuy">Выбрать</button>
           </div>
           <div class="admin-panel" id="admin">
           <img src="https://cdn-icons-png.flaticon.com/512/1799/1799391.png" width="20px" />
           <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" width="20px"  />
           </div>
           </div>
           </div>
           </div>
           </div>
        `;
    });
}
readProducts()





