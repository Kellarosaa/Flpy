// script.js
let canvas = document.getElementById('game-canvas');
let ctx = canvas.getContext('2d');
let bird = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.2,
    lift: -10
};
let pipes = [];
let score = 0;
let gameOver = false;

// Event listeners
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
    bird.velocity = bird.lift;
}

function handleTouchEnd(event) {
    bird.velocity = 0;
}

function update() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.radius > canvas.height) {
        gameOver = true;
    }

    // Update pipes
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2;
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
        }
    }

    // Generate new pipes
    if (Math.random() < 0.05) {
        let pipe = {
            x: canvas.width,
            y: Math.random() * (canvas.height - 100),
            width: 50,
            height: 100
        };
        pipes.push(pipe);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw pipes
    ctx.fillStyle = 'green';
    for (let i = 0; i < pipes.length; i++) {
        ctx.fillRect(pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);
        ctx.fillRect(pipes[i].x, pipes[i].y + pipes[i].height + 100, pipes[i].width, canvas.height - (pipes[i].y + pipes[i].height + 100));
    }

    // Draw score
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 10);

    // Draw game over screen
    if (gameOver) {
        ctx.font = '48px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
