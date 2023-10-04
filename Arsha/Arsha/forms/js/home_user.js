function disPlayBlogs() {
    $.ajax({
        type:"Get",
        url: "http://localhost:8080/api/blog",
        success: function (data){
            console.log("line1")
            console.log(data)
            let content = "";
            if (data.length !== null){
                for (let i = 0; i < data.length; i++) {
                    content += blogs(data[i]);
                }
                document.getElementById("list_blog").innerHTML = content;
            }
        }
    })
}
function blogs(data) {
    return "<div class=\"col-lg-6\" data-aos=\"zoom-in\" data-aos-delay=\"100\">\n" +
        "            <div class=\"member d-flex align-items-start\">\n" +
        "              <div class=\"pic\"><img src=\"/src/main/resources/static/img/" + data.url_img +"\" class=\"img-fluid\" alt=\"\"></div>\n" +
        "              <div class=\"member-info\">\n" +
        "                <h4>" + data.title +"</h4>\n" +
        "                <span>" + data.date + "</span>\n" +
        "                <p>" + data.category.name + "</p>\n" +
        "                <div class=\"social\">\n" +
        "                  <a href=\"\"><i class=\"ri-wallet-2-fill\"></i></a>\n" + "<br/>" +
        "                  <button  style='width: 100px; border-radius: 20px; background-color: #6791cd' onclick='update(" + data.id + ")'>update</button>" +
        "            </div>\n" +
        "          </div>";
}