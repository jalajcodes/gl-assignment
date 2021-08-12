// Accordion

const accordions = document.querySelectorAll(".curriculum__accordion");

const openAccordion = (accordion) => {
	const content = accordion.querySelector(".curriculum__accordion__content");
	accordion.classList.add("accordion__active");
	content.style.maxHeight = content.scrollHeight + "px";
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

// Slider

const wrapper = document.querySelector('.testimonials__wrapper');
const indicators = document.querySelectorAll('.testimonials__control-indicators button');

let currentTestimonial = 0;

indicators.forEach((item, i) => {
    item.addEventListener('click', () => {
        indicators[currentTestimonial].classList.remove('active');
        wrapper.style.marginLeft = `-${100 * i}%`;
        item.classList.add('active');
        currentTestimonial = i;
    })
})
