function login() {
    let name = $("#account-name").val();
    let password = $("#account-password").val();
    let account = {
        name: name,
        password: password
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        }, // phải có cái headers này chú ý!!!!
        url: "http://localhost:8080/api/login",
        type: "POST",
        data: JSON.stringify(account),
        success: function (data) {
            localStorage.setItem("token", data.token); // lưu token
            localStorage.setItem("account-name", data.username) // lưu tên nguời dùng
            localStorage.setItem("id-account", data.id)
            localStorage.setItem("roles", JSON.stringify(data.authorities)) // lưu roles của account (array)
            // check role:
            let roles = JSON.parse(localStorage.getItem("roles"))
            let check = false;
            for (let i = 0; i < roles.length; i ++) {
                if (roles[i].authority == "ROLE_ADMIN") {
                    check = true;
                    break;
                }
            }
            if (check) {
                // nếu là admin chuyển về trang của admin
                window.location.href = "home-user2.html";
            } else {
            // nếu là trang user chuyển về trang user
                window.location.href = "home-user3.html"
            }
        },
        error: function () {
            alert("Tài khoản hoặc mật khẩu không đúng!")
        }
    })
    event.preventDefault();
}