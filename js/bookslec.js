window.addEventListener("load", function () {
  // let xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function (event) {
  //   let req = event.target;
  //   if (req.readyState === XMLHttpRequest.DONE) {
  //     let data = JSON.parse(req.response);
  //     parseBooks(data);
  //   }
  // };
  // xhr.open("GET", "/json/books.json");
  // xhr.send();

  fetch("/json/books.json")
    .then((res) => res.json())
    .then((result) => parseBooks(result))
    .catch((err) => console.error(err));
  // json data 보관
  let jsonData;
  // 버튼들
  let btns = document.querySelector(".books .btns");
  function parseBooks(_data) {
    jsonData = _data;
    // a 태그 만들기
    let btHtml = ``;
    let dataArr = _data.books;
    for (let i = 0; i < dataArr.length; i++) {
      let temp = `<a href="#book" >${dataArr[i].catename}</a>`;
      btHtml += temp;
    }
    btns.innerHTML = btHtml;

    let aTags = document.querySelectorAll(".books .btns a");
    for (let i = 0; i < dataArr.length; i++) {
      aTags[i].onclick = (event) => {
        event.preventDefault();
        makeList(i);
        aTags.forEach((item) => {
          item.classList.remove("btns-active");
        });
        aTags[i].classList.add("btns-active");
      };
    }
    // 포커스 적용
    aTags[0].classList.add("btns-active");

    makeList(0);
  }

  // 목록 html 만들기
  let booksSwiper;
  function makeList(_idx) {
    let html = ``;
    let listData = jsonData.books[_idx].list;
    let listTotal = listData.length;

    for (let i = 0; i < listTotal; i++) {
      let obj = listData[i];
      let temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="books-link">
					<div class="books-img">
						<img src="./images/${obj.img}" alt="${obj.alt}" />
					</div>
					<div class="books-info">
						<p class="books-info-title">${obj.title}</p>
						<p class="books-info-price"><em>${obj.price}</em>원</p>
					</div>
				</a>
			</div>
			`;
      html += temp;
    }

    let swBooksWrapper = document.querySelector(".sw-books .swiper-wrapper");
    swBooksWrapper.innerHTML = html;
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
});
