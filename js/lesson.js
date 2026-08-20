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



// CONVERTER

const inputs = document.querySelectorAll('.inner_converter input')

const converter = (data) => {
    const rates = { ...data, som: 1 }

    inputs.forEach(sourceInput => {
        sourceInput.oninput = () => {
            const amount = parseFloat(sourceInput.value)

            inputs.forEach(targetInput => {
                if (targetInput !== sourceInput) {
                    if (isNaN(amount) || sourceInput.value.trim() === '') {
                        targetInput.value = ''
                    } else {
                        const somAmount = amount * rates[sourceInput.id]
                        targetInput.value = (somAmount / rates[targetInput.id]).toFixed(2)
                    }
                }
            })
        }
    })
}

const getCurrency = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '/data/converter.json')
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.response)
                    resolve(data)
                } catch (e) {
                    reject(new Error('Ошибка парсинга JSON'))
                }
            } else {
                reject(new Error(`Ошибка HTTP: ${xhr.status}`))
            }
        }
        xhr.onerror = () => {
            reject(new Error('Сетевая ошибка при запросе JSON'))
        }
        xhr.send()
    })
}

getCurrency()
    .then(data => {
        converter(data)
    })
    .catch(error => {
        console.error(error.message)
    })