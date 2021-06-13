let state = {
	offset: 8,
	limit: 8,
	total: 0,
};
const toggleLoading = () => {
	document.querySelector('.loading')?.classList.toggle('active');
};

const countMovies = async () => {
	try {
		let response = await axios.get('movie/count/hot');
		state.total = response.count;
		if (state.offset >= state.total) {
			document.querySelector('.btn__load-more').style.display = 'none';
		}
	} catch (error) {
		console.log(error);
	}
};

document.addEventListener('DOMContentLoaded', () => {
	// Axios config
	axios.defaults.baseURL = `${location.origin}/api`;

	axios.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			toggleLoading();
			return config;
		},
		function (error) {
			// Do something with request error
			toggleLoading();
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	axios.interceptors.response.use(
		(response) => {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			toggleLoading();
			return response.data;
		},
		(error) => {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			toggleLoading();
			return Promise.reject(error);
		}
	);

	document.querySelectorAll('.movie-item__img')?.forEach((element) => {
		element.style.height = `${(334 * element.offsetWidth) / 228}px`;
	});

	countMovies();

	document
		.querySelector('.btn__load-more')
		?.addEventListener('click', async (e) => {
			try {
				const response = await axios.get('/movie/hot', {
					params: {
						offset: state.offset,
						limit: state.limit,
					},
				});

				state.offset += response.movies.length;
				response.movies.forEach((movie, index) => {
					let div = document.createElement('div');
					div.classList.add('col-3', 'col-sm-12', 'col-md-6', 'col-lg-4');
					div.innerHTML = `<div class="movie-item">
            <div class="movie-item__top">
              <div
                class="movie-item__img"
                style="background-image: url('${movie.posterUrl}')"
              ></div>
              <span class="movie-item__number rank">${
								state.offset + index + 1
							}</span>
              <div class="movie-item__overlay">
                <button class="btn-movie__overlay">
                  <a href="/ticket/book">Đặt vé</a>
                </button>
                <button class="btn-movie__overlay">
                  <a href="/detail/${movie.id}">Chi tiết</a>
                </button>
              </div>
            </div>
            <div class="movie-item__middle">
              <a href="/">
                <p class="movie-item__name">${movie.name}</p>
              </a>
            </div>
            <div class="movie-item__bottom">
              <span class="movie-item__description"
                >${movie.time} phút</span
              >
              <span class="movie-item__description">
                ${moment(movie.openingDay).format('DD/MM/YY')}
              </span>
            </div>
          </div>`;
					document.querySelector('.movie-section > .row').appendChild(div);
				});
			} catch (error) {
				console.log(error);
			}
		});
});
