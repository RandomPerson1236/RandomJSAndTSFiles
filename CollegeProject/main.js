"use strict";

const not_btn = document.getElementById('notification-btn');
const $window = document.querySelector('.notif-window');
const not_count = document.getElementById('notif-counter');

let notifications = [ ];

function getPosition( element ){
    let rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top
    }
}

let not_open = false;
not_btn.addEventListener('click', () => {
    not_open = !not_open;

    if (not_open) { 
        $window.style.display = 'flex'; 
        $window.style.left = `calc(${getPosition(not_btn).x}px / 1.5)`;
    }
    else $window.style.display = 'none';
});

function create_notification( content, img ){
    const fImg = img ? img : null; 

    notifications.push(content);
    console.log(notifications);

    const el = document.createElement('div');
    el.textContent = content;
    el.className = `notification-cNotImportant`;

    const del_btn = document.createElement('button');
    del_btn.innerHTML = '<i class="fa fa-trash" style="pointer-events: none;"></i>';

    del_btn.style.cssText = `margin: 5px; color: red; 
    font-size: 1rem; cursor: pointer; background: none; border: dashed 2px black;`;

    if (fImg != null){
        const mainImage = document.createElement('img');
        mainImage.src = fImg;
        mainImage.style.margin = '10px';

        el.append(mainImage);
    }

    el.append(del_btn);
    del_btn.addEventListener('click', e =>{
        let ev = e || window.event;

        e.target.parentElement.remove();
        notifications.length -= 1;
    });

    $window.append(el);
}

window.onload = ()=>{
    $window.children[2].style.display = 'none';

    create_notification(`
    Welcome to the Flower Pot Garden Centre website!
    We are here for you.
    `, './images/placeholder.jpg'
    );
}

const to_top_b = document.getElementById('to-top-notif');

to_top_b.addEventListener('click', ()=>{
    $window.scrollTop = 0;
});

function update(){
    requestAnimationFrame(update);
    not_count.textContent = `Notifications (${notifications.length})`;

    if ($window.scrollTop > 100) to_top_b.style.display = 'block';
    else to_top_b.style.display = 'none';

    to_top_b.style.top = `calc(275px + ${$window.scrollTop}px)`;

    if (notifications.length <= 0) $window.children[2].style.display = 'block';
        else if (notifications.length > 0) $window.children[2].style.display = 'none';

    if ($window.clientHeight < $window.scrollHeight) $window.style.width = '400px';
        else $window.style.width = '350px';
}
update();