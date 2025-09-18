const cartContainer = document.getElementById("cart-container");
const mobileCartBtn = document.getElementById("mobile-cart-btn");
const closeCart = document.getElementById("close-cart");

// // Mobile: Navbar cart button click →
mobileCartBtn.addEventListener("click", () => {
  console.log("btn");
  cartContainer.classList.remove("hidden");
  setTimeout(() => {
    cartContainer.classList.remove("opacity-0", "translate-x-full");
    cartContainer.classList.add("opacity-100");
  }, 10);
});

// Mobile: Close button → hide modal
closeCart.addEventListener("click", () => {
  cartContainer.classList.add("opacity-0", "translate-x-full");
  setTimeout(() => cartContainer.classList.add("hidden"), 500);
});

document.getElementById("choices-section").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const addCartBtn = e.target;
    const plantName = addCartBtn.parentNode.parentNode.children[0].innerText;
    const plantPrice =
      addCartBtn.parentNode.parentNode.children[2].children[1].children[0]
        .innerText;
    const addCartContainers = document.getElementById("add-cart-container");

    const addCartDiv = document.createElement("div");
    addCartDiv.innerHTML = `
 <div class="flex justify-between items-center p-2 rounded-lg bg-[#F0FDF4] mb-2
              opacity-0 -translate-x-10 transition-all duration-500 ease-in-out
              hover:shadow-lg hover:scale-[1.02] hover:bg-[#DCFCE7] ">
    <div>
      <h3 class="sm:font-semibold font-medium sm:text-sm text-xs">${plantName}</h3>
      <p class="text-[#8C8C8C] sm:text-sm text-xs">৳<span class="added-price-pc">${plantPrice}</span></p>
    </div>
    <button class="delete-cart btn p-1 border-none bg-inherit text-[#8C8C8C] hover:text-red-500 font-bold">
      <i class="fa-solid fa-circle-xmark"></i>
    </button>
</div>
`;

    addCartContainers.append(addCartDiv);

    // Smooth show animation trigger
    const cartItem = addCartDiv.firstElementChild;
    setTimeout(() => {
      cartItem.classList.remove("opacity-0", "-translate-x-10");
    }, 10);

    alert(`🌱${plantName} has been added to your cart.`);

    let totalPrice = Number(document.getElementById("total-price").innerText);

    totalPrice += Number(plantPrice);

    document.getElementById("total-price").innerText = totalPrice;

    const priceContainer = document.getElementById("price-container");

    if (totalPrice != 0) {
      priceContainer.classList.remove("hidden");
    } else {
      priceContainer.classList.add("hidden");
    }
  }
});

document.getElementById("choices-section").addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-cart");

  if (deleteBtn) {
    const cartItem = deleteBtn.parentNode;

    const addedPlantPrice = Number(
      cartItem.querySelector(".added-price-pc").innerText
    );

    cartItem.classList.add("opacity-0", "-translate-x-10");

    setTimeout(() => {
      cartItem.remove();
    }, 500);

    let totalPrice = Number(document.getElementById("total-price").innerText);

    totalPrice -= addedPlantPrice;

    document.getElementById("total-price").innerText = totalPrice;

    const priceContainer = document.getElementById("price-container");

    if (totalPrice <= 0) {
      priceContainer.classList.add("hidden");
    } else {
      priceContainer.classList.remove("hidden");
    }
  }
});

const mangeSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("plants-container").classList.add("hidden");
  } else {
    document.getElementById("plants-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const displayPlants = (plants) => {
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const cardsDiv = document.createElement("div");
    cardsDiv.innerHTML = `
                <div class="card flex flex-col h-99 bg-base-100 shadow-sm 
            transition duration-300 transform hover:scale-105 
            hover:shadow-[0_0_25px_rgba(21,128,61,0.6)]">
  <figure class="h-40 w-full overflow-hidden">
    <img class="w-full h-full object-cover transition duration-300 hover:scale-110" src="${
      plant.image
    }" />
  </figure>
  <div class="p-4 flex-1 flex flex-col justify-between text-left">
    <h2 onclick="loadPlantsDetail(${
      plant.id
    })" class="font-bold text-[#18181B] sm:text-base text-xs 
               transition duration-300 hover:text-[#15803D] cursor-pointer">
      ${plant.name}
    </h2>
    <p class="text-[#71717A] sm:text-sm text-xs">${plant.description.slice(
      0,
      100
    )}...</p>
    <div class="flex justify-between sm:text-xs text-xs mt-2">
      <div class="badge text-center bg-[#DCFCE7] text-[#15803D] rounded-3xl px-3 py-1">${
        plant.category
      }</div>
      <p class="font-semibold text-gray-700">৳<span>${plant.price}</span></p>
    </div>
    <div class="card-actions mt-3">
      <button onclick="showCartContainer()" class="btn bg-[#15803D] text-white w-full rounded-3xl 
                     transition duration-300 hover:shadow-[0_0_20px_rgba(21,128,61,0.7)] 
                     hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  </div>
</div>

`;
    plantsContainer.append(cardsDiv);
  });
  mangeSpinner(false);
};

const showCartContainer = () => {
  const cartContainer = document.getElementById("cart-container");

  if (window.innerWidth >= 640) {
    cartContainer.classList.remove("hidden");
    setTimeout(() => {
      cartContainer.classList.remove("opacity-0", "translate-x-full");
    }, 10);
  }
};

const loadPlantsDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayPlantsDetails(details);
};

const displayPlantsDetails = (details) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  
              <div class="flex flex-col justify-center gap-3">
                <h2 class="sm:text-xl text-lg font-bold">${details.plants.name}</h2>
              
                <img class="w-full sm:h-[230px] h-[170px] rounded-2xl object-cover mx-auto" src="${details.plants.image}" alt="">

                <div class="flex flex-col gap-2 sm:text-base text-sm">
                  <p><span class="font-bold">Category: </span>${details.plants.category}</p>
                  <p><span class="font-bold">Price: </span>৳${details.plants.price}</span></p>
                  <p><span class="font-bold">Description: </span>${details.plants.description}</p>
                </div>
              </div>
  `;
  document.getElementById("details_modal").showModal();
};

const loadPlants = async () => {
  mangeSpinner(true);
  const response = await fetch(
    "https://openapi.programming-hero.com/api/plants"
  );
  const data = await response
    .json()

    .then((data) => {
      removeActive(".category-btn-pc");
      removeActive(".category-btn-ph");

      const allCategoryPc = document.getElementById("all-category-pc");
      if (allCategoryPc) {
        allCategoryPc.classList.add("active");
      }

      const allCategoryPh = document.getElementById("all-category-ph");
      if (allCategoryPh) {
        allCategoryPh.classList.add("active");
      }

      displayPlants(data.plants);
    });
};

const removeActive = (selector) => {
  document
    .querySelectorAll(selector)
    .forEach((btn) => btn.classList.remove("active"));
};

const displayPlantsCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";
  if (window.innerWidth >= 640) {
    categories.forEach((item) => {
      const categoriesList = document.createElement("ul");
      categoriesList.innerHTML = `
            <li id="categoryBtnPc${item.id}"  onclick="loadCategoryPlants(${item.id})" class="hover:shadow-md transition hover:opacity-50 hover:text-lg hover:bg-[#1ec45b] w-full hover:text-white p-2 rounded-md font-normal category-btn-pc">${item.category_name}</li>
    `;
      categoriesContainer.append(categoriesList);
    });
  }

  const categoriesContainerPh = document.getElementById(
    "categories-container-Ph"
  );

  if (window.innerWidth <= 640) {
    categories.forEach((item) => {
      const categoriesListPh = document.createElement("ul");
      categoriesListPh.innerHTML = `
            <li id="categoryBtnPh${item.id}" onclick="loadCategoryPlants(${item.id})" class="hover:shadow-xs transition hover:opacity-50  hover:text-base hover:bg-[#1ec45b] hover:text-white p-1 rounded-md font-normal category-btn-ph">${item.category_name}</li>
    `;
      categoriesContainerPh.append(categoriesListPh);
    });
  }
  mangeSpinner(false);
};

const loadCategoryPlants = (id) => {
  mangeSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(".category-btn-pc");
      removeActive(".category-btn-ph");

      const allCategoryPc = document.getElementById("all-category-pc");
      if (allCategoryPc) {
        allCategoryPc.classList.remove("active");
      }

      const allCategoryPh = document.getElementById("all-category-ph");
      if (allCategoryPh) {
        allCategoryPh.classList.remove("active");
      }

      const clickBtnPc = document.getElementById(`categoryBtnPc${id}`);
      if (clickBtnPc) {
        clickBtnPc.classList.add("active");
      }

      const clickBtnPh = document.getElementById(`categoryBtnPh${id}`);
      if (clickBtnPh) clickBtnPh.classList.add("active");

      displayPlants(data.plants);
    });
};

const plantsCategories = () => {
  mangeSpinner(true);
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlantsCategories(data.categories));
};

plantsCategories();
loadPlants();
