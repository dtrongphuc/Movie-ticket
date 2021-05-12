const UpdateInfoForm = document.querySelector("#updateinfo-form");
const UpdatePasswordForm = document.querySelector("#updateinfo-form--password");
const btn_UpdateInfo = document.querySelector(".btn_updateinfo");
const btn_Updatepassword = document.querySelector(".btn_updatepassword");

const modal11 = document.querySelector('.modal__close');
const input_old_pass = document.querySelector('#old_password');
const input_new_pass = document.querySelector('#new_password');
const confirm = document.querySelector('#confirm');
const error__oldPass = document.getElementsByClassName('error__oldPass');

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
        modal11.click();

        //set hiển thị UI lại
        document.querySelector('.username--primary').innerHTML = formData.get("fullname");
        document.querySelector('.userphone--primary').innerHTML = formData.get("phone");

        //alert
        await Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Thay đổi thông tin thành công!',
          showConfirmButton: false,
          timer: 900
        });
        console.log("thành công");
      }
    } catch (error) {
      console.log("sai");
    } finally {
    }
  });
  
btn_Updatepassword &&
  btn_Updatepassword.addEventListener('click', async e =>{
    e.preventDefault();
    // console.log(btn_UpdateInfo);
    let formData = new FormData(UpdatePasswordForm);
    const updatePasswordData = {
      old_password: formData.get("old_password"),
      new_password: formData.get("new_password"),
      confirm: formData.get("confirm"),
    };
    
    try {
      const response = await axios.post("/user/profile-changePass", updatePasswordData);
      if (response.status === 200) {
        modal11.click();

        //set mặt định cho các input
        input_old_pass.classList.remove('input--error');
        input_new_pass.classList.remove('input--error');
        Object.values(error__oldPass).forEach(html => html.innerHTML = '');

        //alert
        await Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Thay đổi mật khẩu thành công!',
          showConfirmButton: false,
          timer: 900
        });
        console.log("thành công");
      }
    } catch (error) {
      console.log(error.response.data);
      if(error.response.data.err_oldPass != ''){
        input_old_pass.classList.add('input--error');
        error__oldPass[0].innerHTML = error.response.data.err_oldPass;
      }
      if(error.response.data.err_newPass != ''){
        input_new_pass.classList.add('input--error');
        error__oldPass[1].innerHTML = error.response.data.err_newPass;
      }
      if(error.response.data.err_confirm != ''){
        confirm.classList.add('input--error');
        error__oldPass[2].innerHTML = error.response.data.err_confirm;
      }

    } finally {
    }
  })


var Modal = (function () {

  var trigger = $qsa('.modal__trigger'); // what you click to activate the modal
  var modals = $qsa('.modal'); // the entire modal (takes up entire window)
  var modalsbg = $qsa('.modal__bg'); // the entire modal (takes up entire window)
  var content = $qsa('.modal__content'); // the inner content of the modal
  var closers = $qsa('.modal__close'); // an element used to close the modal
  // var closers = $qsa('.modal__close_submit'); // an element used to close the modal
  var w = window;
  var isOpen = false;
  var contentDelay = 400; // duration after you click the button and wait for the content to show
  var len = trigger.length;

  // make it easier for yourself by not having to type as much to select an element
  function $qsa(el) {
      return document.querySelectorAll(el);
  }

  var getId = function (event) {

      event.preventDefault();
      var self = this;
      // get the value of the data-modal attribute from the button
      var modalId = self.dataset.modal;
      var len = modalId.length;
      // remove the '#' from the string
      var modalIdTrimmed = modalId.substring(1, len);
      // select the modal we want to activate
      var modal = document.getElementById(modalIdTrimmed);
      // execute function that creates the temporary expanding div
      makeDiv(self, modal);
  };

  var makeDiv = function (self, modal) {

      var fakediv = document.getElementById('modal__temp');

      /**
       * if there isn't a 'fakediv', create one and append it to the button that was
       * clicked. after that execute the function 'moveTrig' which handles the animations.
       */

      if (fakediv === null) {
          var div = document.createElement('div');
          div.id = 'modal__temp';
          self.appendChild(div);
          moveTrig(self, modal, div);
      }
  };

  var moveTrig = function (trig, modal, div) {
      var trigProps = trig.getBoundingClientRect();
      var m = modal;
      var mProps = m.querySelector('.modal__content').getBoundingClientRect();
      var transX, transY, scaleX, scaleY;
      var xc = w.innerWidth / 2;
      var yc = w.innerHeight / 2;

      // this class increases z-index value so the button goes overtop the other buttons
      trig.classList.add('modal__trigger--active');

      // these values are used for scale the temporary div to the same size as the modal
      scaleX = mProps.width / trigProps.width;
      scaleY = mProps.height / trigProps.height;

      scaleX = scaleX.toFixed(3); // round to 3 decimal places
      scaleY = scaleY.toFixed(3);


      // these values are used to move the button to the center of the window
      transX = Math.round(xc - trigProps.left - trigProps.width / 2);
      transY = Math.round(yc - trigProps.top - trigProps.height / 2);

      // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
      if (m.classList.contains('modal--align-top')) {
          transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
      }


      // translate button to center of screen
      trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
      trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
      // expand temporary div to the same size as the modal
      div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
      div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';


      window.setTimeout(function () {
          window.requestAnimationFrame(function () {
              open(m, div);
          });
      }, contentDelay);

  };

  var open = function (m, div) {

      if (!isOpen) {
          // select the content inside the modal
          var content = m.querySelector('.modal__content');
          // reveal the modal
          m.classList.add('modal--active');
          // reveal the modal content
          content.classList.add('modal__content--active');

          /**
           * when the modal content is finished transitioning, fadeout the temporary
           * expanding div so when the window resizes it isn't visible ( it doesn't
           * move with the window).
           */

          content.addEventListener('transitionend', hideDiv, false);

          isOpen = true;
      }

      function hideDiv() {
          // fadeout div so that it can't be seen when the window is resized
          div.style.opacity = '0';
          content.removeEventListener('transitionend', hideDiv, false);
      }
  };

  var close = function (event) {

      event.preventDefault();
      event.stopImmediatePropagation();

      var target = event.target;
      var div = document.getElementById('modal__temp');

      /**
       * make sure the modal__bg or modal__close was clicked, we don't want to be able to click
       * inside the modal and have it close.
       */

      if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {

          // make the hidden div visible again and remove the transforms so it scales back to its original size
          div.style.opacity = '1';
          div.removeAttribute('style');

          /**
          * iterate through the modals and modal contents and triggers to remove their active classes.
    * remove the inline css from the trigger to move it back into its original position.
          */

          for (var i = 0; i < len; i++) {
              modals[i].classList.remove('modal--active');
              content[i].classList.remove('modal__content--active');
              trigger[i].style.transform = 'none';
              trigger[i].style.webkitTransform = 'none';
              trigger[i].classList.remove('modal__trigger--active');
          }

          // when the temporary div is opacity:1 again, we want to remove it from the dom
          div.addEventListener('transitionend', removeDiv, false);

          isOpen = false;

      }

      function removeDiv() {
          setTimeout(function () {
              window.requestAnimationFrame(function () {
                  // remove the temp div from the dom with a slight delay so the animation looks good
                  div.remove();
              });
          }, contentDelay - 50);
      }

  };

  var bindActions = function () {
      for (var i = 0; i < len; i++) {
          trigger[i].addEventListener('click', getId, false);
          closers[i].addEventListener('click', close, false);
          modalsbg[i].addEventListener('click', close, false);
      }
  };
  var AfterSubmit = function () {
      for (var i = 0; i < len; i++) {
          closers[i].addEventListener('click', close, false);
      }
  };


  var init = function () {
      bindActions();
  };
  var closeAfterSubmit = function () {
      bindActions();
  };

  return {
      init: init,
      closeAfterSubmit: closeAfterSubmit
  };

}());

Modal.init();