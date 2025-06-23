// ==============================
// ✅ HERO SLIDESHOW (only if home page)
const heroSection = document.getElementById("hero");

if (heroSection) {
  const slides = [
    {
      title: "Fresh Milk",
      description: "Delivered daily from our dairy to your doorstep.",
      bg: "assets/bg-milk.jpg",
      images: ["assets/2tea.png"]
    },
    {
      title: "Pure Ghee",
      description: "Traditional flavor, made with love.",
      bg: "assets/bg-ghee.jpg",
      images: ["assets/ghee.png"]
    },
    {
      title: "Healthy Oils",
      description: "Cold-pressed oils for better health.",
      bg: "assets/bg-oil.jpg",
      images: ["assets/oil1.png", "assets/oil2.png", "assets/oil3.png"]
    },
    {
      title: "Buttermilk",
      description: "Cool, refreshing and tasty.",
      bg: "assets/bg-buttermilk.jpg",
      images: ["assets/buttermilk.png"]
    },
    {
      title: "Fresh Paneer",
      description: "Soft, creamy and full of protein.",
      bg: "assets/bg-paneer.jpg",
      images: ["assets/paneer.png"]
    }
  ];

  let currentSlide = 0;
  let interval;

  const title = document.getElementById("product-title");
  const desc = document.getElementById("product-description");
  const imgDiv = document.getElementById("product-image");
  const hero = document.getElementById("hero");

  function getClassName(title) {
    return title.toLowerCase().replace(/\s/g, '-');
  }

  function showSlide(index) {
    const slide = slides[index];
    hero.style.animation = "none";
    void hero.offsetWidth;
    hero.style.animation = "fadeBg 1s ease-in-out";

    title.textContent = slide.title;
    desc.textContent = slide.description;
    hero.style.backgroundImage = `url('${slide.bg}')`;
    imgDiv.innerHTML = "";

    const className = getClassName(slide.title);

    if (slide.images.length > 1) {
      let i = 0;
      const showNext = () => {
        if (i >= slide.images.length) return;
        const img = document.createElement("img");
        img.src = slide.images[i];
        img.className = className;
        img.style.animation = "slideInRight 0.8s ease forwards";
        imgDiv.innerHTML = "";
        imgDiv.appendChild(img);
        i++;
        setTimeout(showNext, 1500);
      };
      showNext();
    } else {
      const img = document.createElement("img");
      img.src = slide.images[0];
      img.className = className;
      img.style.animation = "slideInRight 1s ease forwards";
      imgDiv.appendChild(img);
    }
  }

  function startSlideShow() {
    showSlide(currentSlide);
    interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  startSlideShow();
}

// ==============================
// ✅ WHY CHOOSE US SECTION (safe check)
const whySection = document.getElementById("why-choose-us");
if (whySection) {
  const reasons = [
    {
      title: "🐄 Farm Fresh & Organic",
      desc: "Straight from our farms, unprocessed and pure.",
      bg: "assets/bg-farm.jpg"
    },
    {
      title: "🚚 Fast & Cold Delivery",
      desc: "Delivered within hours in cold-chain vehicles.",
      bg: "assets/why-bg-delivery.jpg"
    },
    {
      title: "🧼 Hygienic Processing",
      desc: "Handled with utmost cleanliness and care.",
      bg: "assets/why-bg-hygiene.jpg"
    },
    {
      title: "🧪 Quality Tested Daily",
      desc: "Strict daily lab checks for guaranteed purity.",
      bg: "assets/why-bg-quality.jpg"
    }
  ];

  let currentReason = 0;

  function nextReason() {
    currentReason = (currentReason + 1) % reasons.length;

    const container = document.getElementById("why-container");

    container.classList.remove("flip-anim");
    void container.offsetWidth;
    container.classList.add("flip-anim");

    document.getElementById("reason-title").textContent = reasons[currentReason].title;
    document.getElementById("reason-desc").textContent = reasons[currentReason].desc;

    whySection.style.backgroundImage = `url('${reasons[currentReason].bg}')`;
  }

  window.onload = () => {
    whySection.style.backgroundImage = `url('${reasons[0].bg}')`;
  };

  window.nextReason = nextReason;
}

// ==============================
// ✅ GALLERY FILTER + MODAL
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")?.classList.remove("active");
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });

    // MODAL
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    galleryItems.forEach(item => {
      item.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = item.src;
      });
    });

    window.closeModal = function () {
      modal.style.display = "none";
    };
  }
});
