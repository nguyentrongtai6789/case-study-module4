function checkValidate() {
    document.getElementById("name-valid").innerHTML = "";
    document.getElementById("password-1-valid").innerHTML = "";
    document.getElementById("password-2-valid").innerHTML = "";
    document.getElementById("phone-valid").innerHTML = "";
    document.getElementById("email-valid").innerHTML = "";
    let name = $("#name").val()
    let password1 = $("#password-1").val()
    let password2 = $("#password-2").val()
    let phone = $("#phone").val()
    let email = $("#email").val()
    let account_register = {
        name: name,
        password: password1,
        phone: phone,
        email: email,
    }
    let check = true;
    if (name == "") {
        document.getElementById("name-valid").innerHTML = "Tên không được trống!"
        check = false;
    }
    if (password1 == "") {
        document.getElementById("password-1-valid").innerHTML = "Mật khẩu không được trống!"
        check = false;
    }
    if (password2 == "") {
        document.getElementById("password-2-valid").innerHTML = "Mật khẩu không được trống!"
        check = false;
    }
    if (phone == "") {
         document.getElementById("phone-valid").innerHTML = "Số điện thoại không được trống!"
        check = false;
    }
    if (email == "") {
         document.getElementById("email-valid").innerHTML = "Email không được trống!"
        check = false;
    }
    if (check) {
        addNewAccount();
    }
    event.preventDefault();
}
function addNewAccount() {

}