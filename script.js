const scrollers = document.querySelectorAll(".scroller");
const logo = document.querySelector(".header__logo");
const animationLogo = document.getElementById("animation__logo");
const hamburger = document.querySelector(".hamburger__menu");
const mobileNavigation = document.querySelector(".mobile__nav");
const loader = document.getElementById("preloader");
const page = document.getElementById("page");
const BASE_URL = "https://kreva-backend.vercel.app"

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

const listItems = document.querySelectorAll('.mobile__nav ul li');

listItems.forEach(li => {
  li.addEventListener('click', () => {
    const link = li.querySelector('a');
    if (link) {
      // Redirect to the href of the <a>
      window.location.href = link.href;
    }
  });
});

// Function to show modal with message and icon type ('success' or 'failure')
function showModal(type, title, message) {
  const modal = document.getElementById('feedbackModal');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalDesc');

  // Reset classes
  modalIcon.className = 'modal-icon';

  if (type === 'success') {
    modalIcon.textContent = '✔';
    modalIcon.classList.add('success');
  } else if (type === 'failure') {
    modalIcon.textContent = '✖';
    modalIcon.classList.add('failure');
  }

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  modal.classList.remove('hidden');

  document.getElementById('modalCloseBtn').focus();
}

// Function to hide modal
function hideModal() {
  const modal = document.getElementById('feedbackModal');
  modal.classList.add('hidden');
}

document.getElementById('modalCloseBtn').addEventListener('click', hideModal);

document.getElementById('feedbackModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    hideModal();
  }
});


async function handleFormSubmit(event) {
  event.preventDefault();

  const button = document.getElementById('contact_submit');
  const originalButtonContent = button.innerHTML;

  // Get form values
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const company = document.getElementById('company').value.trim();
  const phone = document.getElementById('tel').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!firstName || !lastName || !company || !phone || !email || !message) {
    showModal('failure', 'Oops!', 'Please fill out all required fields.');
    return;
  }

  button.disabled = true;
  button.innerHTML = `<span class="spinner"></span> <span class="spinner_text">Loading...</span>`;

  const formData = { 
    firstName, 
    lastName, 
    company, 
    phone, 
    email, 
    message 
  };

  try {
    const response = await fetch(`${BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Failed to submit');

    await response.json();

    showModal('success', 'Success!', 'Your message has been sent successfully!');
    document.getElementById('contact_form').reset();
  } catch (error) {
    console.error(error);
    showModal('failure', 'Error', 'An error occurred. Please try again later.');
  } finally {
    button.disabled = false;
    button.innerHTML = originalButtonContent;
  }
}


