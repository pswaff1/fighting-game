// import Sprite from "/Sprite.js";

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Set canvas dimensions
canvas.width  = 1024
canvas.height = 576

const gravity = .2

// Define Sprite Class
class Sprite {
    constructor({position, velocity, dimensions}) {
        this.position   = position
        this.velocity   = velocity
        this.dimensions = dimensions
        this.keys = {
            a: {
                pressed: false
            },
            s: {
                pressed: false
            },
            d: {
                pressed: false
            },
            w: {
                pressed: false
            }
        }
        this.lastKey
        this.crouched = false
    }

    

    draw() {
        c.fillStyle = 'red'
        c.fillRect(
            this.position.x,
            this.position.y,
            this.dimensions.width, 
            this.dimensions.height
        )
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.dimensions.height + this.velocity.y > canvas.height) {
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity
        }
    }
}

// Create charactor Sprite
const player = new Sprite({
    position: {
    x: 0,
    y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    dimensions: {
        height: 150,
        width: 50
    }
})

// Create enemey Sprite
const enemy = new Sprite ({
    position: {
    x: 974,
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    dimensions: {
        height: 150,
        width: 50
    }
})



// Animating canvas
function animate () {
    window.requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)
    c.fillStyle = 'black'
    c. fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    )
    c.fillStyle = 'red'
    player.update()
    enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0

    // Move player horizontally
    if (player.keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 2
    } else if (player.keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -2
    }

    // Move enemy horizontally
    if (enemy.keys.d.pressed && enemy.lastKey === 'd') {
        enemy.velocity.x = 2
    } else if (enemy.keys.a.pressed && enemy.lastKey === 'a') {
        enemy.velocity.x = -2
    }
}
animate()

let isCrouched = false

// Listen for key presses
window.addEventListener('keydown', (event) => {
    // Player key presses
    if (event.key == 'd') {
        player.keys.d.pressed = true
        player.lastKey = 'd'
    } else if (event.key == 'a') {
        player.keys.a.pressed = true
        player.lastKey = 'a'
    } else if (event.key == 's' && player.crouched === false) {
        player.dimensions.height /= 2
        player.position.y += player.dimensions.height
        player.crouched = true
    } else if (event.key == 'w' && player.position.y + player.dimensions.height >= canvas.height) {
        player.velocity.y = - 10
    }

    // Enemy key presses
    if (event.key == 'ArrowRight') {
        enemy.keys.d.pressed = true
        enemy.lastKey = 'd'
    } else if (event.key == 'ArrowLeft') {
        enemy.keys.a.pressed = true
        enemy.lastKey = 'a'
    } else if (event.key == 'ArrowDown' && enemy.crouched === false) {
        enemy.dimensions.height /= 2
        enemy.position.y += enemy.dimensions.height
        enemy.crouched = true
    } else if (event.key == 'ArrowUp' && enemy.position.y + enemy.dimensions.height >= canvas.height) {
        enemy.velocity.y = - 10
    }
})

// Listen for key releases
window.addEventListener('keyup', (event) => {
    // Player keyups
    if (event.key == 'd') {
        player.keys.d.pressed = false
    } else if (event.key == 'a') {
        player.keys.a.pressed = false
    } else if (event.key == 's' && player.crouched == true) {
        player.position.y -= player.dimensions.height
        player.dimensions.height *= 2
        player.crouched = false
    }

    // Enemy keyups
    if (event.key == 'ArrowRight') {
        enemy.keys.d.pressed = false
    } else if (event.key == 'ArrowLeft') {
        enemy.keys.a.pressed = false
    } else if (event.key == 'ArrowDown' && enemy.crouched == true) {
        enemy.position.y -= enemy.dimensions.height
        enemy.dimensions.height *= 2
        enemy.crouched = false
    }
})