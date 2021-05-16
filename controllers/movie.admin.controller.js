const models = require('../db/connection');
const cloudinary = require('../helpers/cloudinary');
class MovieController {
	index(req, res) {
		res.render('admin/manager/movie');
	}

	async getData(req, res) {
		var data = await models.Movie.findAll({
			order: [['id', 'DESC']],
		});
		res.status(200).json(data);
	}

	async delete(req, res) {
		var id = req.params.id;
		await models.Movie.destroy({
			where: {
				id: id,
			},
		});
		res.redirect('/admin/phim');
	}

	async add(req, res) {
		try {
			var { name, description, time, starttime, director } = req.body;
			const { imagePoster, images, video } = req.files;
			let [posterUploaded, imagesUploaded, trailerUploaded] = await Promise.all(
				[
					cloudinary.uploadSingleFile(imagePoster[0].path, 'movie'),
					cloudinary.uploadMovieImages(images.map((image) => image.path)),
					cloudinary.uploadTrailer(video[0].path),
				]
			);

			let movie = await models.Movie.create({
				name: name,
				time: time,
				openingDay: starttime,
				description: description,
				directors: director,
				posterUrl: posterUploaded.url,
				posterPublicId: posterUploaded.publicId,
				trailerUrl: trailerUploaded.url,
				trailerPublicId: trailerUploaded.publicId,
			});

			await Promise.all(
				imagesUploaded.map(async (image) => {
					let newImage = await models.Image.create({
						publicUrl: image.url,
						publicId: image.publicId,
					});

					return newImage.setMovie(movie);
				})
			);

			return res.redirect('/admin/phim');
		} catch (error) {
			console.log(error);
			return res.redirect('/admin/phim');
		}
	}

	async detail(req, res, next) {
		const id = req.params.id;

		models.Movie.findOne({
			where: {id: id},
			include: [
				{
					model: models.Image,
				}
			]
		})
		.then(movie => {
			return res.render('admin/manager/detailMovie', {movie});
		})
		.catch(()=>{
			res.send('ko tòn tại')
		})
			
		// return res.render('admin/manager/detailMovie');
		
	}
}

module.exports = new MovieController();
