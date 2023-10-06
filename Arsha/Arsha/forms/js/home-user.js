function loadHomeUser() {
    fillAccountInformation();
    loadCategory();
    blogOfAccount();
    allBlog();
    event.preventDefault()
}

function loadCategory() {
    $.ajax({
        url: "http://localhost:8080/api/category",
        type: "GET",
        success: function (categories) {
            let content = `<select id="category-select" class="form-select" >`
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
            blogOfAccount()
            document.getElementById("blog-account").scrollIntoView({behavior: "smooth"})
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
                content += ` <div class="col-lg-6 mt-4" data-aos="zoom-in" data-aos-delay="0" id="xxx-xxx">
                    <div class="member d-flex align-items-start">
                  
                        <div class="member-info" style="">
                         <div class="social">
                         <a href="" onclick=""><i class="ri-settings-3-fill"></i></a>
                           </div>
                            <h6>Tiêu đề: ${blogs[i].title}</h6>
                            <p style="margin-bottom: 10px">Ngày đăng: ${blogs[i].date}</p>`;
                if (blogs[i].url_img) {
                    content += `<img src="/src/main/resources/static/img/${blogs[i].url_img}" id="blogImage" alt="" style="width: 325px; height: 200px">`
                }
                content += `
                            <h6 style="text-align: justify; width: 325px; margin-top: 10px" id="content-blog-of-account">${blogs[i].content}</h6>`
                if (blogs[i].content.length > 100) {
                    content += `<a href="">Xem thêm</a>`
                }


                content +=
                    `<hr>
                            <div class="social">
                            <a href="#" onclick="likeBlog(${blogs[i].id})"> <i class="ri-user-heart-line" id="like-blog-of-account-${blogs[i].id}" style="color: blue"></i></a>
                           <span id="number-like-${blogs[i].id}-1"></span>
                             </div>
                             
                            <span id="all-comment-of-blog-${blogs[i].id}"></span>
                             <textarea style="margin-top: 5px" class="form-control" name="message" rows="2" id="content-comment-blog-${blogs[i].id}" placeholder="Bình luận" required></textarea>
                             <a href="#" onclick="commentBlog(${blogs[i].id})">Bình luận</a>
                            <hr>
                            <div class="social">
                                <a href=""><i class="ri-twitter-fill"></i></a>
                                <a href=""><i class="ri-facebook-fill"></i></a>
                                <a href=""><i class="ri-instagram-fill"></i></a>
                                <a href=""> <i class="ri-linkedin-box-fill"></i></a>
                            </div>
                        </div>
                    </div></div>`;

            }
            for (let i = 0; i < blogs.length; i++) {
                fillAllCommentOfBlog(blogs[i].id)
            }
            for (let i = 0; i < blogs.length; i++) {
                displayLike(blogs[i].id)
            }
            document.getElementById("blog-of-account").innerHTML = content;
        }
    })
    event.preventDefault()
}

function allBlog() {
    $.ajax({
        url: "http://localhost:8080/api/blog2/findAllBlog",
        type: "GET",
        success: function (blogs) {
            let content = ""
            for (let i = 0; i < blogs.length; i++) {
                content += ` <div class="col-lg-6 mt-4" data-aos="zoom-in" data-aos-delay="0" id="xxx-xxx-2">
                    <div class="member d-flex align-items-start">
                  
                        <div class="member-info" style="">
                         <div class="social">
                         <a href=""><i class="ri-settings-3-fill"></i></a>
                           </div>
                            <h6>Tiêu đề: ${blogs[i].title}</h6>
                            <p style="margin-bottom: 10px">Ngày đăng: ${blogs[i].date}</p>`;
                content += `<p style="margin-bottom: 10px">Tác giả: ${blogs[i].account.name}</p>`;
                if (blogs[i].url_img) {
                    content += `<img src="/src/main/resources/static/img/${blogs[i].url_img}" id="blogImage" alt="" style="width: 325px; height: 200px">`
                }
                content += `
                            <h6 style="text-align: justify; width: 325px; margin-top: 10px" id="content-blog-of-account">${blogs[i].content}</h6>`
                if (blogs[i].content.length > 100) {
                    content += `<a href="">Xem thêm</a>`
                }


                content +=
                    `<hr>
                            <div class="social">
                            <a href="#" onclick="likeBlog2(${blogs[i].id})"> <i class="ri-user-heart-line" id="like-blog-of-account-${blogs[i].id}-2" style="color: blue"></i></a>
                          <span id="number-like-${blogs[i].id}-2"></span>
                             </div>
                            
                            <span id="all-comment-of-blog-${blogs[i].id}-2"></span>
                             <textarea style="margin-top: 5px" class="form-control" name="message" rows="2" id="content-comment-blog-${blogs[i].id}-2" placeholder="Bình luận" required></textarea>
                             <a href="#" onclick="commentBlog2(${blogs[i].id})">Bình luận</a>
                            <hr>
                            <div class="social">
                                <a href=""><i class="ri-twitter-fill"></i></a>
                                <a href=""><i class="ri-facebook-fill"></i></a>
                                <a href=""><i class="ri-instagram-fill"></i></a>
                                <a href=""> <i class="ri-linkedin-box-fill"></i></a>
                            </div>
                        </div>
                    </div></div>`;

            }
            for (let i = 0; i < blogs.length; i++) {
                fillAllCommentOfBlog(blogs[i].id)
            }
            for (let i = 0; i < blogs.length; i++) {
                displayLike(blogs[i].id)
            }
            document.getElementById("blog-of-all-account").innerHTML = content;
        }
    })
    event.preventDefault()
}

function fillAllCommentOfBlog(id) {
    $.ajax({
        url: "http://localhost:8080/api/comment/findAllCommentOfBlog/" + id,
        type: "GET",
        success: function (comments) {
            if (comments.length > 0) {
                let content = `<p>Bình luận của bài viết:</p>`
                content += `<p style="color: #0a53be">${comments[0].account.name}:</p>`
                content += `${comments[0].content}`
                if (comments.length > 1) {
                    content += `<p style="color: #0a53be">${comments[1].account.name}:</p>`
                    content += `${comments[1].content}`
                }
                if (comments.length > 2) {
                    content += `<br><a href="#">Xem thêm</a>`
                }
                document.getElementById(`all-comment-of-blog-${id}`).innerHTML = content;
                document.getElementById(`all-comment-of-blog-${id}-2`).innerHTML = content;
            } else {
                document.getElementById(`all-comment-of-blog-${id}`).innerHTML = "Bài viết chưa có bình luận nào!"
                document.getElementById(`all-comment-of-blog-${id}-2`).innerHTML = "Bài viết chưa có bình luận nào!"
            }
        }
    })
    event.preventDefault()
}
function commentBlog2(id) {
    let content = $(`#content-comment-blog-${id}-2`).val()
    if (content === "") {
        return event.preventDefault()
    }
    let id_blog = id;
    let id_account = localStorage.getItem("id-account");
    let comment = {
        content: content,
        blog: {
            id: id_blog
        },
        account: {
            id: id_account
        }
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        }, // phải có cái headers này chú ý!!!!
        url: "http://localhost:8080/api/comment/createCommentByAccount",
        type: "POST",
        data: JSON.stringify(comment),
        success: function () {
            fillAllCommentOfBlog(id)
            document.getElementById(`content-comment-blog-${id}-2`).value = "";
        }
    })
    event.preventDefault()
}

function commentBlog(id) {
    let content = $(`#content-comment-blog-${id}`).val()
    if (content === "") {
        return event.preventDefault()
    }
    let id_blog = id;
    let id_account = localStorage.getItem("id-account");
    let comment = {
        content: content,
        blog: {
            id: id_blog
        },
        account: {
            id: id_account
        }
    }
    $.ajax({
        headers: {
            "Content-Type": "application/json"
        }, // phải có cái headers này chú ý!!!!
        url: "http://localhost:8080/api/comment/createCommentByAccount",
        type: "POST",
        data: JSON.stringify(comment),
        success: function () {
            fillAllCommentOfBlog(id)
            document.getElementById(`content-comment-blog-${id}`).value = "";
        }
    })
    event.preventDefault()
}

function displayLike(id_blog) {
    let id_account = localStorage.getItem("id-account");
    $.ajax({
        url: "http://localhost:8080/api/like/findAllLike",
        type: "GET",
        success: function (likes) {
            let number_like = 0;
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].account.id == id_account && likes[i].blog.id == id_blog) {
                    document.getElementById(`like-blog-of-account-${id_blog}`).style.color = "red";
                    document.getElementById(`like-blog-of-account-${id_blog}-2`).style.color = "red";
                }
                if (likes[i].blog.id == id_blog) {
                    number_like ++;
                }
            }
            document.getElementById(`number-like-${id_blog}-1`).innerHTML = `${number_like}`
            document.getElementById(`number-like-${id_blog}-2`).innerHTML = `${number_like}`
        }
    })
}

function likeBlog(id) {
    let a = document.getElementById(`like-blog-of-account-${id}`)
    if (a.style.color === "red") {
        let id_account = localStorage.getItem("id-account");
        let like = {
            blog: {
                id: id
            },
            account: {
                id: id_account
            }
        }
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            }, // phải có cái headers này chú ý!!!!
            url: "http://localhost:8080/api/like/unLike",
            type: "DELETE",
            data: JSON.stringify(like),
            success: function () {
                document.getElementById(`like-blog-of-account-${id}`).style.color = "blue";
                document.getElementById(`like-blog-of-account-${id}-2`).style.color = "blue";
                displayLike(id)
            }
        })
    } else {
        let id_account = localStorage.getItem("id-account");
        let like = {
            blog: {
                id: id
            },
            account: {
                id: id_account
            }
        }
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            }, // phải có cái headers này chú ý!!!!
            url: "http://localhost:8080/api/like/createLike",
            type: "POST",
            data: JSON.stringify(like),
            success: function () {
                document.getElementById(`like-blog-of-account-${id}`).style.color = "red";
                displayLike(id)
            }
        })
    }
    event.preventDefault()
}
function likeBlog2(id) {
    let a = document.getElementById(`like-blog-of-account-${id}-2`)
    if (a.style.color === "red") {
        let id_account = localStorage.getItem("id-account");
        let like = {
            blog: {
                id: id
            },
            account: {
                id: id_account
            }
        }
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            }, // phải có cái headers này chú ý!!!!
            url: "http://localhost:8080/api/like/unLike",
            type: "DELETE",
            data: JSON.stringify(like),
            success: function () {
                document.getElementById(`like-blog-of-account-${id}-2`).style.color = "blue";
                document.getElementById(`like-blog-of-account-${id}`).style.color = "blue";
                displayLike(id)
            }
        })
    } else {
        let id_account = localStorage.getItem("id-account");
        let like = {
            blog: {
                id: id
            },
            account: {
                id: id_account
            }
        }
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            }, // phải có cái headers này chú ý!!!!
            url: "http://localhost:8080/api/like/createLike",
            type: "POST",
            data: JSON.stringify(like),
            success: function () {
                document.getElementById(`like-blog-of-account-${id}-2`).style.color = "red";
                document.getElementById(`like-blog-of-account-${id}`).style.color = "red";
                displayLike(id)
            }
        })
    }
    event.preventDefault()
}