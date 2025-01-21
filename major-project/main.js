let isfinalbossdead = false;
let gameclear = false;
let firstfloor;
let finalfloor;
let player; 
let tileSize = 16; 
let moveSpeed = 2; 
let currentstage;
let hasportalkey = true;
let hasfinaldoorkey = true;

// Enemy variables
let enemyX, enemyY;
let enemySpeed = 1.5;
let playerHealth = 100;
let enemyHealth = 50; 

// Enemy variables
let normalEnemySpriteSheet;
let normalEnemyFrames = [];
let normalEnemyCurrentFrame = 0;
let normalEnemyFrameRateSpeed = 8; // Animation speed

// Final boss variables
let finalboss;
let bossFrames = [];
let bossCurrentFrame = 0;
let bossFrameRateSpeed = 8; //Boss Animation speed
let bossHealth = 75; 
let bossX, bossY; 
let bossAttackDamage = 0; 
let bossAttackCooldown = 60; 
let lastBossAttackFrame = 0; 

// Final boss weapon variable
let bossIsSwinging = false;
let bossSwingAngle = 0;
let bossSwingSpeed = 10;
let bossWeaponSprite;

// Player animation variables
let playerSpriteSheet;
let playerFrames = { down: [], left: [], right: [], up: [] };
let currentFrame = 0;
let frameRateSpeed = 8;
let isMoving = false;
let direction = 'down'; // Initial player direction

// Weapon variables
let weaponSprite;
let isSwinging = false;
let swingAngle = 0;
let swingSpeed = 10; 


let gameStarted = true;
let playAgainButton;
let lastEnemyAttackFrame = 0; 
function preload() {
  firstfloor = loadImage('/major-project/background-resource/first stage.png');
  finalfloor = loadImage('/major-project/background-resource/final stage.png');
  playerSpriteSheet = loadImage('/major-project/player/walk.png');
  normalEnemySpriteSheet = loadImage('/major-project/allimage/walk.png');
  weaponSprite = loadImage('/major-project/allimage/icon_32_2_13.png');
  finalboss = loadImage('/major-project/allimage/bossidle.png');
  bossWeaponSprite = loadImage('/major-project/allimage/icon_32_11.png');
}

function setup() {
  currentstage = firstfloor;
  createCanvas(currentstage.width, currentstage.height);
  textSize(32);
  textAlign(CENTER, CENTER);

  player = { x: currentstage.width / 4 + 30, y: 160, size: 32, moveSpeed: moveSpeed, health: 100 };
  playerHealth = 100;

  enemyX = 150;
  enemyY = 325;

  bossX = 350; // Final boss initial position
  bossY = 150;

  let frameWidth = playerSpriteSheet.width / 6;
  let frameHeight = playerSpriteSheet.height / 4;

  for (let i = 0; i < 9; i++) {
    playerFrames.down.push(playerSpriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight));
    playerFrames.left.push(playerSpriteSheet.get(i * frameWidth, frameHeight, frameWidth, frameHeight));
    playerFrames.right.push(playerSpriteSheet.get(i * frameWidth, frameHeight * 2, frameWidth, frameHeight));
    playerFrames.up.push(playerSpriteSheet.get(i * frameWidth, frameHeight * 3, frameWidth, frameHeight));
  }

  let enemyFrameWidth = normalEnemySpriteSheet.width / 8;
  let enemyFrameHeight = normalEnemySpriteSheet.height;
  for (let i = 0; i < 8; i++) {
    normalEnemyFrames.push(normalEnemySpriteSheet.get(i * enemyFrameWidth, 0, enemyFrameWidth, enemyFrameHeight));
  }

  let bossFrameWidth = finalboss.width / 4;
  let bossFrameHeight = finalboss.height;
  for (let i = 0; i < 4; i++) {
    bossFrames.push(finalboss.get(i * bossFrameWidth, 0, bossFrameWidth, bossFrameHeight));
  }

  playAgainButton = createButton('Play Again');
  playAgainButton.position(width / 2 - 60, height / 2 + 50);
  playAgainButton.size(120, 40);
  playAgainButton.mousePressed(resetGame);
  playAgainButton.hide();
}

function draw() {
  if (gameStarted) {
    background(0);
    image(currentstage, 0, 0);

    let currentAnimation = playerFrames[direction];
    if (isMoving) {
      image(currentAnimation[currentFrame], player.x, player.y, player.size, player.size);
      if (frameCount % frameRateSpeed === 0) {
        currentFrame = (currentFrame + 1) % currentAnimation.length;
      }
    } else {
      image(currentAnimation[0], player.x, player.y, player.size, player.size);
    }

    if (isSwinging) swingWeapon();
    drawEnemy();
    drawFinalBoss();

    fill(255);
    textSize(16);
    text("Health: " + max(playerHealth, 0), player.x - 20, player.y - 30);

    if (currentstage === firstfloor && enemyHealth > 0) {
      text("Enemy Health: " + max(enemyHealth, 0), enemyX - 20, enemyY - 30);
    } else if (currentstage === finalfloor && bossHealth > 0) {
      text("Boss Health: " + max(bossHealth, 0), bossX, bossY - 30);
    }

    if (playerHealth <= 0) {
      gameStarted = false;
      playerHealth = 0;
    }
  } else {
    background(0);
    textSize(32);
    fill(255);
    text("You Died", width / 2, height / 2 - 30);
    playAgainButton.show();
    noLoop();
  }
}

function resetGame() {
  playerHealth = 100;
  enemyHealth = 100;
  bossHealth = 200;
  player.x = currentstage.width / 4 + 30;
  player.y = 160;
  enemyX = currentstage.width / 2;
  enemyY = currentstage.height / 2 + 40;
  gameStarted = true;
  playAgainButton.hide();
  loop();
}

function keyPressed() {
  if (!gameStarted) return;

  let nextX = player.x;
  let nextY = player.y;
  isMoving = true;

  if (keyCode === UP_ARROW) {
    nextY -= tileSize;
  }
  else if (keyCode === DOWN_ARROW) {
    nextY += tileSize;
  }
  else if (keyCode === LEFT_ARROW) {
    nextX -= tileSize;
  }
  else if (keyCode === RIGHT_ARROW) {
    nextX += tileSize;
  }

  if (keyCode === 65 && !isSwinging) {
    isSwinging = true;
    swingAngle = 0;
  }

  if (!isBlocked(nextX, nextY)) {
    player.x = nextX;
    player.y = nextY;
  }

  player.x = constrain(player.x, 0, width - player.size);
  player.y = constrain(player.y, 0, height - player.size);
  
     // Check if the player is near the portal at specific coordinates and presses 'E' to interact
  if (player.x === 1587 && player.y === 48 && keyCode === 69) {
    if (hasfinaldoorkey === true) {
      interactWithnextdoor();
    } 
  } else if (player.x === 118 && player.y === 320 && keyCode === 69) {
    if (hasportalkey === true) {
      player.x = 915;
      player.y = 272;
    }
  } else if (player.x === 915 && player.y === 272 && keyCode === 69) {
    player.x = 134;
    player.y = 320;
  } else if (player.x === 358 && player.y === 0 && keyCode === 69 && currentstage === finalfloor && isfinalbossdead === true) {
    alert("You win the game!");
    background(0);
    text("CONGRATUATION", 1000, height/2);
    gameclear = true;
  }
}

function keyReleased() {
  if ([UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].includes(keyCode)) {
    isMoving = false;
  }
}

function isBlocked(x, y) {
  let tileColor = currentstage.get(x + player.size / 2, y + player.size / 2);
  return red(tileColor) < 50 && green(tileColor) < 50 && blue(tileColor) < 50;
}

function drawEnemy(x, y) {
  if (currentstage !== firstfloor || enemyHealth <= 0) {
    return; // Stop rendering the enemy if not on the first floor or health is 0
  }

  // Enemy movement and attack 
  let distanceToPlayer = dist(player.x, player.y, enemyX, enemyY);

  if (playerHealth > 0 && distanceToPlayer <= 100) { // Adjust follow distance
    let angleToPlayer = atan2(player.y - enemyY, player.x - enemyX);
    enemyX += cos(angleToPlayer) * enemySpeed;
    enemyY += sin(angleToPlayer) * enemySpeed;
  }

  if (playerHealth > 0 && distanceToPlayer <= 50) { // Adjust attack distance
    if (frameCount - lastEnemyAttackFrame > 60) { 
      playerHealth -= 10; // Decrease player health
      lastEnemyAttackFrame = frameCount; 
    }
  }

  // Draw enemy sprite
  if (enemyHealth > 0) {
    let currentAnimationFrame = normalEnemyFrames[normalEnemyCurrentFrame];
    image(currentAnimationFrame, enemyX, enemyY, 32, 32);

    if (frameCount % normalEnemyFrameRateSpeed === 0) {
      normalEnemyCurrentFrame = (normalEnemyCurrentFrame + 1) % normalEnemyFrames.length;
    }
  }
}


function drawFinalBoss() {
  if (isfinalbossdead) {
    return; // Stop rendering if the boss is dead
  }

  if (currentstage !== finalfloor || bossHealth <= 0) {
    if (bossHealth <= 0) {
      isfinalbossdead = true;
      bossAttackDamage = 0; // Boss stops attack
    }
    return;
  }

  // Draw boss animation
  let currentFrame = bossFrames[bossCurrentFrame];
  image(currentFrame, bossX, bossY, 64, 64);

  if (frameCount % bossFrameRateSpeed === 0) {
    bossCurrentFrame = (bossCurrentFrame + 1) % bossFrames.length;
  }

  // Boss follows the player
  let distanceToPlayer = dist(player.x, player.y, bossX, bossY);
  if (distanceToPlayer < 150) {
    let angle = atan2(player.y - bossY, player.x - bossX);
    bossX += cos(angle) * 1; // Adjust boss speed
    bossY += sin(angle) * 1;
  }

  // Boss attack 
  if (distanceToPlayer < 100 && frameCount - lastBossAttackFrame > bossAttackCooldown) {
    bossIsSwinging = true; // Start the swing
    lastBossAttackFrame = frameCount;
  }

  if (bossIsSwinging) {
    swingBossWeapon(distanceToPlayer);
  }
}function swingBossWeapon(distanceToPlayer) {
  push();
  translate(bossX + 32, bossY + 32); 
  rotate(radians(bossSwingAngle));
  imageMode(CENTER);
  image(bossWeaponSprite, 8, 0, 32, 32); // Draw the weapon
  pop();

  bossSwingAngle += bossSwingSpeed;

  if (bossSwingAngle >= 360) {
    bossIsSwinging = false;
    bossSwingAngle = 0;

    if (distanceToPlayer < 50 && bossAttackDamage > 0) { 
      playerHealth -= bossAttackDamage; // Decrease player health
    }
  }
}

function swingWeapon() {
  push();
  translate(player.x + player.size / 2, player.y + player.size / 2);
  rotate(radians(swingAngle));
  imageMode(CENTER);
  image(weaponSprite, 8, 0, 24, 24);
  pop();

  swingAngle += swingSpeed;

  if (swingAngle >= 360) {
    isSwinging = false;
    swingAngle = 0;

    if (currentstage === firstfloor) {
      let distanceToEnemy = dist(player.x, player.y, enemyX, enemyY);
      if (distanceToEnemy < 50) {
        enemyHealth -= 25;
      }
    } else if (currentstage === finalfloor) {
      let distanceToBoss = dist(player.x, player.y, bossX, bossY);
      if (distanceToBoss < 50) {
        bossHealth -= 25;

        // Boss retaliates
        playerHealth -= 20;
      }
    }
  }
}


function interactWithnextdoor() {
  if (currentstage === firstfloor) {
    currentstage = finalfloor;
    player.x = finalfloor.width / 2 - 10;
    player.y = finalfloor.height - 50;
    enemyX = finalfloor.width / 2;
    enemyY = finalfloor.height / 2 + 40;
  } else {
    alert("There is no portal here.");
  }
}