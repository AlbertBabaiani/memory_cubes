const boxes = [...document.querySelectorAll('.box')]

const my_moves = [];
const random_moves = [];

let steps = 0;
let maxx = 0;


let next_level_access = false;
let clicked = 0;

const purple = '#6a0dad', darkerPurple = '#451d62'

const area = document.querySelector('.area');

const score = document.getElementById('score');
const max_score = document.getElementById('max_score');

const restart_btn = document.getElementById('restart');
const restart_container = document.querySelector('.restart-container');


let speed = 1000;

//////////////////////////
/// Audio
//////////////////////////


const audio = document.createElement('audio');

audio.src = 'Click Sound Effect.mp3';
audio.currentTime = 0.2;




//////////////////////////
/// Audio End
//////////////////////////

const indexes = [1, 2, 4, 3];

function lose_effect(){
    if ('vibrate' in navigator) {
        navigator.vibrate([150, 50, 150]);
    }

    area.classList.add('area-lose-active');
    block_buttons();

    let i = 0;
    setTimeout(function(){

        const lose_showing = setInterval(function(){
            document.getElementById(indexes[i]).style.background = darkerPurple;
        
            setTimeout(function(){
                document.getElementById(indexes[i]).style.background = purple;
                i++;
            }, 200)

            if(i === 3) {
                clearInterval(lose_showing);

                setTimeout(function(){
                    restart_container.style.display = 'block';
                    document.querySelector('.speed').style.display = 'flex';
                    document.querySelector('.speed').style.opacity = '1';
                }, 200)
            }
        }, 300)
        
    }, 500) 
        
}

function restart(){
    block_buttons();
    my_moves.length = 0;
    random_moves.length = 0;
    clicked = 0;
    // next_level_access = false;

    if(steps > parseInt(localStorage.getItem('max_score'))){
        maxx = steps;
        max_score.textContent = maxx;
        localStorage.setItem('max_score', JSON.stringify(maxx))
    }

    steps = 0;
    score.textContent = 0;
    window.addEventListener('keyup', start_game)
    restart_btn.addEventListener('click', start_game)
}

if(localStorage.getItem('max_score') === null){
    localStorage.setItem('max_score', "0")
    location.reload();
    show_max_score();
}

window.onload = function show_max_score(){
    max_score.textContent = JSON.parse(localStorage.getItem('max_score'))
}

function click(){
    this.classList.add('clicked')
    
    setTimeout(() => {
        this.classList.remove('clicked')
    }, 200);
    
    
    my_moves.push(parseInt(this.id))
    
    next_level_access = true;

    for(let i = 0; i < my_moves.length; i++){
        if(random_moves[i] !== my_moves[i]){
            next_level_access = false;
            lose_effect()
            restart();
            break;
        }
    }

    if(next_level_access){

        
        clicked++;
        
        if(clicked === random_moves.length){
            
            if(next_level_access){
                steps++;
                score.textContent = steps;
                newTask();

                if(steps > parseInt(localStorage.getItem('max_score'))){
                    maxx = steps;
                    max_score.textContent = maxx;
                    localStorage.setItem('max_score', JSON.stringify(maxx))
                }
            }
            else{
                lose_effect()
                restart();
            }
            clicked = 0;
        }
    }
}




// boxes.forEach( box =>{
//     box.addEventListener('click', click)
// })




//////////////////////////////////

function block_buttons(){
    boxes.forEach(box => {
        box.removeEventListener('click', click)
        box.style.cursor = 'default'
    });
}

function allow_buttons(){
    boxes.forEach(box => {
        box.addEventListener('click', click)
        box.style.cursor = 'pointer'
    });
}



//////////////////////////////////





function newTask(){
    block_buttons();
    
    const random_box = Math.ceil(Math.random() * 4);
    random_moves.push(parseInt(random_box))
    
    let index = 0;
    
    const showing = setInterval(function(){
        block_buttons();
        document.getElementById(random_moves[index]).style.background = darkerPurple;
        
        setTimeout(function(){
            document.getElementById(random_moves[index]).style.background = purple;
            index++;
        }, 400)

        if(index === steps){
            clearInterval(showing)

            setTimeout(allow_buttons, 500)

            my_moves.length = 0
        }


    }, speed)
}



function start_game(key){
    if(key.key === ' ' || this.id === 'restart'){
        area.classList.remove('area-lose-active');

        restart_container.classList.remove('start');

        restart_container.style.display = 'none';
        
        document.querySelector('.speed').style.opacity = '0';
        setTimeout(function(){
            document.querySelector('.speed').style.display = 'none';
        }, 300)

        window.removeEventListener('keyup', start_game)
        restart_btn.removeEventListener('click', start_game)
        newTask()
    }
}


window.addEventListener('keyup', start_game)
restart_btn.addEventListener('click', start_game)

const speed_1 = document.getElementById('speed-1')
const speed_2 = document.getElementById('speed-2')
const speed_3 = document.getElementById('speed-3')

speed_1.onclick = speed_checker;
speed_2.onclick = speed_checker;
speed_3.onclick = speed_checker;

function speed_checker(){
    if(speed_1.checked){
        speed = 1500;
    }
    if(speed_2.checked){
        speed = 1000;
    }
    if(speed_3.checked){
        speed = 500;
    }
}

speed_checker();