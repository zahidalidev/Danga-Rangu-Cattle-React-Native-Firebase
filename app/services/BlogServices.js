import axios from "axios";

export const GetAllBlogs = async () => {
    const regex = /(<([^>]+)>)/ig;
    let { data } = await axios.get('https://iqcodec.tech/wp-json/wp/v2/posts');
    let filteredData = []
    for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i].date).toDateString()
        let tempObj = {
            id: data[i].id,
            date,
            title: decodeHtmlCharCodes(data[i].title.rendered),
            content: data[i].content.rendered,
            excerpt: decodeHtmlCharCodes(data[i].excerpt.rendered.replace(regex, '')),
            featuredImageSrc: data[i].featured_image_src,
            authorName: data[i].author_info.display_name
        };
        filteredData.push(tempObj);
    }
    return filteredData;
}

function decodeHtmlCharCodes(str) {
    return str.replace(/(&#(\d+);)/g, function (match, capture, charCode) {
        return String.fromCharCode(charCode);
    });
}