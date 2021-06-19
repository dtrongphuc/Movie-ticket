var cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'duobkg5np',
	api_key: '771455369247128',
	api_secret: 'Wnh1-diFGg2ACQKYUAV8F5pDAIU',
});

const uploadSingleFile = (file, folder) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload(file, {
				folder,
			})
			.then((result) => {
				if (result) {
					const fs = require('fs');
					fs.unlinkSync(file);
					resolve({
						url: result.secure_url,
						publicId: result.public_id,
					});
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const uploadSingleVideo = (file, folder) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload(file, {
				folder,
				resource_type: 'video',
			})
			.then((result) => {
				if (result) {
					const fs = require('fs');
					fs.unlinkSync(file);
					resolve({
						url: result.secure_url,
						publicId: result.public_id,
					});
				}
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const uploadMultipleFiles = (files, folder) => {
	let resPromise = files.map((file) => uploadSingleFile(file, folder));
	return Promise.all(resPromise);
};

module.exports = {
	uploadSingleFile: uploadSingleFile,
	uploadTrailer: (file) => {
		return uploadSingleVideo(file, 'trailer');
	},
	uploadMovieImages: (files) => {
		return uploadMultipleFiles(files, 'movie');
	},
};
