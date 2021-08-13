/*****************************************************
 * FORM
 * **************************************************/

const form = document.querySelector(".header__form");
const submitBtn = document.querySelector(".header__form__button");
const formElements = form.elements;

const getFormData = () => {
  let data = {};
  for (const element of formElements) {
    console.log(element);
    if (element.name.length > 0) {
      if (!element.value) return null;
      data[element.name] = element.value;
    }
  }
  return data;
};

// submitBtn.onclick = (e) => {
// 	e.preventDefault();
// 	let data = getFormData();
// 	if (data) {
// 		localStorage.setItem('formdata', JSON.stringify(data));
// 		alert('Form Data Saved!');
// 	} else {
// 		alert('Please fill all the fields!');
// 	}
// };

const populateForm = () => {
  console.log("asasa");
  if (localStorage.key("formdata")) {
    const savedData = JSON.parse(localStorage.getItem("formdata"));
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
  }
};

document.onload = populateForm();

/*****************************************************
 * ACCORDION
 * **************************************************/

const accordions = document.querySelectorAll(".curriculum__accordion");

const openAccordion = (accordion) => {
  const content = accordion.querySelector(".curriculum__accordion__content");
  accordion.classList.add("accordion__active");
  content.style.maxHeight = `${content.scrollHeight + 10}px`;
};

const closeAccordion = (accordion) => {
  const content = accordion.querySelector(".curriculum__accordion__content");
  accordion.classList.remove("accordion__active");
  content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
  const intro = accordion.querySelector(".curriculum__accordion__intro");
  const content = accordion.querySelector(".curriculum__accordion__content");

  intro.onclick = () => {
    if (content.style.maxHeight) {
      closeAccordion(accordion);
    } else {
      accordions.forEach((accordion) => closeAccordion(accordion));
      openAccordion(accordion);
    }
  };
});

/*****************************************************
 * SLIDER
 * **************************************************/

const wrapper = document.querySelector(".testimonials__wrapper");
const indicators = document.querySelectorAll(
  ".testimonials__control-indicators button"
);

const numberOfTestimonials = wrapper.children.length;
wrapper.style.setProperty("--numberOfTestimonials", numberOfTestimonials);

const setIndicators = () => {
  indicators.forEach((indicator, idx) => {
    indicator.classList.remove("active");
    if (
      idx === Number(wrapper.style.getPropertyValue("--currentTestimonial"))
    ) {
      indicator.classList.add("active");
    }
  });
};

indicators.forEach((item, i) => {
  item.addEventListener("click", () => {
    wrapper.style.setProperty("--currentTestimonial", i);
    setIndicators();
  });
});

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const handleGesture = () => {
  if (touchendX < touchstartX) {
    console.log("Swiped left");
    wrapper.style.setProperty(
      "--currentTestimonial",
      Math.min(
        Number(wrapper.style.getPropertyValue("--currentTestimonial")) + 1,
        numberOfTestimonials - 1
      )
    );

    setIndicators();
  }

  if (touchendX > touchstartX) {
    console.log("Swiped right");
    wrapper.style.setProperty(
      "--currentTestimonial",
      Math.max(
        Number(wrapper.style.getPropertyValue("--currentTestimonial")) - 1,
        0
      )
    );

    setIndicators();
  }
};

wrapper.addEventListener(
  "touchstart",
  function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  },
  false
);

wrapper.addEventListener(
  "touchend",
  function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  },
  false
);

/*****************************************************
 * STICKY FOOTER
 * **************************************************/

// const form = document.querySelector('.header__form');

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

const callbackFunction = (entries) => {
  entries.forEach((entry) => {
    let stickyFooter = document.querySelector(".sticky-footer");

    if (entry.isIntersecting === false) {
      stickyFooter.classList.add("visible");
    } else {
      stickyFooter.classList.remove("visible");
    }
  });
};

let observer = new IntersectionObserver(callbackFunction, options);
observer.observe(form);
