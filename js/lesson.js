// TAB SLIDER

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabContentItems = document.querySelectorAll(".tab_content_item");
const tabsParent = document.querySelector(".tab_content_items");

let currentIndex = 0;
let slideInterval;

const hideTabContent = () => {
  tabContentBlocks.forEach((block) => {
    block.style.display = "none";
  });
  tabContentItems.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (i = 0) => {
  tabContentBlocks[i].style.display = "block";
  tabContentItems[i].classList.add("tab_content_item_active");
  currentIndex = i;
};

const nextTab = () => {
  let index = currentIndex + 1;
  if (index >= tabContentBlocks.length) {
    index = 0;
  }
  hideTabContent();
  showTabContent(index);
};

const startAutoSlider = () => {
  slideInterval = setInterval(nextTab, 3000);
};

const resetAutoSlider = () => {
  clearInterval(slideInterval);
  startAutoSlider();
};

hideTabContent();
showTabContent(0);
startAutoSlider();

tabsParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabContentItems.forEach((tab, tabIndex) => {
      if (tab === event.target) {
        hideTabContent();
        showTabContent(tabIndex);
        resetAutoSlider(); 
      }
    });
  }
};
