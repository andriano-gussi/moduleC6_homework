const btn = document.querySelector('.j-btn-test');
const icon1 = document.querySelector('.j-icon1');
const icon2 = document.querySelector('.j-icon2');

btn.addEventListener('click', () => {
  icon1.classList.toggle('icon_hide');
  icon2.classList.toggle('icon_hide');
});