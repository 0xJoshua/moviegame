var user_score = 100;
var gameplayWords = [];


var gameplayWordsGuessed = [];
var letterCounter = 0;
var wordLength = 0;
var user_name = user_name;
var currentWord;

function populateGuessed() {
    for (var i=0; i<gameplayWords.length; i++) {
        gameplayWordsGuessed[i] = false;
    }
}

start_button();
function start_button() {
    $('#startButton').click(function () {
        populateGuessed();
        enter_username();
        create_score();
        enterGame();
        create_gameboard();
    });
}


$('#newGame').click(function () {
    populateGuessed();
    newGame();
    create_gameboard();
    $('.user-score').empty();
});


$(".quit-btn").click(function () {
    enterHighScore();
    $('.guess-holder').empty();
    $('.letters').empty();
    $('.heart').empty();
});

function submission() {
    $('.guess-holder').empty();
    $('.letters').empty();
    $('.hearts-holder').empty();
    letterCounter = 0;
    create_gameboard();
}

function enterGame() {
    $("#game-start").removeClass('shown');
    $("#game").addClass('shown');
}

function enterHighScore() {
    $("#game").removeClass('shown');
    $("#game-over").addClass('shown');
    create_highscore_board();

}

function newGame() {
    $("#game-over").removeClass('shown');
    $("#game").addClass('shown');
    $('.guess-holder').empty();
    $('.letters').empty();
    $('.heart').empty();
    $('.user-score').empty();
    user_score = 100;
}

$((function initialize_game() {
    $.ajax({
        method: 'GET',
        url: '/gameplaywords',
        dataType: "json",
        success: function (data) {
            gameplayWords = [];
            data.forEach(function (v, i) {
                gameplayWords.push(v[0]);
            });
        }
    });
})());

function create_score(user_score) {
    user_score = 100;
    $('.user-score').text('Score: ' + user_score);
}

function create_hearts(length_of_word) {
    var lives = (length_of_word / 4);
    var hearts_holder = $('.hearts-holder');
    for (var j = 0; j < lives; j++) {
        var heart = $('<img/>', {class: "heart", src: "./images/heart.png"});
        hearts_holder.append(heart);
    }
}

function remove_heart() {
    var list_of_hearts = $('.heart');

    if (list_of_hearts.length <= 1) {
        alert("You are out of lives, game over");
        enterHighScore();
    }
    else {
        list_of_hearts[0].remove();
    }
}

function increase_score() {
    user_score += 10;
}

function decrease_score() {
    user_score -= 10;
}

function shuffle_letters(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function length_of_word(scrambled_gameplay_word) {
    wordLength = scrambled_gameplay_word.length;
    return wordLength;
}


function scramble_word(word) {

    var scrambled_gameplay_word = shuffle_letters(word.split("")).join("");
    return scrambled_gameplay_word;
}
function addUser() {
    user_name = $('#name').val();
    console.log("Welcome to the movie game "+user_name+". There are no answers in this console, sorry! Enjoy!");

    $('#dialog-form').dialog('close');
}

function enter_username() {
    var $diag = $('#dialog-form');
    $diag.dialog({
        autoOpen: false,
        height: 180,
        width: 350,
        modal: true,
        buttons: {
            "Save your username": addUser
        },
        closeOnEscape: false,
        open: function (event, ui) {
            $(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
        }
    });
    $diag.dialog('open');
}

function create_gameboard() {
    var random_word = pick_random_word();
    var scrambledWord = scramble_word(random_word);
    wordLength = length_of_word(scrambledWord);
    create_hearts(wordLength);
    var holder = $('.guess-holder');
    var letters = $('.letters');

    for (var i = 0; i < wordLength; i++) {
        var placeholder = $('<div/>', {
            id: "holder" + [i],
            class: "letter placeholder",
            data: {"letter": random_word[i]}
        });
        var letter = $('<div/>', {
            class: "letter shadowed",
            "text": scrambledWord[i],
            data: {"letter": scrambledWord[i]}
        });

        placeholder.droppable({
            drop: droppable_handler
        });
        letter.draggable({
            snap: '.placeholder',
            revert: true
        });
        letters.append(letter);
        holder.append(placeholder);

    }
}

function pick_random_word() {
    var alltrue = true;
    gameplayWordsGuessed.forEach(function (val) {
        if (alltrue) alltrue = val;
    });
    if (!alltrue) {
        var newWord;
        do {
            newWord = Math.round(Math.random() * (gameplayWords.length - 1));
        } while (gameplayWordsGuessed[newWord]);
        currentWord = newWord;
        var random_word_from_list = gameplayWords[newWord];
        return random_word_from_list;
    } else {
        console.log("You have solved all of the puzzles - congratulations!");
        enterHighScore();
    }
}


function droppable_handler(event, ui) {

    var placeholder_letter = $(this).data("letter");
    var dragged_letter = ui.draggable.data("letter");

    if (placeholder_letter === dragged_letter) {
        ui.draggable.css({"background-color": "green"});
        increase_score();
        letterCounter++;
        $('span.user-score').text("Score:" + user_score);
        ui.draggable.draggable({
            revert: 'false'
        });
        ui.draggable.offset($(this).offset());
        if (letterCounter === wordLength) {
            gameplayWordsGuessed[currentWord] = true;
            submission();
        }
    }

    else if (placeholder_letter !== dragged_letter) {
        ui.draggable.css({"background-color": "red"});
        decrease_score();
        remove_heart();
        $('span.user-score').text("Score:" + user_score);
    }
    $('.user-score').text('Score: ' + user_score);
}

function create_highscore_board() {
    var highScores = [];
    var $container = $('#game-over .gamebox-header');
    var breaks = $('<br>');
    var list_of_scores = $container.find('ol');
    list_of_scores.empty();
    $.ajax({
        method: 'POST',
        url: '/leaderboard',
        dataType: "json",
        data: {score: parseInt(user_score), username: user_name},
        success: function (data) {
            highScores = data;
            var length = Math.min(5, highScores.length);
            //var length = data.length > 5 ? 5 : data.length;
            for (var i = 0; i < length; i++) {
                var $highScore = $('<li/>', {
                        "text": highScores[i][0] + " " + highScores[i][1]
                    }
                );
                list_of_scores.append($highScore);
            }
        }
    });
    $container.append(breaks);
    $container.append(list_of_scores);
}