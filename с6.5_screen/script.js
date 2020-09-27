const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  alert(`Размеры вашего экрана\nширина: ${window.screen.width}\nвысота: ${window.screen.height}`)
});