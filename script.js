* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial;
    background-color: #ffffff;
    overflow: center;
}

#game {
    position: relative;
    width: 800px;
    height: 400px;
    margin: 50px auto;
    background-color: #f0f0f0;
    border: 2px solid #000;
    overflow: hidden;
    background-image: url('https://unecon.ru/wp-content/uploads/2023/05/3-3.jpg'); /* Добавь изображение фона */
    background-repeat: repeat-x; /* Фон повторяется по горизонтали */
    background-position: 0 0;
}

#cat {
    position: absolute;
    bottom: 0;
    left: 50px;
    width: 50px;
    height: 50px;
    background-color: orange;
    border-radius: 50%;
    transition: left 0 s ease; /* Плавное движение по горизонтали */
}

#fish {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 30px;
    background-color: lightblue;
}

#lives {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: #000;
}
