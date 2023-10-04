function update(id_blog) {
    localStorage.setItem("id_blog", id_blog)
    window.location.href = "../html/index.html";
}
function showCategory() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/",
        success:function (data){
            let content = "";
            if (data.length !== null){
                for (let i = 0; i < data.length; i++) {
                    content += "<option value=\"" + data[i].id + "\">" + data[i].name + "</option>";
                }
                document.getElementById("category").value = content;
            }
        }
    })
}
function updateBlog() {
    let id_blog = +localStorage.getItem("id_blog");
    showCategory();
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blog/update/" + id_blog,
        success: function (data){
            document.getElementById("title").value = data.title;
            document.getElementById("content").value = data.content;
            document.getElementById("date").value = data.date;
            document.getElementById("account").value = data.account.name;
            document.getElementById("category").value = data.category.id;
            localStorage.setItem("id_account_update",data.account.id)
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
    let id_account = +localStorage.getItem("id_account_update");
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