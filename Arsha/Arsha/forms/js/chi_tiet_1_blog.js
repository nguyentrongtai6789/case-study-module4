function showBlog(id_blog) {
    localStorage.setItem("id_blog_a", id_blog);
    window.location.href = "../html/chi_tiet_1_blog.html";
}

function showBlog_A() {
    let id_blog = localStorage.getItem("id_blog_a");
    console.log("id= " +id_blog)
$.ajax({
    type: "GET",
    url:"http://localhost:8080/api/blog/displayoneblog/" + id_blog,
    success: function (data){
        document.getElementById("title-A").innerHTML = data.title
        document.getElementById("img-A").innerHTML =
            "<img src=\"/src/main/resources/static/img/" + data.url_img +"\" alt=\"\">";
        document.getElementById("title-A").innerHTML = data.title;
        document.getElementById("category-A").innerHTML = "<strong>Category</strong>:" + data.category.name;
        document.getElementById("Name-A").innerHTML = "<strong>Account</strong>:" + data.account.name;
        document.getElementById("Date-A").innerHTML = "<strong>Date</strong>:" + data.date;
        document.getElementById("description-A").innerHTML = data.category.description;
        document.getElementById("content-A").innerHTML = data.content;
    }
})
}