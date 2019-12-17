let mql = window.matchMedia('(prefers-color-scheme: dark)');
if (mql.matches) {
    console.log('dark');
    
let image_id = document.getElementById("post-1");
console.log(image_id);

let image_class = document.getElementsByClassName("wp-post-image");
console.log(image_class[0]);

let image_class_first = image_class[0];

image_class_first = 'https://i1.wp.com/roark.at/wp-content/uploads/2019/04/XOXO7123.jpg';
image_class_first.srcset = "https://i1.wp.com/roark.at/wp-content/uploads/2019/04/XOXO7123.jpg";

}