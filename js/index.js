window.onload = function () {
  // 위로 이동하기
  const goTop = document.querySelector(".gotop");
  //goTop 클릭 처리
  goTop.addEventListener("click", function () {
    // 위로 슬라이딩 코드 - 웹브라우저 내장
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
		// 애니메이션 전용 js 라이브러리가 있다
  });

  // Initialize Swiper
  let promotionSwiper = new Swiper(".sw-promotion", {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 1000, //1s
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".promotion .sw-next",
      prevEl: ".promotion .sw-prev",
    },
    pagination: {
      //el=element=요소
      el: ".sw-promotion-pg",
      clickable: true,
    },
    //반응형
    breakpoints: {
      //760px 이상일 때 2장씩
      760: {
        slidesPerView: 2,
      },
    },
  });

  // shopping swiper
  let shoppingSwiper = new Swiper(".sw-shopping", {
    spaceBetween: 10,
    slidesPerView: 5,
    grid: {
      rows: 2,
      fill: "row",
    },
    navigation: {
      nextEl: ".shopping .sw-next",
      prevEl: ".shopping .sw-prev",
    },
    breakpoints: {
      1024: {
        spaceBetween: 32,
        slidesPerView: 3,
        //화면 당 움직일 슬라이드의 개수
        slidesPerGroup: 3,
        grid: {
          rows: 1,
        },
      },
      1280: {
        spaceBetween: 26,
        slidesPerView: 4,
        //화면 당 움직일 슬라이드의 개수
        slidesPerGroup: 4,
        grid: {
          rows: 1,
        },
      },
    },
  });

  // tour Swiper
  let tourSwiper = new Swiper(".sw-tour", {
    slidesPerView: 3,
    grid: {
      rows: 2,
      fill: "row",
    },
    spaceBetween: 10,
    navigation: {
      nextEl: ".tour .sw-next",
      prevEl: ".tour .sw-prev",
    },
    breakpoints: {
      1024: {
        spaceBetween: 24,
        slidesPerView: 2,
        //화면 당 움직일 슬라이드의 개수
        slidesPerGroup: 2,
        grid: {
          rows: 1,
        },
      },
      1280: {
        spaceBetween: 26,
        slidesPerView: 3,
        //화면 당 움직일 슬라이드의 개수
        slidesPerGroup: 3,
        grid: {
          rows: 1,
        },
      },
    },
  });

  // ticket swiper
  let ticketSwiper = new Swiper(".sw-ticket", {
    navigation: {
      nextEl: ".ticket .sw-next",
      prevEl: ".ticket .sw-prev",
    },
    slidesPerView: 5, //5 대신 "auto"
    spaceBetween: 10,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 27,
      },
    },
  });

  // live swiper
  let liveSwiper = new Swiper(".sw-live", {
    navigation: {
      nextEl: ".live .sw-next",
      prevEl: ".live .sw-prev",
    },
    slidesPerView: 4,
    spaceBetween: 10,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 27,
      },
    },
  });

  // book swiper
  let booksSwiper = new Swiper(".sw-books", {
    navigation: {
      nextEl: ".books .sw-next",
      prevEl: ".books .sw-prev",
    },
    slidesPerView: 3,
    spaceBetween: 19,
    grid: {
      rows: 4,
      fill: "row",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
        grid: {
          rows: 1,
        },
      },
      1280: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 27,
        grid: {
          rows: 1,
        },
      },
    },
  });

  // event Swiper
  let eventSwiper = new Swiper(".sw-events", {
    slidesPerView: 3,
    spaceBetween: 27,
    breakpoints: {
      1280: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: ".event .sw-next",
      prevEl: ".event .sw-prev",
    },
  });
};
