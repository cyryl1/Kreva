const scrollers = document.querySelectorAll(".scroller");
const logo = document.querySelector(".header__logo");
const animationLogo = document.getElementById("animation__logo");
const hamburger = document.querySelector(".hamburger__menu");
const mobileNavigation = document.querySelector(".mobile__nav");
const loader = document.getElementById("preloader");
const page = document.getElementById("page");

const addAnimation = () => {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);

      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
      2;
    });
  });
};

window.addEventListener("load", () => {
  loader.classList.add("hidden");
  page.classList.add("visible");
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNavigation.classList.toggle("active");
});

mobileNavigation.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileNavigation.classList.remove("active");
    hamburger.classList.remove("active");
  }
});

if (!window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
  addAnimation();
}

if (window.matchMedia("(prefers-color-scheme:light)").matches) {
  logo.src = "Assets/Icons/logo_green.png";
  animationLogo.src = "Assets/Icons/green_center_logo.png";
}

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form field values
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone = document.getElementById('tel').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate that all required fields are filled
  if (!firstName || !lastName || !company || !phone || !email || !message) {
    alert('Please fill out all required fields.');
    return;
  }

  // Construct the email subject
  const subject = encodeURIComponent(`Project Inquiry from ${firstName} ${lastName}`);

  // Construct the email body
  const body = encodeURIComponent(
    `First Name: ${firstName}\n` +
    `Last Name: ${lastName}\n` +
    `Company: ${company}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}`
  );

  // Create the mailto link
  const mailtoLink = `mailto:contact.kreva@gmail.com?subject=${subject}&body=${body}`;

  // Redirect to the mailto link to open the email client
  window.location.href = mailtoLink;
}
