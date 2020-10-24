import { data } from "./data.js";
console.log("Hello I am index js");
console.log(data);
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

//++++++++++++++++++++++++++++++++++++++++RAMDA++++++++++++++++++++

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

    if (wrapperPosition - windowHeight / 1.25 <= 0) {
      [...elements].map((el) => {
        el.classList.add(classAdd);
        if (classRemove) {
          el.classList.remove(classRemove);
        }
      });
    }
  }
);

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

for (var x = 1; x < 5; x++) console.log(x);

//HANDLING ACTIVE CLASS of NAVLINK AFTER CLICKING

const addActiveClass = (link) => {
  if (link.className.includes("active"))
    [...allNavLinks].map((l) => {
      // console.log(l, link);
      l.classList.remove("active");
    });
  link.classList.add("active");
};

const addActiveClassOnScroll = () => {
  const sections = document.querySelectorAll("section");
  // console.log("work");
  [...sections].map(
    (s, index) =>
      s.getBoundingClientRect().top - windowHeight / 1.5 <= 0 &&
      addActiveClass(allNavLinks[index])
  );
};

const contactMeAnchor = document.getElementById("contact-me-anchor");
const allNavLinks = document.querySelectorAll(".nav-link");

const documentClick = fn(document, "click");

windowScroll(addActiveClassOnScroll);
