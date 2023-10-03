function update(id_blog) {
    localStorage.setItem("id_blog", id_blog)
    window.location.href = "../html/index.html";
}
function updateBlog() {
    let id_blog = +localStorage.getItem("id_blog");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blog/update/" + id_blog,
        success: function (data){
            document.getElementById("title").values = data.title;
            document.getElementById("content").values = data.content;
            document.getElementById("date").values = data.date;
            document.getElementById("account").values = data.account.id;
            document.getElementById("category").values = data.category.id;
        }
    })
}
function updateNewBlog() {
    let id_blog = +localStorage.getItem("id_blog");
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let url_img = null;
    let date = document.getElementById("date").value;
    let account = null;
    let category = null;
    let file = document.getElementById("file")[0].files[0];
    let id_account = document.getElementById("account").value;
    let id_category = document.getElementById("category").value;
    let blog = {
        id_blog: id_blog,
        title: title,
        content: content,
        url_img: url_img,
        date: date,
        account: account,
        category: category
    }
    let formData =new FormData();
        formData.append("blog", new Blob([JSON.stringify(blog)], {type: 'application/json'}));
        formData.append("file", file)
    $.ajax({
        type: "http://localhost:8080/api/blog/update" + id_account+ "/" + id_category,
        url: "http://localhost:8080/api/blog/update",
        success: function (){
            alert("Sửa thành công");
        }
    })

}