menu = document.getElementById("menu"); // Menu button
sidebar = document.getElementById("sidebar"); // Sideabar
closeMenuIcon = document.getElementById("close-menu"); //Close menu icon
cartIcon = document.getElementById("cart-icon"); // Cart icon in nav bar
orderedItems = document.getElementById("cart-content"); // Ordered Items pop-up

// Show Ordered Items
showOrder = false; // Ordered Items cart is not displayed by default
cartIcon.onclick = () => {
  showOrder = !showOrder;
  if (showOrder) {
    orderedItems.style.display = "flex";
  } else {
    orderedItems.style.display = "none";
  }
};

//Show Sidebar Menu
menu.onclick = () => {
  sidebar.style.display = "block";
};

//Hide Sidebar Menu
closeMenuIcon.onclick = () => {
  sidebar.style.display = "none";
};

//-----PRODUCT COUNT FUNCTIONALITIES--------
productPlusOne = document.getElementById("product-count--plus");
productMinusOne = document.getElementById("product-count--minus");
productCount = 0;

// Increase product count by one
productPlusOne.onclick = () => {
  productCount++;
  document.getElementById("product-count--number").innerHTML = productCount;
};

// Decrease product count by one
productMinusOne.onclick = () => {
  if (productCount != 0) {
    productCount--;
    document.getElementById("product-count--number").innerHTML = productCount;
  }
};

//----ADD PRODUCT ORDER TO CART FUNCTIONALITY----

addToCart = document.getElementsByClassName("add-to-cart")[0];
//Products tags and their corresponding number of products ordered
productCart = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
};
productTag = 1; //Default product that shows is the one with tag 1
click = 0;
//Add To Cart Functionality
addToCart.onclick = () => {
  if (productCount != 0) {
    click++;
    document.getElementById("empty-order").style.display = "none";
    document.getElementById("checkout").style.display = "block";

    // ADD A DIV TO CONTAIN THE PRODUCT IMAGE AND OTHER DETAILS
    orderDetails = document.createElement("div");
    orderDetails.id = `order-${productTag}`;
    // console.log(orderDetails);

    // 1. Create and Add Product Thumbnail
    //Use `src` of product image to get `src` of thumbnail
    productImage = document.getElementById("product-image");
    srcSplit = productImage.src.split(".");
    productThumbnailSrc = srcSplit[srcSplit.length - 2]
      .slice(3)
      .concat("-", "thumbnail")
      .concat(".", "jpg");
    productThumbnail = document.createElement("img");
    productThumbnail.src = productThumbnailSrc;
    productThumbnail.id = `thumbnail-${productTag}`;

    if (productCart[productTag] != 0) {
      click--;
      document
        .getElementById("ordered-items")
        .removeChild(document.getElementById(orderDetails.id));
    }

    //Add to `orderDetails`
    orderDetails.appendChild(productThumbnail);

    //2. Create and Add Product info.
    productInfo = document.createElement("div");
    productInfo.alt = "Product Infomation";
    // Product Name
    productName = document.createElement("p");
    productName.innerHTML = "Fall Limited Edition Sneakers";
    // Product Price
    productPriceDetails = document.createElement("p");
    // Updating number of particular products ordered
    productCount += productCart[productTag];
    productCart[productTag] = productCount;
    productPrice = 125 * productCount;
    productPriceDetails.innerHTML = `$125.00 x ${productCount} <strong>$${productPrice}</strong>`;
    //Add to `productInfo`
    productInfo.appendChild(productName);
    productInfo.appendChild(productPriceDetails);
    //Add `productInfo` to `orderDetails`
    orderDetails.appendChild(productInfo);

    //3. Create and Add Delete button
    deleteProductOrder = document.createElement("img");
    deleteProductOrder.src = "assets/images/icon-delete.svg";
    deleteProductOrder.id = `delete-${productTag}`;

    deleteProductOrder.onclick = (e) => {
      // console.log(orderDetails);
      click--;
      productCart[e.target.id.split("-")[1]] = 0;
      document
        .getElementById("ordered-items")
        .removeChild(e.target.parentElement);
      if (click == 0) {
        document.getElementById("empty-order").style.display = "block";
        document.getElementById("checkout").style.display = "none";
      }
      // console.log(productCart);
    };
    //Add to `orderDetails`
    orderDetails.appendChild(deleteProductOrder);
    // console.log(orderDetails);
    // console.log(productCart);
    //Add `orderDetails` to the cart pop-up
    document.getElementById("ordered-items").appendChild(orderDetails);
    //Restart prodcut count
    productCount = 0;
    document.getElementById("product-count--number").innerHTML = productCount;
  }
};

//--------SHOW NEXT/PREVIOUS PRODUCT FUNCTIONALITY----------
prevImage = document.getElementsByClassName("prev-icon")[0];
prevLightBoxImage = document.getElementsByClassName("prev-icon")[1];
nextImage = document.getElementsByClassName("next-icon")[0];
nextLightBoxImage = document.getElementsByClassName("next-icon")[1];
thumbnailsDesktop = new Array(
  ...document.getElementsByClassName("thumbnail-desktop")
);
thumbnailsDesktopLightBox = new Array(
  ...document.getElementsByClassName("thumbnail-desktop-lightbox")
);
//Show Previous image
prevImage.onclick = () => {
  if (productTag == 1) {
    productTag = 4;
  } else {
    productTag--;
  }

  productImage = document.getElementById("product-image");
  srcSplit = productImage.src.split(".");
  productImage.src = srcSplit[srcSplit.length - 2]
    .slice(3, -2)
    .concat("-", `${productTag}`)
    .concat(".", "jpg");
  document.getElementById("product-image-desktop").src = productImage.src;

  thumbnailsDesktop.forEach((element, index) => {
    console.log(index);
    if (index + 1 == productTag) {
      thumbnailsDesktop[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktop[index].id = "";
    }
  });
  thumbnailsDesktopLightBox.forEach((element, index) => {
    if (index + 1 == productTag) {
      thumbnailsDesktopLightBox[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktopLightBox[index].id = "";
    }
  });
};
prevLightBoxImage.onclick = () => {
  if (productTag == 1) {
    productTag = 4;
  } else {
    productTag--;
  }

  productImage = document.getElementById("product-image");
  srcSplit = productImage.src.split(".");
  productImage.src = srcSplit[srcSplit.length - 2]
    .slice(3, -2)
    .concat("-", `${productTag}`)
    .concat(".", "jpg");
  document.getElementById("product-image-desktop").src = productImage.src;

  thumbnailsDesktop.forEach((element, index) => {
    console.log(index);
    if (index + 1 == productTag) {
      thumbnailsDesktop[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktop[index].id = "";
    }
  });
  thumbnailsDesktopLightBox.forEach((element, index) => {
    if (index + 1 == productTag) {
      thumbnailsDesktopLightBox[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktopLightBox[index].id = "";
    }
  });
};

//Show Next image
nextImage.onclick = () => {
  if (productTag == 4) {
    productTag = 1;
  } else {
    productTag++;
  }

  productImage = document.getElementById("product-image");
  srcSplit = productImage.src.split(".");
  productImage.src = srcSplit[srcSplit.length - 2]
    .slice(3, -2)
    .concat("-", `${productTag}`)
    .concat(".", "jpg");

  document.getElementById("product-image-desktop").src = productImage.src;

  thumbnailsDesktop.forEach((element, index) => {
    // console.log(index);
    if (index + 1 == productTag) {
      thumbnailsDesktop[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktop[index].id = "";
    }
  });
  thumbnailsDesktopLightBox.forEach((element, index) => {
    if (index + 1 == productTag) {
      thumbnailsDesktopLightBox[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktopLightBox[index].id = "";
    }
  });
};
nextLightBoxImage.onclick = () => {
  if (productTag == 4) {
    productTag = 1;
  } else {
    productTag++;
  }

  productImage = document.getElementById("product-image");
  srcSplit = productImage.src.split(".");
  productImage.src = srcSplit[srcSplit.length - 2]
    .slice(3, -2)
    .concat("-", `${productTag}`)
    .concat(".", "jpg");
  document.getElementById("product-image-desktop").src = productImage.src;

  thumbnailsDesktop.forEach((element, index) => {
    // console.log(index);
    if (index + 1 == productTag) {
      thumbnailsDesktop[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktop[index].id = "";
    }
  });
  thumbnailsDesktopLightBox.forEach((element, index) => {
    if (index + 1 == productTag) {
      thumbnailsDesktopLightBox[index].id = "thumbnail-selected";
    } else {
      thumbnailsDesktopLightBox[index].id = "";
    }
  });
};

//------CHECKOUT-------
checkout = document.getElementById("checkout");
checkout.onclick = () => {
  alert("Thanks for your patronage");
  location.reload();
};

thumbnailsDesktop = new Array(
  ...document.getElementsByClassName("thumbnail-desktop")
);
thumbnailsDesktopLightBox = new Array(
  ...document.getElementsByClassName("thumbnail-desktop-lightbox")
);
thumbnailsDesktop.forEach((element) => {
  //Giving all thumbnails the characteristic to change the main product when selected
  element.onclick = (e) => {
    e.target.id = "thumbnail-selected";
    element.id = "thumbnail-selected";
    lightboxKey = thumbnailsDesktop.indexOf(e.target);
    thumbnailsDesktopLightBox[lightboxKey].id = "thumbnail-selected";
    thumbnailsDesktop.forEach((element) => {
      if (element != e.target) {
        element.id = "";
        lightboxKey = thumbnailsDesktop.indexOf(element);
        thumbnailsDesktopLightBox[lightboxKey].id = "";
      }
    });

    thumbNailSrc = e.target.src;
    splitThumbnailSrc = thumbNailSrc.split("-");
    productTag = splitThumbnailSrc[splitThumbnailSrc.length - 2];

    document.getElementById("product-image").src =
      splitThumbnailSrc.slice(0, -1).join("-") + ".jpg";
    //Change for LightBox Behind the scene too
    document.getElementById("product-image-desktop").src =
      splitThumbnailSrc.slice(0, -1).join("-") + ".jpg";
  };
});
thumbnailsDesktopLightBox.forEach((element) => {
  //Giving all thumbnails the characteristic to change the main product when selected
  element.onclick = (e) => {
    e.target.id = "thumbnail-selected";
    element.id = "thumbnail-selected";
    key = thumbnailsDesktopLightBox.indexOf(e.target);
    thumbnailsDesktop[key].id = "thumbnail-selected";
    thumbnailsDesktopLightBox.forEach((element) => {
      if (element != e.target) {
        element.id = "";
        key = thumbnailsDesktopLightBox.indexOf(element);
        thumbnailsDesktop[key].id = "";
      }
    });

    thumbNailSrc = e.target.src;
    splitThumbnailSrc = thumbNailSrc.split("-");
    productTag = splitThumbnailSrc[splitThumbnailSrc.length - 2];

    document.getElementById("product-image").src =
      splitThumbnailSrc.slice(0, -1).join("-") + ".jpg";
    //Change for LightBox Behind the scene too
    document.getElementById("product-image-desktop").src =
      splitThumbnailSrc.slice(0, -1).join("-") + ".jpg";
  };
});

mainProductImage = document.getElementById("product-image");
lightbox = document.getElementsByClassName("product-images-desktop")[0];
closeLightbox = document.getElementById("close-lightbox");
// Lightbox Show
if (window.innerWidth >= 1000) {
  mainProductImage.onclick = () => {
    lightbox.style.display = "flex";
  };
}

//Lightbox Hide
closeLightbox.onclick = () => {
  lightbox.style.display = "none";
};

document.querySelectorAll("img").forEach((element) => {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.target.click();
    }
  });
});
