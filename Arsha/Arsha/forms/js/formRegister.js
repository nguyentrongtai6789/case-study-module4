function checkName() {
    let name = $("#name").val();
    if (name == "") {
        document.getElementById("name-valid").innerHTML = "Tên không được trống!";
        return false;
    } else {
        document.getElementById("name-valid").innerHTML = "";
        return true;
    }
}

function checkPassword1() {
    let password1 = $("#password-1").val();
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (regex.test(password1)) {
        document.getElementById("password-1-valid").innerHTML = "";
        return true;
    } else {
        document.getElementById("password-1-valid").innerHTML = "Mật khẩu phải chứa ít nhất 1 chữ " +
            "cái viết thường, ít nhất 1 chữ cái viết hoa, ít nhất 1 số, có độ dài tối thiểu 8 kí tự và không có kí tự đặc biệt!"
        return false;
    }
}

function checkPassword2() {
    let password1 = $("#password-1").val();
    let password2 = $("#password-2").val();
    if (password1 !== password2) {
        document.getElementById("password-2-valid").innerHTML = "Mật khẩu xác nhận sai!";
        return false;
    } else {
        document.getElementById("password-2-valid").innerHTML = "";
        return true;
    }
}

function checkPhone() {
    let phone = $("#phone").val();
    let regex = /^0\d{9}$/
    if (regex.test(phone)) {
        document.getElementById("phone-valid").innerHTML = "";
        return true;
    } else {
        document.getElementById("phone-valid").innerHTML = "Số điện thoại không hợp lệ!"
        return false;
    }
}

function checkEmail() {
    let email = $("#email").val();
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        document.getElementById("email-valid").innerHTML = "";
        return true;
    } else {
        document.getElementById("email-valid").innerHTML = "Email không hợp lệ!";
        return false;
    }
}

function checkValidate() {
    document.getElementById("name-valid").innerHTML = ""
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
    localStorage.setItem("account-register", JSON.stringify(account_register))
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
    if (check && checkEmail() && checkPhone() && checkPassword2()) {
        addNewAccount();
    } else {
        alert("Hãy kiểm tra lại thông tin đăng kí của bạn!")
    }
    event.preventDefault();
}

function addNewAccount() {
    let account = JSON.parse(localStorage.getItem("account-register"));
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        }, // phải có cái headers này chú ý!!!!
        url: "http://localhost:8080/api/saveAccount",
        type: "POST",
        data: JSON.stringify(account),
        success: function () {
            alert("Đăng kí thành công!")
            window.location.href = "formLogin.html"
        },
        error: function (xhr) {
            alert(xhr.responseText)
        }
    })
}