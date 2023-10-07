
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
            console.log("cont= " + content);
            document.getElementById("L_category").innerHTML = content;
        }
    })

    let name_addMin = localStorage.getItem("account-name");

    $.ajax({
        headers: {
            "Content-Type": "application/json",
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/blog/search_by_category/" + id_category,
        success: function (data){
            let content = "";
            if (data.length !== null){
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
            "Content-Type": "application/json",
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
    return "<div class=\"col-lg-6 mt-4\" data-aos=\"zoom-in\" data-aos-delay=\"100\">\n" +
        "           <div class=\"member d-flex align-items-start\">\n" +
        "              <div class=\"pic\"><img src=\"/src/main/resources/static/img/" + data.url_img + "\" class=\"img-fluid\" alt=\"\"></div>\n" +
        "              <div class=\"member-info\">\n" +
        "                <h4>" + data.title + "</h4>\n" +
        "                <span>" + data.date + "</span>\n" +
        "                <span>" + data.category.name + "</span>\n" +
        "                <div class=\"social\">" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='showBlog(" + data.id + ")'>Xem chi tiết</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='update(" + data.id + ")'>Update</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='deleteBlog(" + data.id + ")'>Delete</button>" +
        "                </div>\n" +
        "              </div>" +
        "              </div>" +
        "           </div>";
}

function disPlayBlogsByAccount() {
    let id_account = localStorage.getItem("id_addMin");
    console.log(id_account);
    $.ajax({
        headers: {
            "Content-Type": "application/json",
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
    return "<div class=\"col-lg-6 mt-4\" data-aos=\"zoom-in\" data-aos-delay=\"100\">\n" +
        "            <div class=\"member d-flex align-items-start\">\n" +
        "              <div class=\"pic\"><img src=\"/src/main/resources/static/img/" + data.url_img + "\" class=\"img-fluid\" alt=\"\"></div>\n" +
        "              <div class=\"member-info\">\n" +
        "                <h4>" + data.title + "</h4>\n" +
        "                <span>" + data.date + "</span>\n" +
        "                <span>" + data.category.name + "</span>\n" +
        "                <div class=\"social\">\n" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='showBlog(" + data.id + ")'>Xem chi tiết</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='update(" + data.id + ")'>Update</button>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='deleteBlog(" + data.id + ")'>Delete</button>" +
        "                </div>\n" +
        "              </div>" +
        "              </div>" +
        "          </div>";
}

function deleteBlog(id_blog) {
    console.log("blabla" + id_blog);
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
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
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url:"http://localhost:8080/api/blog/search_by_title/" + title,
        success: function (data) {
            let content = "";
            if (data.length !== 0){
                for (let i = 0; i < data.length; i++) {
                    content += blogs(data[i]);
                }
            }
            document.getElementById("list_blog").innerHTML = content;
        }
    })
    event.preventDefault();
}