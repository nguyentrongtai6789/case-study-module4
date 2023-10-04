function findAllAccount() {
    let name = localStorage.getItem("account-name");
    document.getElementById("account-name-display").innerHTML = name;
    $.ajax({
        url: "http://localhost:8080/api/findAllAccounts",
        type: "GET",
        success: function (accounts) {
            localStorage.setItem("accounts", JSON.stringify(accounts))
            let content = `<table class="table table-striped table-hover">`;
            content += `<tr>`
            content += `<td>STT</td>`
            content += `<td>Tên tài khoản</td>`
            content += `<td>Số điện thoại</td>`
            content += `<td>Email</td>`
            content += `<td>Quyền tài khoản</td>`
            content += `<td>Xoá tài khoản</td>`
            content += `<td>Sửa quyền</td>`
            content += `<td>Xem thông tin</td>`
            content += `</tr>`;
            for (let i = 0; i < accounts.length; i++) {
                content += `<tr><td>${i + 1}</td>`
                content += `<td>${accounts[i].name}</td>`
                content += `<td>${accounts[i].phone}</td>`
                content += `<td>${accounts[i].email}</td>`
                content += "<td>"
                for (let j = 0; j < accounts[i].roles.length; j++) {
                    content += `${accounts[i].roles[j].name}<br>`
                }
                content += "</td>"
                content += `<td><button onclick="deleteAccount(${accounts[i].id})"  class="btn btn-danger">Xoá</button></td>`
                content += `<td><button onclick="editRole(${accounts[i].id})"  class="btn btn-warning">Sửa</button>
                <span id="role-select-${accounts[i].id}"></span></td>`
                content += `<td><button onclick="viewAccount(${accounts[i].id})"  class="btn btn-info">Xem</button></td>`
                content += `</tr>`
            }
            content += "</table>"
            document.getElementById("table-account").innerHTML = content;
        }
    })
    event.preventDefault();
}

function editRole(id) {
    let accounts = JSON.parse(localStorage.getItem("accounts"))
    console.log(accounts)
    let check = false;
    let roles;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id === id) {
            roles = accounts[i].roles;
            break;
        }
    }
    for (let j = 0; j < roles.length; j++) {
        if (roles[j].name === "ROLE_ADMIN") {
            check = true;
            break;
        }
    }
    if (check) {
        alert("Không thể thay đổi quyền của một tài khoản là admin!")
    } else {
       let content = `<input type="checkbox" id="checkbox-1" onchange="saveRoleEdit(${id})">`
        content += `<label for="checkbox-1">Thêm quyền admin</label>`
        document.getElementById(`role-select-${id}`).innerHTML = content;

    }
    event.preventDefault();

}
function saveRoleEdit(id) {
    let a = confirm("Bạn có chắc chắn muốn cấp quyền admin cho tài khoản này?")
    if (a) {
        $.ajax({
            url: "http://localhost:8080/api/saveNewRole/" + id,
            type: "POST",
            success: function () {
                alert("Thêm quyền admin thành công!")
                findAllAccount()
            }
        })
        document.getElementById(`role-select-${id}`).innerHTML = ""
    } else {
        document.getElementById(`role-select-${id}`).innerHTML = "";
    }

}
function deleteAccount(idDelete) {
    let a = confirm("Bạn có chắc chắn muốn xoá tài khoản này?")

    if (a) {
        let accounts = JSON.parse(localStorage.getItem("accounts"))
        console.log(accounts)
        let check = false;
        let roles;
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id === idDelete) {
                roles = accounts[i].roles;
                break;
            }
        }
        for (let j = 0; j < roles.length; j++) {
            if (roles[j].name === "ROLE_ADMIN") {
                check = true;
                break;
            }
        }
        if (check) {
            alert("Không thể xoá tài khoản admin!")
        } else {
            $.ajax({

                url: "http://localhost:8080/api/deleteAccount/" + idDelete,
                type: "DELETE",
                success: function () {
                    alert("Xoá thành công!")
                    findAllAccount();
                }
            })
        }
    }
    event.preventDefault();
}