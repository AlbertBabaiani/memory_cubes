const boxes = [...document.querySelectorAll('.box')]

const my_moves = [];
const random_moves = [];
let steps = 0;
let next_level_access = false;
let clicked = 0;

const purple = '#6a0dad', darkerPurple = '#451d62'

const score = document.getElementById('score');
const max_score = document.getElementById('max_score');
const press = document.querySelector('.press') ;

///////////////////////


function again(){
    press.style.display = 'block'
            
    my_moves.length = 0;
    random_moves.length = 0;
    steps = 0;
    clicked = 0;

    window.addEventListener('keyup', starting_game)
}


function click(){
    ////////////// Animation
    this.classList.add('clicked')
    
    setTimeout(() => {
        this.classList.remove('clicked')
    }, 200);


    ////////////// Animation


    my_moves.push(parseInt(this.id));

    console.log(my_moves)
    console.log(random_moves)

    next_level_access = true;
    for(let i = 0; i < my_moves.length; i++){
        if(my_moves[i] !== random_moves[i]){
            next_level_access = false;
            console.log('no')
            again()
            break;
        }
    }

    clicked++;

    if(clicked === random_moves.length){

        if(next_level_access){
            console.log('yes')
            steps++;
            score.textContent = steps;
            newTask();
        }
        else{
            again();
            console.log('no')
        }
        clicked = 0;
    }

}

boxes.forEach(box => {
    box.addEventListener('click', click)
});

/////////////////////////



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










//////////////////////////


function newTask(){
    console.log('gg')
    block_buttons()
    
    const random_box = Math.ceil(Math.random() * 4);
    random_moves.push(random_box);
    
    
    let moves = 0;
    
    const showing = setInterval(function(){
        block_buttons()
        document.getElementById(parseInt(random_moves[moves])).style.background = darkerPurple;
        
        setTimeout(function(){
            document.getElementById(parseInt(random_moves[moves])).style.background = purple;
            moves++;
        }, 500)
        
        if(moves === steps){
            clearInterval(showing)

            setTimeout(allow_buttons, 500)
        }

        my_moves.length = 0;
    }, 1000)
    
}

// newTask()

function starting_game(k){
    if(k.key === ' '){
        press.style.display = 'none'

        newTask()
        window.removeEventListener('keyup', starting_game)
    }
}

window.addEventListener('keyup', starting_game)


/////////////////////////