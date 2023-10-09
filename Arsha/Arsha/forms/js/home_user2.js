function logInAmin(token, role) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    window.location.href = "home-user2.html";
}


function showListCategory() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/category",
        success: function (data) {
            console.log("category = " + data)
            let content = ""
            if (data.length !== null) {
                for (let i = 0; i < data.length; i++) {
                    content += "<li onclick=\"searchByCategory(" + data[i].id + ")\"><a href=\"#blogs_C\"\">" + data[i].name + "</a></li>"
                }
            }
            document.getElementById("L_category").innerHTML = content;
        }
    })
    $.ajax({
        headers: {
            // "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/category",
        success: function (data) {
            console.log("category = " + data)
            let content = ""
            if (data.length !== null) {
                for (let i = 0; i < data.length; i++) {
                    content += "<option value=\"" + data[i].id + "\">" + data[i].name + "</option>"
                }
            }
            document.getElementById("account").value = localStorage.getItem("account-name");
            document.getElementById("category_C").innerHTML = content;
        }
    })

    let name_addMin = localStorage.getItem("account-name");

    $.ajax({
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/searchAccountByName/" + name_addMin,
        success: function (data) {
            console.log("data11 = " + data.phone)
            console.log("data11 = " + data)
            document.getElementById("name-account").innerHTML = data.name;
            document.getElementById("phone-account").innerHTML = data.phone;
            document.getElementById("email-account").innerHTML = data.email;
        }
    })

}

function searchByCategory(id_category) {

    $.ajax({
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/blog/search_by_category/" + id_category,
        success: function (data) {
            let content = "";
            if (data.length !== null) {
                for (let i = 0; i < data.length; i++) {
                    content += blogs(data[i]);
                }
            }
            document.getElementById("blogs_by_category").innerHTML = content;
        }
    })
}

function disPlayBlogs() {
    $.ajax({
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "Get",
        url: "http://localhost:8080/api/blog",
        success: function (data) {
            console.log("line1")
            console.log(data)
            let content = "";
            let t = 100;
            if (data.length !== null) {
                for (let i = 0; i < data.length; i++) {
                    content += blogs(data[i]);
                }
                document.getElementById("list_blog").innerHTML = content;
            }
        }
    })
}

function blogs(data) {
    let content = "<div class=\"col-lg-6 mt-4\" data-aos=\"zoom-in\" data-aos-delay=\"100\">\n" +
        "           <div class=\"member d-flex align-items-start\">\n" +
        "              <div class=\"pic\"><img src=\"/src/main/resources/static/img/" + data.url_img + "\" class=\"img-fluid\" alt=\"\"></div>\n" +
        "              <div class=\"member-info\">\n" +
        "                <h4>" + data.title + "</h4>\n" +
        "                <span>" + data.date + "</span>\n" +
        "                <span>" + data.category.name + "</span>\n";
    let t = "";
    let dem = 0;
    for (let i = 0; i < data.content.length; i++) {
        if (dem < 20){
            t += (data.content)[i];
            dem ++;
        } else {
            t += " ...";
            break;
        }
    }
    content +=
        "                <p>" + t + "</p>" +
        "                <div class=\"social\">" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='showBlog(" + data.id + ")'>Xem chi tiết</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='update(" + data.id + ")'>Update</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='deleteBlog(" + data.id + ")'>Delete</button>" +
        "                </div>\n" +
        "              </div>" +
        "              </div>" +
        "           </div>";
    return content;
}

function disPlayBlogsByAccount() {
    let id_account = localStorage.getItem("id-account");
    console.log(id_account);
    $.ajax({
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/blog/display/" + id_account,
        success: function (data) {
            console.log("x= " + data)
            let content = "";
            if (data.length !== null) {
                for (let i = 0; i < data.length; i++) {
                    content += blogByAccount(data[i]);
                }
            }
            document.getElementById("blogs-account").innerHTML = content;
        }
    })
}

function blogByAccount(data) {
    let content = "<div class=\"col-lg-6 mt-4\" data-aos=\"zoom-in\" data-aos-delay=\"100\">\n" +
        "           <div class=\"member d-flex align-items-start\">\n" +
        "              <div class=\"pic\"><img src=\"/src/main/resources/static/img/" + data.url_img + "\" class=\"img-fluid\" alt=\"\"></div>\n" +
        "              <div class=\"member-info\">\n" +
        "                <h4>" + data.title + "</h4>\n" +
        "                <span>" + data.date + "</span>\n" +
        "                <span>" + data.category.name + "</span>\n";
    let t = "";
    let dem = 0;
    for (let i = 0; i < data.content.length; i++) {
        if (dem < 20){
            t += (data.content)[i];
            dem ++;
        } else {
            t += " ...";
            break;
        }
    }
    content +=
        "                <p>" + t + "</p>" +
        "                <div class=\"social\">" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='showBlog(" + data.id + ")'>Xem chi tiết</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='update(" + data.id + ")'>Update</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='deleteBlog(" + data.id + ")'>Delete</button>" +
        "                </div>\n" +
        "              </div>" +
        "              </div>" +
        "           </div>";
    return content;
}

function deleteBlog(id_blog) {
    console.log("id blog = " + id_blog);
    let token = localStorage.getItem('token');
    console.log("tocken= " + token);
    $.ajax({
        headers: {
            // "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "POST",
        url: "http://localhost:8080/api/blog/delete/" + id_blog,
        success: function () {
            alert("Bạn vừa xóa 1 bài viết của mình");
            window.location.href = "../html/home-user2.html";
        }
    })
}

function searchByTitle() {
    let title = document.getElementById("tim_kiem").value;
    $.ajax({
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/blog/search_by_title/" + title,
        success: function (data) {
            let content = "";
            if (data.length !== 0) {
                for (let i = 0; i < data.length; i++) {
                    content += blogs(data[i]);
                }
            }
            document.getElementById("list_blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

function createBlog() {
    let id_blog = null;
    let title = document.getElementById("title_C").value;
    console.log("title =" + title)
    // let title = document.getElementById("title_C").value;
    let content = document.getElementById("content").value;
    let date = document.getElementById("date").value;
    let url_img = null
    let file = $("#img")[0].files[0];
    let category = null;
    let account = null;
    let id_category = document.getElementById("category_C").value;
    let id_account = localStorage.getItem("id-account");
    let blog = {
        id: id_blog,
        title: title,
        content: content,
        url_img: url_img,
        date: date,
        account: account,
        category: category
    }
    console.log(blog)
    let formData = new FormData();
    formData.append("blog", new Blob([JSON.stringify(blog)], {type: 'application/json'}));
    formData.append("file", file)
    $.ajax({
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "POST",
        url: "http://localhost:8080/api/blog/create/" + id_category + "/" + id_account,
        processData: false,
        contentType: false,
        data: formData,
        success: function () {
            alert("Bạn vừa tạo thành công 1 bài viết");
            window.location.href = "../html/home-user2.html";
        }
    })
}