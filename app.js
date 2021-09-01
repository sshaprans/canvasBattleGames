// grisha
let whiteGuy = {
    name: "Oleg",
    damage: 3,
    armor: 4,
    strength: 3,
    agility: 3,
    intelligence: 3,
    health: 100,
    type: "agil",
    money: 5,
    imageUlr:"img/white_Hair.png"
};
let blackGuy = {
    name: "Stas",
    damage: 3,
    armor: 4,
    strength: 3,
    agility: 3,
    intelligence: 3,
    health: 100,
    type: "agil",
    money: 5,
    imageUlr:"img/black_Hair.png"
};


let archer = {
    name: "Skilet Archer",
    damage: 10,
    armor: 2,
    strength: 3,
    agility: 1,
    type: "",
    intelligence: 0,
    health: 100,
    money: 10,
    imageUlr:"img/archer_skilet.png"
};
let archer2 = {
    name: "Skilet Archer Strong",
    damage: 25,
    armor: 2,
    strength: 3,
    agility: 1,
    type: "",
    intelligence: 0,
    health: 100,
    money: 10,
    imageUlr:"img/archer_skilet2.png"
};

let heroesArray;
let badGaysArray;
let heroIndex;
let hero;
let badGaySelected;
window.onload = function () {
    function init() {
        heroesArray = [, whiteGuy, blackGuy];
        badGaysArray = [archer, archer2];

        heroIndex = prompt(
            "Выберите героя 1 - Oleg, 2 - Stas"
       ,"1");
        hero = heroesArray[heroIndex];
        document.getElementById("hero").style.backgroundImage = `url(${hero.imageUlr})`;
        balanceHero();
        updateStats();
    }

    function balanceHero() {
        switch (hero.type) {
            case "tank":
                hero.health += (hero.strength / 100) * 1000;
                hero.damage += (hero.strength / 100) * 10;
                hero.damage += hero.intelligence;
                hero.armor += (hero.intelligence / 100) * 1000;
                hero.armor += hero.agility;
                hero.damage += hero.agility;
                break;

            case "mag":
                hero.health += hero.strength;
                hero.damage += hero.strength;
                hero.damage += (hero.intelligence / 100) * 1000;
                hero.armor += (hero.intelligence / 100) * 100;
                hero.armor += hero.agility;
                hero.damage += hero.agility;
                break;

            case "agil":
                hero.health += hero.strength;
                hero.damage += hero.strength;
                hero.damage += hero.intelligence;
                hero.armor += hero.intelligence;
                hero.armor += (hero.agility / 100) * 10;
                hero.damage += (hero.agility / 100) * 1000;
                break;
        }
    }

    function endGame() {
        alert("Потрачено!");
        let reload = confirm("Играть с начала?");
        if (reload) {
            location.reload();
        }
    }

    function updateStats() {
        if (hero.health <= 0) {
            endGame();
        } else {
            document.getElementById("nameHero").innerHTML = "name - " + hero.name;
            document.getElementById("damageHero").innerHTML = "damage - " + hero.damage;
            document.getElementById("armorHero").innerHTML = "armor - " + hero.armor;
            document.getElementById("strengthHero").innerHTML =
                "strength - " + hero.strength;
            document.getElementById("agilityHero").innerHTML =
                "agility - " + hero.agility;
            document.getElementById("intelligenceHero").innerHTML =
                "intelligence - " + hero.intelligence;
            document.getElementById("moneyHero").innerHTML = "money - " + hero.money;
            document.getElementById("healthHero").innerHTML = "health - " + hero.health;

        }
    }

    function updateStatsEnemy(badGaySelected) {
        document.getElementById("enemyStats").style.display = "block";
        document.getElementById("nameEnemy").innerHTML = "name - " + badGaySelected.name;
        document.getElementById("damageEnemy").innerHTML = "damage - " + badGaySelected.damage;
        document.getElementById("armorEnemy").innerHTML = "armor - " + badGaySelected.armor;
        document.getElementById("strengthEnemy").innerHTML =
            "strength - " + badGaySelected.strength;
        document.getElementById("agilityEnemy").innerHTML =
            "agility - " + badGaySelected.agility;
        document.getElementById("intelligenceEnemy").innerHTML =
            "intelligence - " + badGaySelected.intelligence;
        document.getElementById("moneyEnemy").innerHTML = "money - " + badGaySelected.money;
        document.getElementById("healthEnemy").innerHTML = "health - " + badGaySelected.health;
    }

    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function battle() {
        badGaySelected =
            badGaysArray[randomInteger(0, badGaysArray.length - 1)];
        let confirmBadGay = confirm(
            "Вы встретили " +
            badGaysArray[randomInteger(0, badGaysArray.length - 1)].name +
            " Вступить в сражение? Или спастись бегством?"
        );

        if (confirmBadGay) {
            document.getElementById("enemy").style.backgroundImage = `url(${badGaySelected.imageUlr})`;
            document.getElementById("enemy").style.display = "block";
            document.getElementById("hero-attack").style.display = "block";
            document.getElementById("go-battle").style.display = "none";
            updateStatsEnemy(badGaySelected)
        } else {
            hero.health -= badGaySelected.damage;
            updateStats();
        }
    }

    function checkHealth() {
        updateStatsEnemy(badGaySelected);
        updateStats();
        if (hero.health <= 0) {
            endGame();
        } else if (badGaySelected.health <= 0) {
            hero.money += badGaySelected.money;
            document.getElementById("enemy").style.display = "none";
            document.getElementById("hero-attack").style.display = "none";
            document.getElementById("go-battle").style.display = "block";
            document.getElementById("enemyStats").style.display = "none";
            alert(`Вы победили ${badGaySelected.name}`);
            document.getElementById("go-battle").style.display = "block";
            badGaySelected.health = 100;

            return true
        }
    }

    function heroAttack() {
        badGaySelected.health -= hero.damage - badGaySelected.armor;
        animateHeroAttackScript();
        animateHitScript("enemy", "enemyDamage", hero.damage - badGaySelected.armor);
        if(!checkHealth()){
            setTimeout(() => {
                enemyAttack();
            }, 2000);
        }


    }

    function enemyAttack() {
        hero.health -= badGaySelected.damage - hero.armor;
        animateEnemyAttackScript();
        animateHitScript("hero", "heroDamage", badGaySelected.damage - hero.armor);
        checkHealth()
    }

    document.getElementById("hero-attack").onclick = heroAttack;
    document.getElementById("useAttack").onclick = heroAttack;

    document.getElementById("go-battle").onclick = battle;

    init();


    let intervalEnemyAttackAnim;
    let intervalHeroAttackAnim;
    let intervalHitAnim;


    function stopAnimate(item) {
        clearInterval(item);
    }


    function animateEnemyAttackScript() {
        let position = 0;
        const interval = 170;
        const diff = 415;
        // document.getElementById("enemy").style.transform = "translate(100px,-150px)"
        intervalEnemyAttackAnim = setInterval(() => {

            document.getElementById("enemy").style.backgroundPosition = `-${position}px -2505px`;

            if (position < 2000) {
                position = position + diff;
            } else {
                position = 0;
                document.getElementById("enemy").style.backgroundPosition =
                    `-${position}px -2505px`;
                // document.getElementById("enemy").style.transform = "translate(0px,0px)"
                stopAnimate(intervalEnemyAttackAnim)
            }

        }, interval);
    }

    function animateHeroAttackScript() {
        let position = 0;
        const interval = 140;
        const diff = 400;
        document.getElementById("hero").style.transform = "translate(100px,-150px)"
        intervalHeroAttackAnim = setInterval(() => {

            document.getElementById("hero").style.backgroundPosition =
                `-${position}px -3095px`;

            if (position < 2000) {
                position = position + diff;
            } else {
                position = -100;
                document.getElementById("hero").style.backgroundPosition =
                    `-0px -3095px`;
                document.getElementById("hero").style.transform = "translate(0px,0px)"
                stopAnimate(intervalHeroAttackAnim);

            }

        }, interval);
    }

    function animateHitScript(character, damageContainer, damage) {
        let position = 0;
        const interval = 140;
        const diff = 5;
        intervalHitAnim = setInterval(() => {

            document.getElementById(character).style.transform =
                `translate(0px, -${position}px)`;
            document.getElementById(damageContainer).innerHTML = damage;
            document.getElementById(damageContainer).style.display = "block";
            document.getElementById(damageContainer).style.transform =
                `translate(0px, -${position}px)`;


            if (position < 30) {
                position = position + diff;
            } else {
                position = 0;
                document.getElementById(character).style.transform = "translate(0px,0px)"
                document.getElementById(damageContainer).style.transform = "translate(0px,0px)"
                document.getElementById(damageContainer).style.display = "none";
                stopAnimate(intervalHitAnim);
            }

        }, interval);
    }
};