function loadHomeUser() {
    fillAccountInformation();
    loadCategory();
    blogOfAccount();
    event.preventDefault()
}

function loadCategory() {
    $.ajax({
        url: "http://localhost:8080/api/category",
        type: "GET",
        success: function (categories) {
            let content = `<select id="category-select">`
            for (let i = 0; i < categories.length; i++) {
                content += `<option value="${categories[i].id}">${categories[i].name}</option>`
            }
            content += "</select>"
            document.getElementById("category-create").innerHTML = content;
        }
    })
}

function fillAccountInformation() {
    let name = localStorage.getItem("account-name");
    document.getElementById("name-account").innerHTML = name;
    $.ajax({
        url: "http://localhost:8080/api/searchAccountByName/" + name,
        type: "GET",
        success: function (account) {
            let maskedPhone = account.phone.slice(0, -3) + "***";
            document.getElementById("phone-account").innerHTML = maskedPhone;
            let maskedEmail = "*".repeat(5) + account.email.substring(5);
            document.getElementById("email-account").innerHTML = maskedEmail;
        }
    })
    event.preventDefault()
}

function createNewBlog() {
    let title = $("#title-create").val()
    let content = $("#content-create").val()
    if (title === "") {
        return alert("Hãy nhập tiêu đề của bài viết!")
    }
    if (content === "") {
        return alert("Hãy nhập nội dung của bài viết!")
    }
    let file = $("#image-create")[0].files[0]
    // bắt buộc file phải có gì đó thì formData mới chuyển dữ liệu đi,
    // ở đây xử lí trường hợp không chọn ảnh khi create:
    if (file == undefined) {
        file = new File([], "", undefined);
    }
    let id = localStorage.getItem("id-account")
    let id_category = $("#category-select").val()
    let blog = {
        title: title,
        content: content,
        account: {
            id: id
        },
        category: {
            id: id_category
        }
    }
    let formData = new FormData();
    formData.append("blog", new Blob([JSON.stringify(blog)], {type: "application/json"}))
    formData.append("file", file)
    $.ajax({
        url: "http://localhost:8080/api/blog2/createNewBlog",
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function () {
            alert("Thêm bài viết thành công!")
            document.getElementById("form-create-blog").reset()
        }
    })
    event.preventDefault()
}

function blogOfAccount() {
    let id = localStorage.getItem("id-account")
    $.ajax({
        url: "http://localhost:8080/api/blog2/findBlogByAccount/" + id,
        type: "GET",
        success: function (blogs) {
            let content = ""
            for (let i = 0; i < blogs.length; i++) {
                content += ` <div class="col-lg-6 mt-4" data-aos="zoom-in" data-aos-delay="0">
                    <div class="member d-flex align-items-start">
                        <div class="member-info" style="">
                            <h4>Tiêu đề: ${blogs[i].title}</h4>
                            <span>Ngày đăng: ${blogs[i].date}</span>`;
                if (blogs[i].url_img) {
                    content += `<img src="/src/main/resources/static/img/${blogs[i].url_img}" id="blogImage" alt="" style="width: 325px; height: 200px">`
                }
                content += `
                            <p style="text-align: justify; width: 325px">Nội dung: ${blogs[i].content}</p>
                            <div class="social">
                                <a href=""><i class="ri-twitter-fill"></i></a>
                                <a href=""><i class="ri-facebook-fill"></i></a>
                                <a href=""><i class="ri-instagram-fill"></i></a>
                                <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                            </div>
                        </div>
                    </div></div>`;
            }
            document.getElementById("blog-of-account").innerHTML = content;
        }
    })
    event.preventDefault()
}