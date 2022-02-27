import Player from "./player.js";
import MovableShape from "./movableShape.js";
import Enemy from "./enemy.js";
import Particle from "./particle.js";
const init = (() => {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const score = document.getElementById("score");
  const projectiles = [];
  const enemies = [];
  const particles = [];
  let player;

  if (!context) {
    alert("Your browser does not support HMTL Canvas");
    return;
  }

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("click", fireProjectile);

  function resizeCanvas() {
    alert("Resizing the window will break the game !. Please reload the page");
    window.location.reload();
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const middleWidth = canvas.width / 2;
  const middleHeight = canvas.height / 2;
  player = new Player(
    context,
    middleWidth,
    middleHeight,
    30,
    "rgb(255, 255, 255)",
    { x: 0, y: 0 }
  );

  let animationId;
  function gameLoop() {
    animationId = requestAnimationFrame(gameLoop);
    context.fillStyle = "rgb(0, 0, 0, 0.1)";
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.drawArc();
    player.update();

    projectiles.forEach((projectile, index) => {
      projectile.drawArc();
      projectile.update();
      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        projectiles.splice(index, 1);
      }
    });

    enemies.forEach((enemy, index) => {
      enemy.drawArc();
      enemy.update();
      detectProjectiles(enemy, index);
      detectPlayerCollision(enemy, index, player);
      if (
        enemy.x + enemy.radius < 0 ||
        enemy.x - enemy.radius > canvas.width ||
        enemy.y + enemy.radius < 0 ||
        enemy.y - enemy.radius > canvas.height
      ) {
        enemies.splice(index, 1);
      }
    });

    particles.forEach((particle, index) => {
      particle.drawArc();
      particle.update();
      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      }
    });
  }

  function detectPlayerCollision(enemy, index, player) {
    const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    if (distance - enemy.radius - player.radius < 1) {
      setTimeout(() => {
        enemies.splice(index, 1);
        cancelAnimationFrame(animationId);
        createEndScreen();
      }, 0);
    }
  }

  function createEndScreen() {
    const endScreen = document.createElement("h1");
    const button = document.createElement("button");
    button.classList.add("play-again");
    button.innerText = "Play Again";

    button.addEventListener("click", () => {
      window.location.reload();
    });

    endScreen.classList.add("endScreen");
    endScreen.innerText = `Score: ${score.innerText}`;
    document.body.appendChild(endScreen);
    document.body.appendChild(button);
  }

  function detectProjectiles(enemy, enemyIndex) {
    projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y
      );
      if (distance - enemy.radius - projectile.radius < 1) {
        setTimeout(() => {
          projectiles.splice(projectileIndex, 1);
          if (enemy.radius - 10 > 10) {
            enemy.radius -= 10;
          } else {
            for (let i = 0; i < 8; i++) {
              particles.push(
                new Particle(
                  context,
                  projectile.x,
                  projectile.y,
                  Math.random() * (6 - 1) + 1,
                  enemy.color,
                  {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                  }
                )
              );
            }

            enemies.splice(enemyIndex, 1);
            score.innerText = Number(score.innerText) + 1;
          }
        }, 0);
      }
    });
  }

  function fireProjectile(ev) {
    const origin = { x: player.x, y: player.y };
    const theta = getTheta(origin, ev.clientX, ev.clientY);
    const velocity = getVelocity(theta);
    const projectile = new MovableShape(context, origin.x, origin.y, 5, "red", {
      x: velocity.x * 5,
      y: velocity.y * 5,
    });
    projectiles.push(projectile);
  }

  function spawnEnemies() {
    let time = 1000;
    setInterval(() => {
      if (time >= 200) {
        time -= 100;
      }
      const radius = Math.random() * (90 - 10) + 10;
      let x, y;
      if (Math.random() < 0.5) {
        x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
      } else {
        x = Math.random() * canvas.width;
        y = Math.random() > 0.5 ? canvas.height + radius : 0 - radius;
      }

      const playerLoc = { x: player.x, y: player.y };
      const origin = { x: x, y: y };
      const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;
      const theta = getTheta(origin, playerLoc.x, playerLoc.y);
      const velocity = getVelocity(theta);
      const enemy = new Enemy(context, x, y, radius, color, velocity);
      enemies.push(enemy);
    }, time);
  }

  function getTheta(origin, x, y) {
    const distanceX = x - origin.x;
    const distanceY = y - origin.y;
    return Math.atan2(distanceY, distanceX);
  }

  function getVelocity(theta) {
    return { x: Math.cos(theta), y: Math.sin(theta) };
  }

  spawnEnemies();
  gameLoop();
})();
