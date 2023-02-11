// image uploader. HTML code at bottom.

"use strict";

const $button = document.getElementById('upload-button');

$button.addEventListener('click', ()=> { document.getElementById('upload-main').click() });

function set_image(objectURL){

    const u_img = document.getElementById('preview-image uploaded');

    const url = URL.createObjectURL(objectURL);
    u_img.style.cssText = 'position: absolute; width: 200px;';

    u_img.src = url;
    
    u_img.addEventListener('load', ()=> { URL.revokeObjectURL(url) });

}

document.getElementById('upload-main').addEventListener('change', e =>{

    set_image(e.target.files[0])

});

const $container = document.querySelector('.upload-container');

$container.addEventListener('dragover', e =>{ e.preventDefault(); $container.style.borderColor = 'blue' });
$container.addEventListener('dragleave', ()=>{ $container.style.borderColor = 'skyblue' });
$container.addEventListener('drop', e =>{ 

    e.preventDefault();

    $container.style.borderColor = 'skyblue'; 

    if (e.dataTransfer.items){
        [...e.dataTransfer.items].forEach(item => {
            if (item.type.includes('image')){
                const file = item.getAsFile();
                set_image(file);
            }
        })
    } else {
        [...e.dataTransfer.files].forEach(file => {
            if (item.type.includes('image')){
                set_image(file);
            }
        })
    }
});

(async url => {
    url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

    await fetch(url)
        .then(response => {
            if (response.ok){
                const font_awesome = document.createElement('link');
                font_awesome.rel = 'stylesheet'; 
                font_awesome.type = 'text/css';
                font_awesome.href = url;
                
                document.head.append(font_awesome);
            }
            else if (response.status === 404){
                $button.textContent = 'UPLOAD';
            }
        })
        .catch(err => {
            console.warn('Error '+err)
            $button.textContent = 'UPLOAD';
        });
})();

$container.style.cssText = 
`
width: clamp(300px, 50vw, 50vw);
height: 250px;
padding: 10px;
background-color: white;
overflow: auto;
border: skyblue dashed;
border-radius: 15px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
font-family: Helvetica, Sans-serif;
`;

$button.style.cssText = 
`
background-size: 100%;
padding: 20px 20px;
cursor: pointer;
font-size: 5rem;
border: none;
background: none;
color: skyblue;
`;

/* insert this html code

<div class="upload-container">
    <input type="file" id="upload-main" style="display: none;">
    <button id="upload-button"><i class="fa fa-cloud-upload"></i></button>
    <span>Drag and Drop or Click</span>
    <img id="preview-image uploaded">
</div>

*/
