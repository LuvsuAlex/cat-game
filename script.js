const cat = document.getElementById("cat");
const fish = document.getElementById("fish");
const livesDisplay = document.getElementById("lives");
const game = document.getElementById("game");
let lives = 3;
let isJumping = false;
let catSpeed = 5; // Скорость движения кота
let targetLeft = parseInt(window.getComputedStyle(cat).left); // Целевая позиция кота
let backgroundPosition = 0; // Позиция фона
let isMoving = false; // Флаг, указывающий, движется ли кот

// Инициализация игры
function initGame() {
    lives = 3; // Устанавливаем начальное количество жизней
    livesDisplay.textContent = `Жизни: ${lives}`; // Обновляем отображение жизней
    cat.style.left = "50px"; // Возвращаем кота в начальную позицию
    cat.style.bottom = "0";
    fish.style.right = "0"; // Возвращаем рыбу в начальную позицию
    targetLeft = 50; // Сбрасываем целевую позицию кота
    backgroundPosition = 0; // Сбрасываем позицию фона
    game.style.backgroundPosition = `${backgroundPosition}px 0`; // Сбрасываем фон
}

// Управление котом
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
        moveCat(-10); // Движение влево
        isMoving = true; // Кот движется
    } else if (event.code === "ArrowRight") {
        moveCat(10); // Движение вправо
        isMoving = true; // Кот движется
    } else if (event.code === "Space" && !isJumping) {
        jump(); // Прыжок
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
        isMoving = false; // Кот остановился
    }
});

// Плавное движение кота
function moveCat(step) {
    targetLeft += step; // Обновляем целевую позицию
    if (targetLeft < 0) targetLeft = 0; // Ограничиваем движение влево
    if (targetLeft > 750) targetLeft = 750; // Ограничиваем движение вправо
    smoothMoveCat(); // Запускаем плавное движение
}

// Функция для плавного перемещения кота
function smoothMoveCat() {
    const currentLeft = parseInt(window.getComputedStyle(cat).left);
    if (Math.abs(currentLeft - targetLeft) > 1) { // Если кот не достиг целевой позиции
        const direction = (targetLeft > currentLeft) ? 1 : -1;
        cat.style.left = `${currentLeft + direction * catSpeed}px`;
        requestAnimationFrame(smoothMoveCat); // Продолжаем движение
    }
}

// Движение фона и рыбы
function moveBackgroundAndFish() {
    if (isMoving) { // Если кот движется
        backgroundPosition -= 2; // Двигаем фон влево
        game.style.backgroundPosition = `${backgroundPosition}px 0`;

        const currentRight = parseInt(window.getComputedStyle(fish).right);
        fish.style.right = `${currentRight - 2}px`; // Двигаем рыбу влево
    }
    requestAnimationFrame(moveBackgroundAndFish); // Продолжаем анимацию
}

// Прыжок кота
function jump() {
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpInterval);
            fall();
        } else {
            jumpHeight += 5;
            cat.style.bottom = `${jumpHeight}px`;
        }
    }, 20);
}

// Падение кота
function fall() {
    let fallHeight = 100;
    const fallInterval = setInterval(() => {
        if (fallHeight <= 0) {
            clearInterval(fallInterval);
            isJumping = false;
        } else {
            fallHeight -= 5;
            cat.style.bottom = `${fallHeight}px`;
        }
    }, 20);
}

// Проверка столкновений
setInterval(() => {
    const catRect = cat.getBoundingClientRect();
    const fishRect = fish.getBoundingClientRect();

    if (
        catRect.left < fishRect.right &&
        catRect.right > fishRect.left &&
        catRect.bottom > fishRect.top
    ) {
        loseLife();
    }
}, 100);

// Потеря жизни
function loseLife() {
    lives--;
    livesDisplay.textContent = `Жизни: ${lives}`;
    if (lives === 0) {
        alert("Игра окончена!");
        initGame(); // Перезапуск игры
    }
}

// Инициализация игры при загрузке страницы
initGame();

// Запуск движения фона и рыбы
moveBackgroundAndFish();