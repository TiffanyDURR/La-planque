const menuMobileButton = document.querySelector(".mobile");
const menuMobileContainer = document.querySelector(".mobile-nav-menu");

menuMobileButton.addEventListener("click", () => {
  menuMobileContainer.classList.toggle("display");
  menuMobileContainer.innerHTML = `
  <ul class="menu-mobile">
  <li><a href="http://212.198.179.227:888/FlappyBird/" target="_blank">Flappy Bird 3D Online</a></li>
  <li><a href="https://tiffanydurr.github.io/Cookie-Clicker/" target="_blank">Cat Clicker</a></li>
  <li><a href="" target="_blank">Tower Defense</a></li>
  <li><a href="">Chat</a></li>
</ul>
  `;
});
