/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-sidebar')
  })
}

/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-sidebar')
  })
}

/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContent = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target)

    tabContent.forEach(tabContents => {
      tabContents.classList.remove('skills_active')
    })

    target.classList.add('skills_active')

    tabs.forEach(tab => {
      tab.classList.remove('skills_active')
    })

    tab.classList.add('skills_active')
  })
})

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortifolio = mixitup('.work_container', {
  selectors: {
    target: '.work_card'
  },
  animation: {
    duration: 300
  }
})

/*===== Link Active Work =====*/

const linkWork = document.querySelectorAll('.work_item')

function activeWork() {
  linkWork.forEach(l => l.classList.remove('active-work'))
  this.classList.add('active-work')
}

linkWork.forEach(l => l.addEventListener('click', activeWork))

/*===== Work Popup =====*/
document.addEventListener('click', e => {
  if (e.target.classList.contains('work_button')) {
    togglePortifolioPopup()
    portifolioItemDetails(e.target.parentElement)
  }
})

function togglePortifolioPopup() {
  document.querySelector('.portifolio_popup').classList.toggle('open')
}

document
  .querySelector('.portifolio_popup-close')
  .addEventListener('click', togglePortifolioPopup)

function portifolioItemDetails(portifolioItem) {
  document.querySelector('.pp_thumbnail img').src =
    portifolioItem.querySelector('.work_img').src
  document.querySelector('.portifolio_popup-subtitle span').innerHTML =
    portifolioItem.querySelector('.work_title').innerHTML
  document.querySelector('.portifolio_popup-body').innerHTML =
    portifolioItem.querySelector('.portifolio_item-details').innerHTML
}

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services_modal'),
  modelBtns = document.querySelectorAll('.services_button'),
  modalCloses = document.querySelectorAll('.services_modal-close')

let modal = function (modalClick) {
  modalViews[modalClick].classList.add('active-modal')
}

modelBtns.forEach((modelBtns, i) => {
  modelBtns.addEventListener('click', () => {
    modal(i)
  })
})

modalCloses.forEach(modalClose => {
  modalClose.addEventListener('click', () => {
    modalViews.forEach(modalView => {
      modalView.classList.remove('active-modal')
    })
  })
})

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper('.testimonials_container', {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    576: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 48
    }
  }
})

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll('.input')

function focusFunc() {
  let parent = this.parentNode
  parent.classList.add('focus')
}

function blurFunc() {
  let parent = this.parentNode
  if (this.value == '') {
    parent.classList.remove('focus')
  }
}

inputs.forEach(input => {
  input.addEventListener('focus', focusFunc)
  input.addEventListener('blur', blurFunc)
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
//get all sections that have an id defined
const sections = document.querySelectorAll('section[id]')

//add an event listener listening for scroll
window.addEventListener('scroll', navHighlighter)

function navHighlighter() {
  //get current scroll position
  let scrollY = window.pageYOffset
  //Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')
    /* - If our current scroll position enters the space where current section on screen is, add .active class to
        corresponding navigation link, ense remove it
        - To know which link needs an active class, we use sectionId variable we are getting while looping through
        sections as an selector */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav_menu a[href*=' + sectionId + ']')
        .classList.add('active-link')
    } else {
      document
        .querySelector('.nav_menu a[href*=' + sectionId + ']')
        .classList.remove('active-link')
    }
  })
}

/*=============== SEND FORM FOR EMAIL ===============*/
document
  .getElementById('contact-form')
  .addEventListener('submit', function (event) {
    event.preventDefault() // Prevents the default form submission

    // Get the form data
    const formData = new FormData(this)

    // Sends the data to Formspree
    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          alert('Message sent successfully!')
          this.reset() // Clears the form after submission
        } else {
          alert('Failed to send the message.')
        }
      })
      .catch(error => {
        alert('Error: ' + error.message)
      })
  })
