const image = (sequelize, type) => {
	const image = sequelize.define('image', {
		id: {
			type: type.INTEGER,
			allownull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		publicUrl: {
			type: type.STRING,
			allownull: false,
		},
		publicId: {
			type: type.STRING,
			allownull: false,
		},
	});

	image.findByMovieId = async (id) => {
		let result = await image.findOne({
			where: {
				movieId: id,
			},
		});

		return result;
	};

	return image;
};

module.exports = image;
