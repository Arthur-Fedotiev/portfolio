//jshint esversion:6

$(document).ready(function () {
  $("#flip").click(function () {
    $("#panel").slideDown("slow");
  });

  $("#flip-back").click(function () {
    $("#panel").slideUp("slow");
  });

  $("button[data-filter]").click(function () {
    let showCategoryId = $(this).attr("id");
    let categories = $("div[data-filter]");

    categories.map(function () {
      $(this).hide();

      if (showCategoryId === "all") {
        $(this).show("slow");
      } else if ($(this).data("filter") === showCategoryId) {
        $(this).show("slow");
      }
    });
  });
});

// Vanilla jS code

// function checkPosition(wrapperId) {
//   const wrapper = document.getElementById(wrapperId);
//   const wrapperPosition = wrapper.getBoundingClientRect().top;

//   return function (hidden) {
//     let elements = wrapper.querySelectorAll(`.hidden-${hidden}`);

//     return function (slide) {
//       if (wrapperPosition - windowHeight / 2 <= 0) {
//         [...elements].map((el) => {
//           el.classList.add(`slide-${slide}`);
//           el.classList.remove(`hidden-${hidden}`);
//         });
//       }
//     };
//   };
// }

// const checkPositions = () => {
//   checkPosition("progress-bars")("left")("right"),
//     checkPosition("image-wrapper")("right")("left");
//   checkPosition("projects-wrapper")("right")("left");
//   checkPosition("projects-wrapper")("left")("right");
// };

// window.addEventListener("scroll", checkPositions);
// window.addEventListener("resize", checkPositions);

// initialPos();
// checkPositions();

//RAMDA

let windowHeight;

function initialPos() {
  windowHeight = window.innerHeight;
}

const fn = R.curry((eventEmitter, event, handler) => {
  return eventEmitter.addEventListener(event, handler);
});

const scrollHandler = R.curry(
  (outerId, innerClasses, classAdd, classRemove) => {
    const wrapper = document.getElementById(outerId);
    const wrapperPosition = wrapper.getBoundingClientRect().top;

    let elements = wrapper.querySelectorAll(`.${innerClasses}`);

    if (wrapperPosition - windowHeight / 2 <= 0) {
      [...elements].map((el) => {
        el.classList.add(classAdd);
        if (classRemove) {
          el.classList.remove(classRemove);
        }
      });
    }
  }
);

const navLinkHandler = (e) => {
  if (e.target.tagName != "A") return;
  const clickedNavLink = e.target;
  const allLinks = document.querySelectorAll(".nav-link");
  [...allLinks].map((link) => {
    link.classList.remove("active");
  });
  return clickedNavLink.classList.add("active");
};

// SLIDE-IN animation on Scroll & Resize

const persInfo = scrollHandler("personal-info");
const projectsHeader = scrollHandler("projects-wrapper");
const filterGroup = scrollHandler("filter");
const galleryTiles = scrollHandler("gallery");
const aboutTitle = scrollHandler("about-title");

const slideInCaller = () => {
  aboutTitle("hidden-right", "slide-left", "hidden-right");
  persInfo("hidden-left", "slide-right", "hidden-left");
  persInfo("hidden-right", "slide-left", "hidden-right");
  projectsHeader("hidden-right", "slide-left", "hidden-right");
  filterGroup("btn-filter", "fade-in", "hidden-transparent");
  galleryTiles("card", "come-in", "hidden-transparent");
};

const windowScroll = fn(window, "scroll");
const windowReesize = fn(window, "resize");

initialPos();
slideInCaller();

windowScroll(slideInCaller);
windowReesize(slideInCaller);

const documentClick = fn(document, "click");
documentClick(navLinkHandler);