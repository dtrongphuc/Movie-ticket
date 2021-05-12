const { User, Cinema, Booking, Ticket, Showtime, Movie,Theater } = require("../db/connection");
const bcrypt = require("bcrypt");

const comparePassword = async (plainPassword, hashedPassword) => {
  let check = await bcrypt.compare(plainPassword, hashedPassword);
  return check;
};
const hashPassword = async (plainPassword) => {
  let hashedPassword = await bcrypt.hash(plainPassword, 10);
  return hashedPassword;
};
class UserController {
  async profile(req, res, next) {
    const { id } = req.params;

    //test
    const joinBooking = await Booking.findAll({
      // include: [
      //   {
      //     model: User,
      //     required: true
      //   },
      // ],
    });


    User.findOne({ where: { id: id } })
      .then((user) => {
        res.render("user/Profile", { user });
      })
      .catch(() => res.send("loi"));
  }
  async updateprofile(req, res, next) {
    const formData = req.body;

    User.findOne({ where: { id: "32465435-f596-4f39-985e-eae06a589b2b" } })
      .then(async (user) => {
        //cập nhật
        user.fullname = formData.name;
        user.phoneNumber = formData.phone;
        await user.save();

        return res.status(200).json();
      })
      .catch(() => res.status(400).json());

    // return res.status(200).json({a: '1'});
  }
  async changePass(req, res, next) {
    const formData = req.body;
    let err_oldPass = "";
    let err_newPass = "";
    let err_confirm = "";
    User.findOne({ where: { id: "32465435-f596-4f39-985e-eae06a589b2b" } })
      .then(async (user) => {
        if (
          !(await comparePassword(formData.old_password, user.hashedPassword))
        ) {
          err_oldPass = "Mật khẩu củ không chính xác";
        }
        if (formData.new_password != formData.confirm) {
          err_confirm = "Mật khẩu mới không khớp";
        }

        if (!err_oldPass && !err_newPass && !err_confirm) {
          let new_hassPassword = await hashPassword(formData.new_password);
          user.hashedPassword = new_hassPassword;
          user.save();
          return res.status(200).json();
        } else {
          return res
            .status(400)
            .json({ err_newPass, err_oldPass, err_confirm });
        }
      })
      .catch(() => res.status(400).json());

    // return res.status(200).json({a: '1'});
  }
}

module.exports = new UserController();
