const modal = document.querySelector(".modal");
const modalOpenBtn = document.querySelector("#btn-get");
const modalCloseBtn = document.querySelector(".modal_close");

let modalTimerId;

const openModal = () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  clearTimeout(modalTimerId);

  window.removeEventListener("scroll", openModalByScroll);
};

const closeModal = () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
};

const openModalByScroll = () => {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 1
  ) {
    openModal();
  }
};

modalOpenBtn.onclick = openModal;

modalCloseBtn.onclick = closeModal;
modal.onclick = (event) =>
  event.target.classList.contains("modal") && closeModal();

modalTimerId = setTimeout(openModal, 10000);

window.addEventListener("scroll", openModalByScroll);
