const btn_UpdateInfo = document.querySelector(".btn_updateinfo");
const UpdateInfoForm = document.querySelector("#updateinfo-form");

btn_UpdateInfo &&
  btn_UpdateInfo.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(btn_UpdateInfo);
    let formData = new FormData(UpdateInfoForm);
    const updateInfoData = {
      email: formData.get("email"),
      name: formData.get("fullname"),
      phone: formData.get("phone"),
    };

    try {
      
      const response = await axios.post("/user/profile", updateInfoData);
      if (response.status === 200) {
        console.log('thành công');
      }
    } catch (error) {
        console.log('sai');
    //   let messageObj = error?.response?.data?.data;
    //   let fields = Object.keys(messageObj);
    //   fields.forEach((field) => {
    //     document.querySelector("#" + field).classList.add("is-invalid");
    //     document.querySelector(`#${field} + .invalid-feedback`).innerHTML =
    //       messageObj[field];
    //   });
    } finally {
    }
  });
// const register = document.getElementById("tb-register");
// async function test(e) {
//   console.log(e.getAttribute("data-id"));

//   const ConferenceId = e.getAttribute("data-id");

//   // call(ConferenceId);
//   axios
//     .get(`/adminconference/showregister/${ConferenceId}`)
//     .then(function (response) {
//       // console.log(response.data[0].user);
//       let registerList = response.data.map((u) => {
//         console.log(u);
//         return `<tr>
//                     <td>${u.user.FullName}</td>
//                     <td>${u.user.Email}</td>
//                     <td>${
//                       u.Status != 1
//                         ? `
//                       <a href="/adminconference/approval/${u.id}">Click để duyệt</a>
//                       `
//                         : "Đã duyệt"
//                     }</td>
//                   </tr>`;
//       });
//       register.innerHTML = registerList.join("");
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// }
