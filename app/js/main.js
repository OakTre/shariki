
document.addEventListener("DOMContentLoaded", function(event) {
	const swiper = new Swiper(".swiper-container", {
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 800,
		pagination: {
			el: ".discount__pagination",
		},
		// autoplay: {
		// 	delay: 2500,
		// 	disableOnInteraction: false,
		// },
	});
});
