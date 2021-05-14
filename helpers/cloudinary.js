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
	//mới copy trên mạng về
	// uploadMovieVideo:(file) => {
	//     return cloudinary.v2.uploader.upload("file",
	//     { resource_type: "video",
	//       public_id: "video",
	//       chunk_size: 6000000,
	//       eager: [
	//         { width: 300, height: 300, crop: "pad", audio_codec: "none" },
	//         { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],
	//       eager_async: true,
	//       eager_notification_url: "https://mysite.example.com/notify_endpoint" },
	//     function(error, result) {console.log(result, error)});
	// }
};
