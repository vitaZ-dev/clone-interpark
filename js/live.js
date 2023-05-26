/* live */
let liveData;
const liveXhttp = new XMLHttpRequest();
liveXhttp.onreadystatechange = function (event) {
  let req = event.target;
  if (req.readyState === XMLHttpRequest.DONE) {
    liveData = JSON.parse(req.response);
    makeLiveSlide();
  }
};
// liveXhttp.open("GET", "../json/livedata.json");
liveXhttp.open("GET", "../json/livedatas.json");
liveXhttp.send();
function makeLiveSlide() {
  let swLiveHtml = ``;
  for (let i = 0; i < liveData.live_total; i++) {
    let obj = liveData[`live_${i + 1}`];
    let temp = `
			<div class="swiper-slide">
				<a href="${obj.link}" class="live-link">
					<div class="live-img">
						<img src="./images/${obj.pic}" alt="${obj.picAlt}" />
					</div>
					<div class="live-info">
						<div class="live-info-top">
							<span class="live-info-cate">${obj.cate}</span>
							<p class="live-info-title">${obj.title}</p>
						</div>
						<div class="live-info-main">
							<p class="live-info-date">${obj.date}</p>
							<p class="live-info-time">${obj.time}</p>
						</div>
						<div class="live-info-bottom clearfix">
							<div class="live-info-thumb" ${obj.thumb ? `` : `style = "opacity: 0;"`}>
								<img src="./images/${obj.thumb}" alt="${obj.thumbAlt}" />
							</div>
							<div class="live-info-desc">
								<p class="live-info-desc-title">${obj.desTitle}</p>
								<p class="live-info-desc-price">
									<em>${obj.desRatio}%</em> <b>${obj.desPrice}</b>원
								</p>
							</div>
						</div>
					</div>
				</a>
			</div>
			`;
    swLiveHtml += temp;
  }
  let swLiveWrapper = document.querySelector(".sw-live .swiper-wrapper");
  swLiveWrapper.innerHTML = swLiveHtml;
  // swiper
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
}
