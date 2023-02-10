// There's no explanation for this one...

(async function(){
    "use strict";

    (await function get_map(){ return url_list })();

    let url = url_list.get('#1'); // #1 is jpg and #2 is a png

    await fetch(url)
        .then(response => {
            if (response.ok){

                if (url.lastIndexOf('jpg') != -1 || url.lastIndexOf('png') != -1){

                    const $body = document.body;

                    const container = document.createElement('div');
                    container.style.cssText = container_css;
                    container.className = `image-container-c${Math.floor(Math.random() * (500 - 100) + 100)}`;
                    container.innerText = 'Image Holder';

                    $body.append(container);

                    const image = document.createElement('img');
                    image.src = url;
                    image.width = container.clientWidth / 2;
                    
                    container.append(image);

                    const del_btn = document.createElement('button');
                    del_btn.style.cssText = del_css;
                    del_btn.textContent = 'X';
                    del_btn.title = 'Delete';

                    container.append(del_btn);

                    ['click', 'mouseover', 'mouseout'].forEach(event_btn => {
                        del_btn.addEventListener(event_btn, e =>{
                            let ev = e.event || window.event;
                            
                            switch (event_btn){
                                case 'click':
                                    ev.target.parentElement.remove();
                                    break;
                                case 'mouseover':
                                    ev.target.style.cssText = del_css_hover;
                                    break;
                                case 'mouseout':
                                    ev.target.style.cssText = del_css;
                                    break;
                            }
                        });
                    })

                }

            }
        })
        .catch(err => {
            console.error(`something went wrong: ${err}`)
        });

})();

let url_list = new Map();
url_list.set('#1', 'https://raw.githubusercontent.com/RandomPerson1236/RandomJSFilesIMade/main/IMAGES/IMG_20221020_193535_466.jpg');
url_list.set('#2', 'https://raw.githubusercontent.com/RandomPerson1236/RandomJSFilesIMade/main/IMAGES/cookie.png');

const container_css =  
`
background: white;
width: 50%;
border: solid 2px black;
padding: 10px;
display: flex;
align-items: center;
flex-direction: column;
position: absolute;
top: 10px;
left: 10px;
`;
const del_css = 
`
background: red;
color: white;
position: absolute;
top: 82%;
padding: 10px 12px;
border-radius: 50%;
transition: 0.20s;
`;
const del_css_hover = 
`
background: white;
color: black;
font-weight: bold;
position: absolute;
top: 82%;
padding: 10px 12px;
border-radius: 50%;
border-color: skyblue;
box-shadow: 0 0 10px white, 0 0 15px skyblue;
transition: 0.20s;
`;