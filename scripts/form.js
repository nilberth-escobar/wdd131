// const numberReviews = JSON.parse(getStorage('reviewCnt') || 0);
// textview.textContent = `Number of reviews submitted: ${numberReviews}`;

const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
    //   avg-rating: 4.5  :: Assignment typo
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];

products.forEach(product => {
  let productHTML = document.createElement("option");
  productHTML.setAttribute("value", `${product.name}`);
  productHTML.innerHTML = product.name;
  document.getElementById("prodName").appendChild(productHTML);
});

//-------------------------------------------------------------------------------
// Number of Reviews - local storage (numberReviews-ls)
//-------------------------------------------------------------------------------
let numberReviews = Number(window.localStorage.getItem("numberReviews-ls"));
numberReviews.textContent = `Number of reviews submitted: ${numberReviews}`;

numberReviews++;
localStorage.setItem("numberReviews-ls", numberReviews);