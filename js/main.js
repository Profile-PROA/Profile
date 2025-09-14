// Cabeçalho responsivo
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 3 + 0.3}s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  handleResize() {
    if (window.innerWidth > 1024) {
      this.navList.classList.remove(this.activeClass);
      this.mobileMenu.classList.remove(this.activeClass);
      this.navLinks.forEach(link => (link.style.animation = "")); // limpa animações
    }
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.handleResize);
  }

  init() {
    if (this.mobileMenu) {
        this.addClickEvent();
        this.addResizeEvent();
    }

    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".btn-mobile",
  "#box-nav-reponsive",
  "#box-nav-reponsive ul li",
);

mobileNavbar.init();

// Cabeçalho fixo no topo com efeito
window.addEventListener("scroll", () => {
    const navMobile = document.getElementById("box-nav-reponsive");
    const header = document.getElementById("header-site");
    
    header.classList.toggle("header-fixed-top", window.scrollY > 0);
    navMobile.classList.toggle("nav-fix", window.scrollY > 0)
});