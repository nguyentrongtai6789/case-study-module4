function updateUser(id_blog) {
    localStorage.setItem("id_blog", id_blog)
    window.location.href = "../html/update_blog_user.html";
}
function showCategory() {
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/category",
        success:function (data){
            console.log("line2")
            console.log(data)
            let content = "";
            if (data.length !== null){
                for (let i = 0; i < data.length; i++) {
                    content += "<option value=\"" + data[i].id + "\">" + data[i].name + "</option>";
                }
                document.getElementById("category").innerHTML = content;
            }
        }
    })
}
function updateBlog() {
    let id_blog = +localStorage.getItem("id_blog");
    let a = localStorage.getItem("token");
    console.log(a)
    console.log(id_blog);
    showCategory();
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        type: "GET",
        url: "http://localhost:8080/api/blog/update/" + id_blog,
        success: function (data){
            document.getElementById("title").value = data.title;
            document.getElementById("content").value = data.content;
            document.getElementById("date").value = data.date;
            document.getElementById("account").value = data.account.name;
            document.getElementById("category").value = data.category.id;
            localStorage.setItem("id_account_update",data.account.id)
            localStorage.setItem("image_path",data.url_img)
        }
    })
}
function updateNewBlog() {
    let id_blog = +localStorage.getItem("id_blog");
    console.log("line4")
    console.log(id_blog);
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let url_img = null;
    let date = document.getElementById("date").value;
    let account = null;
    let category = null;
    let file = $("#img")[0].files[0];
    let id_account = +localStorage.getItem("id_account_update");
    let id_category = document.getElementById("category").value;

    if (file === undefined) {
        file = new File([], "", undefined)
        url_img = localStorage.getItem("image_path")
    }
    console.log("id category =" + id_category)
    let blog = {
        id: id_blog,
        title: title,
        content: content,
        url_img: url_img,
        date: date,
        account: account,
        category: category
    }
    console.log("line3")
    console.log(blog)
    let formData = new FormData();
        formData.append("blog", new Blob([JSON.stringify(blog)], {type: 'application/json'}));
        formData.append("file", file)
    console.log(formData)
    $.ajax({
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, // phải có cái headers này chú ý!!!!
        url: "http://localhost:8080/api/blog/update/" + id_account+ "/" + id_category,
        type: "POST",
        processData: false,
        contentType: false,
        data: formData,
        success: function (){
            alert("Sửa thành công");
            window.location.href = "../html/home-user3.html";
        }
    })

}