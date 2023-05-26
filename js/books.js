/**
 * 업데이트 : 리스트 목록 출력 함수화 작업
 * 				 : 데이터 파싱 및 슬라이드 제작
 */
window.addEventListener("load", function () {
  function parseBooks(_cate) {
    const booksXhttp = new XMLHttpRequest();
    booksXhttp.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeBooksSlide(data);
      }
    };

    switch (_cate) {
      case `MD's Pick`:
        booksXhttp.open("GET", "../json/booksdata.json");
        break;
      case `베스트셀러`:
        booksXhttp.open("GET", "../json/booksdata1.json");
        break;
      case `신간추천`:
        booksXhttp.open("GET", "../json/booksdata.json");
        break;
      case `특가할인`:
        booksXhttp.open("GET", "../json/booksdata1.json");
        break;
      default:
        break;
    }
    booksXhttp.send();
  }
  parseBooks(`MD's Pick`);

  let booksSwiper;
  function makeBooksSlide(_data) {
    let swBooksHtml = ``;
    for (let i = 0; i < _data.book_total; i++) {
      let obj = _data[`book_${i + 1}`];
      let temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="books-link">
					<div class="books-img">
						<img src="./images/${obj.pic}" alt="${obj.alt}" />
					</div>
					<div class="books-info">
						<p class="books-info-title">${obj.title}</p>
						<p class="books-info-price"><em>${obj.price}</em>원</p>
					</div>
				</a>
			</div>
			`;
      swBooksHtml += temp;
    }
    let swBooksWrapper = document.querySelector(".sw-books .swiper-wrapper");
    swBooksWrapper.innerHTML = swBooksHtml;
    // swiper
    if (booksSwiper) {
      booksSwiper.destroy();
    }
    booksSwiper = new Swiper(".sw-books", {
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
  }

  // 버튼들에 이벤트
  let btns = document.querySelectorAll(".books .btns a");
  btns[0].onclick = function (event) {
    event.preventDefault();
    parseBooks(`MD's Pick`);
  };
  btns[1].onclick = function (event) {
    event.preventDefault();
    parseBooks(`베스트셀러`);
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    parseBooks(`신간추천`);
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    parseBooks(`특가할인`);
  };
});
