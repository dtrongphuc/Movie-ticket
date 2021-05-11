const image = (sequelize, type) => {
	const image = sequelize.define('image', {
		id: {
			type: type.INTEGER,
			allownull: false,
			primaryKey: true,
			autoIncrement: true
		},
		image: {
			type: type.STRING,
			allownull: false,
		},
	});


	image.findByMovieId = async (id) => {
		let result = await image.findOne({
			where: {
				movieId	: id,
			},
		});

		return result;
	};

	return image;
};

module.exports = image;

