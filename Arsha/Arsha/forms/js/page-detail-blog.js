function fillBlogEditInformation() {
    let blog = JSON.parse(localStorage.getItem("blog_edit"))
    document.getElementById("category-blog-3").innerHTML = `${blog.category.name}`
    document.getElementById("account-blog-3").innerHTML = `${blog.account.name}`
    document.getElementById("date-blog-3").innerHTML = `${blog.date}`
    document.getElementById("title-blog-3").innerHTML = `${blog.title}`
    if (blog.url_img) {
        let content = `<img style="width: 600px; height: 400px" src="/src/main/resources/static/img/${blog.url_img}">`;
        document.getElementById("img-blog-3").innerHTML = content;
    }
    document.getElementById("content-blog-3").innerHTML = `${blog.content}`
    fillAllCommentOfBlogDetail(`${blog.id}`)
    displayLike(`${blog.id}`)
}
function displayLike(id_blog) {
    // hiển thị sô lượng like của blog:
    $.ajax({
        url: "http://localhost:8080/api/like/findAllLike",
        type: "GET",
        success: function (likes) {
            let number_like = 0;
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].blog.id == id_blog) {
                    number_like++;
                }
                if (number_like > 0) {
                    document.getElementById("like-blog-3").innerHTML = "Bài viết có "+`<a href='#' onclick='showAllAccountLikeThisBlog(${id_blog})'>${number_like}</a>`+ " lượt thích!"
                } else {
                    document.getElementById("like-blog-3").innerHTML = "Bài viết chưa có lượt thích nào!"
                }
            }
        }
    })
}
function showAllAccountLikeThisBlog(id_blog) {
    $.ajax({
        url: "http://localhost:8080/api/like/findAllLike",
        type: "GET",
        success: function (likes) {
            let content = "";
            for (let i = 0; i < likes.length; i ++) {
                if (likes[i].blog.id == id_blog) {
                    content += `<p style="text-align: left">${likes[i].account.name}</p>`
                }
            }
            document.getElementById("account-like-this-blog").innerHTML = content;
        }
    })
    event.preventDefault()
}
function fillAllCommentOfBlogDetail(id) {
    $.ajax({
        url: "http://localhost:8080/api/comment/findAllCommentOfBlog/" + id,
        type: "GET",
        success: function (comments) {
            if (comments.length > 0) {
                let name = localStorage.getItem("account-name");
                let content = `<p style="font-weight: bold">Bình luận của bài viết:</p>`
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].account.name === name) {
                        content += `<p style="color: #be0a3a; font-weight: bold">${comments[i].account.name} (Bạn):</p>`
                    } else {
                        content += `<p style="color: #0a53be; font-weight: bold">${comments[i].account.name}:</p>`
                    }
                    content += `<p>${comments[i].content}</p>`
                }
                document.getElementById(`comment-blog-3`).innerHTML = content;
            } else {
                document.getElementById(`comment-blog-3`).innerHTML = "Bài viết chưa có bình luận nào!"
            }
        }
    })
    event.preventDefault()
}