let MainPrice = 0;

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return MainPrice += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return MainPrice -= currentPrice;
};


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

	// работа с корзиной
	const productButton = document.querySelectorAll(".product-button");
	const myModal = document.querySelector(".modal");
	const productContainer = myModal.querySelector(".cart-modal__list");
	const fullPrice = document.querySelector(".fullPrice");
	const cartQuantity = document.querySelector(".cartQuantity");

	const printFullPrice = function() {
		fullPrice.textContent = ` ${normalPrice(MainPrice)}`;
	};

	const printQuantity = function(num) {
		cartQuantity.textContent = num;
	};

	productButton.forEach(function(el){
		el.addEventListener("click", function(e){
			e.preventDefault();

			const id = e.currentTarget.dataset.id;
			const price = e.currentTarget.dataset.price;
			const summ = e.currentTarget.dataset.summ;
			const quant = e.currentTarget.dataset.quant;
			const link = e.currentTarget.dataset.link;
			const name = e.currentTarget.dataset.name;
			const img = e.currentTarget.dataset.img;

			productContainer.insertAdjacentHTML("afterbegin", `
				<li class="mini-cart__item" data-id="${id}" data-price="${price}" data-summ="${summ}">
					<div class="mini-cart__delete">
						<svg viewBox="-40 0 427 427.00131" xmlns="http://www.w3.org/2000/svg">
							<path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
							<path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
							<path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"/>
							<path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"/>
						</svg>
					</div>
					<a class="mini-cart__logo cart-modal__name" href="${link}">
						<img class="mini-cart__img" src="${img}" alt="${name}">
						<span>${name}</span>
					</a>
					<div class="mini-cart__price cart-modal__price">
						<span>${normalPrice(price)} руб.</span>
					</div>
					<div class="mini-cart__quant cart-modal__quant">
						<div class="quant">
							<span class="quant__minus mini-cart__quantMinus">-</span>
							<input class="quant__input mini-cart__quantInput" type="text" value="${quant}" maxlength="3">
							<span class="quant__plus mini-cart__quantPlus">+</span>
						</div>
					</div>
					<div class="mini-cart__summ cart-modal__summ">
						<span class="cartItemSumm">${normalPrice(summ)}</span>
						<span>руб.</span>
					</div>
				</li>
			`)

			// количество товаров в корзине
			let cartItemNumber = document.querySelectorAll(".mini-cart__item").length;
			printQuantity(cartItemNumber);

			// показываем количество если товаров больше 0
			if (cartItemNumber > 0) {
				document.querySelector(".cart-quant").style.display = "block";
			}

			// прописываем общую цену всех товаров
			plusFullPrice(Number(summ));
			printFullPrice();

			// заменяем текст в кнопке карточки на "в корзине"
			el.closest(".catalog__product-button").classList.add("_disabled");
			setTimeout(function(){
				el.innerHTML = "В корзине";
			}, 250)
		})
	});

	// кнопка удаления товара
	myModal.addEventListener("click", function(e){
		if (e.target.classList.contains("mini-cart__delete")) {
			let self = e.target;
			let cart = self.closest(".mini-cart__item");
			let cartPrice = cart.dataset.price;
			let cartSumm = cart.dataset.summ;
			let id = cart.dataset.id;
			let cartProduct = document.querySelector(`.catalog__product[data-id="${id}"]`);

			minusFullPrice(Number(cartSumm));
			printFullPrice();

			cart.remove();

			let cartItemNumber = document.querySelectorAll(".mini-cart__item").length;

			// скрываем количество если товаров равно 0
			if (cartItemNumber == 0) {
				document.querySelector(".cart-quant").style.display = "none";
			}

			printQuantity(cartItemNumber);

			cartProduct.querySelector(".cart-button").classList.remove("_disabled");
			cartProduct.querySelector(".product-button").innerHTML = "В корзину";
			cartProduct.querySelector(".product-button").setAttribute("data-summ", `${Number(cartPrice)}`);
			cartProduct.querySelector(".product-button").setAttribute("data-quant", "1");
			cartProduct.querySelector(".quant__input").value = 1;
		}
	})

	// работа с количеством
	const quant = document.querySelectorAll(".quant");
	const quantInput = document.querySelectorAll(".quant__input");

	const quantChange = function(el, text) {
		let parent = el.closest(".quant");
		let cartButton = parent.closest(".cart-button");
		let id = parent.dataset.id;
		let price = parent.dataset.price;
		let input = parent.querySelector(".quant__input");

		if (text === "plus") {
			var val = parseInt(input.value) + 1;
			let fullprice = val * Number(price);

			cartButton.querySelector(".product-button").setAttribute("data-summ", `${fullprice}`);
			cartButton.querySelector(".product-button").setAttribute("data-quant", `${val}`);
		} else if (text === "minus") {
			var val = parseInt(input.value) - 1;

			if (val == 0) {
				cartButton.querySelector(".product-button").setAttribute("data-summ", `${Number(price)}`);
				cartButton.querySelector(".product-button").setAttribute("data-quant", "1");
			} else {
				let fullprice = val * Number(price);

				cartButton.querySelector(".product-button").setAttribute("data-summ", `${fullprice}`);
				cartButton.querySelector(".product-button").setAttribute("data-quant", `${val}`);
			}
		}

		input.value = val;

		if (input.value == 0) {
			input.value = 1
		}
	}

	if (quant) {
		quant.forEach(function(el){
			el.addEventListener("click", function(e){
				e.preventDefault();

				if(e.target.classList.contains("quantChange__plus")) {
					quantChange(e.target, "plus")
				}

				if(e.target.classList.contains("quantChange__minus")) {
					quantChange(e.target, "minus")
				}
			});

		})
	}
	quantInput.forEach(function(el) {
		el.addEventListener("keyup", function(e){
			let self = e.currentTarget;

			if (self.value == "0" || self.value == "") {
				self.value = 1;
			}
		})
	})

	// работа с количеством в корзине
	const miniCartQuantChange = function(el, text) {
		let parent = el.closest(".quant");
		let id = parent.closest(".mini-cart__item").dataset.id;
		let price = parent.closest(".mini-cart__item").dataset.price;
		let input = parent.querySelector(".quant__input");

		if (text === "plus") {
			var val = parseInt(input.value) + 1;
			let summ = val * Number(price);
			MainPrice += Number(price);
			let fullPrice = priceWithoutSpaces(parent.closest(".cart-modal__top").querySelector(".fullPrice").innerHTML);
			parent.closest(".mini-cart__item").querySelector(".cartItemSumm").innerHTML = normalPrice(summ);
			fullPrice = Number(fullPrice) + Number(price);
			parent.closest(".cart-modal__top").querySelector(".fullPrice").innerHTML = ` ${normalPrice(fullPrice)}`;
			let cartProduct = document.querySelector(`.catalog__product[data-id="${id}"]`);
			cartProduct.querySelector(".quant__input").value = val;

		} else if (text === "minus") {
			var val = parseInt(input.value) - 1;

			if (val == 0) {
				parent.closest(".mini-cart__item").querySelector(".cartItemSumm").innerHTML = normalPrice(price);
			} else {
				let summ = val * Number(price);
				MainPrice -= Number(price);
				let fullPrice = priceWithoutSpaces(parent.closest(".cart-modal__top").querySelector(".fullPrice").innerHTML);
				parent.closest(".mini-cart__item").querySelector(".cartItemSumm").innerHTML = normalPrice(summ);
				fullPrice = Number(fullPrice) - Number(price);
				parent.closest(".cart-modal__top").querySelector(".fullPrice").innerHTML = ` ${normalPrice(fullPrice)}`;
				let cartProduct = document.querySelector(`.catalog__product[data-id="${id}"]`);
				cartProduct.querySelector(".quant__input").value = val;
			}
		}

		input.value = val;

		if (input.value == 0) {
			input.value = 1
		}
	}

	const modal = new Modal({
		isOpen: (modal) => {
			const miniCartInput = this.querySelectorAll(".mini-cart__quantInput");

			miniCartInput.forEach(function(el) {
				el.addEventListener("keyup", function(e){
					let self = e.currentTarget;

					if (self.value == "0" || self.value == "") {
						self.value = 1;
					}
				})
			})

		},
		isClose: (modal) => {

		},
	});

	myModal.addEventListener("click", function(e){
		if(e.target.classList.contains("mini-cart__quantPlus")) {
			miniCartQuantChange(e.target, "plus")
			console.log(MainPrice);
		}

		if(e.target.classList.contains("mini-cart__quantMinus")) {
			miniCartQuantChange(e.target, "minus")
			console.log(MainPrice);
		}
	});
});
