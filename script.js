// Form

const form = document.querySelector('.header__form');
const submitBtn = document.querySelector('.header__form__button');
const formElements = form.elements;

const getFormData = () => {
	let data = {};
  for (const element of formElements) {
		console.log(element)
    if (element.name.length > 0) {
			if(!element.value)  return null;
      data[element.name] = element.value;
    }
  }
  return data;
}

submitBtn.onclick = (e) => {
	e.preventDefault();
	let data = getFormData();
	if (data) {
		localStorage.setItem('formdata', JSON.stringify(data));
		alert('Form Data Saved!');
	} else {
		alert('Please fill all the fields!');
	}
};

const populateForm = () => {
	console.log("asasa")
  if (localStorage.key('formdata')) {
    const savedData = JSON.parse(localStorage.getItem('formdata'));
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
  }
};

document.onload = populateForm();


// Accordion

const accordions = document.querySelectorAll(".curriculum__accordion");

const openAccordion = (accordion) => {
	const content = accordion.querySelector(".curriculum__accordion__content");
	accordion.classList.add("accordion__active");
	content.style.maxHeight = (content.scrollHeight + 10) + "px";
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

// Sticky Footer

// const form = document.querySelector('.header__form');

let options= {
	root: null,
	rootMargin: '0px',
	threshold: 0
};

const callbackFunction = (entries) => {
	entries.forEach(entry=>{
		let stickyFooter = document.querySelector('.sticky-footer');
		
		if(entry.isIntersecting === false) {
			stickyFooter.classList.add('visible')
		} else {
			stickyFooter.classList.remove('visible')
		}
	})
}

let observer= new IntersectionObserver(callbackFunction,options);
observer.observe(form);
