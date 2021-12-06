let u = 0;
let crash = 0;
let inte, cd;
let nextGameDate;
let current_elapsed = 0;
let tick_client = 10;
let interval;

let c = new Chart("graph-chart", {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      borderColor: "white",
      borderWidth : 2,
      data: [],
      fill: false
    }]
  },
  options: {
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            display: false
        }],
        yAxes: [{
            ticks: {
                max : 2,    
                min : 1,
                userCallback: function(label) {
                    if (Math.floor(label) === label) {
                        return label;
                    }
                },
            },
            gridLines: {
                color: "rgba(0, 0, 0, 0)",
            }
        }]
    },
    elements: {
        point:{
            radius: 0
        }
    }
  }
});

// USED FUNCTION
function growthFunction (elapsed) {
    return Math.floor(100 * Math.pow(Math.E, 0.00006 * elapsed)) / 100;
}

// LINKED WITH game_starting
function countdown () {
    let timeNow = new Date();
    nextGameDate = timeNow.setSeconds(timeNow.getSeconds() + 5);
    cd = setInterval(makecountdown, 100, nextGameDate);

    document.getElementById('next-game-text').style.display = 'block';
    document.getElementById('bust-text').style.display = 'none';
    document.getElementById('betting-section-button').innerHTML = 'Place Bet';
    document.getElementById('betting-section-button').style.backgroundColor = '#86e080';
}
// USED FUNCTION
function makecountdown (nextGameDate) {
    let timeNow = new Date();
    let timeleft = nextGameDate - timeNow;

    if (timeleft <= 0) {
        clearInterval(cd);
        document.getElementById('next-game-text').style.display = 'none';
    } else {
        document.getElementById('next-game-text').innerHTML = 'Next game in ' + (timeleft / 1000).toFixed(2) + ' s';
    }
}

// LINKED WITH game_crash
function gameCrashed (crash) {
    let tp = document.getElementById('table-players');
    for (var i = 0, row; row = tp.rows[i]; i++) {
        row.style.color = '#ff6962';
    }

    document.getElementById('bust-text').innerHTML = 'Busted<br> @ x ' + crash;
    document.getElementById('bust-text').style.display = 'block';
    document.getElementById('multi').style.display = 'none';
    document.getElementById('betting-section-button').innerHTML = 'Place Bet';
    document.getElementById('betting-section-button').style.backgroundColor = '#cdd9cc';
}

// LINKED WITH game_started
function createRound (crash) {

    let chatbox = document.getElementById('chatbox-list-messages');
    let now = new Date();
    now = now.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    chatbox.innerHTML += "<div class='chatbox-message'><span class='chatbox-message-date'>" + now + " </span><span class='chatbox-message-author message-system'>System Info</span><span> : </span><span class='chatbox-message-message message-system'>Next crash value is " + crash + "</span></div>";
    chatbox.scrollTop = chatbox.scrollHeight;
    
    c.data.labels = [];
    c.data.datasets[0].data = [];
    c.options.scales.yAxes[0].ticks.max = 2;
    c.update();

    document.getElementById('betting-section-button').innerHTML = 'Cashout';
    document.getElementById('betting-section-button').style.backgroundColor = '#ff6962';
    document.getElementById('bust-text').style.display = 'none';
    document.getElementById('multi').style.display = 'block';
    let tp = document.getElementById('table-players');
    for (var i = 0, row; row = tp.rows[i]; i++) {
        row.style.color = '#EDEDED';
    }
}

// LINKED WITH game_tick
function updateOnTick () {
    let e = growthFunction(current_elapsed);
    document.getElementById('number').innerHTML = e.toFixed(2);

    current_elapsed += tick_client;

    updateChart(e);
    updateCashOut(e);
}

function updateCashOut (n) {
    document.getElementById('number').innerHTML = n.toFixed(2);
    if (document.getElementById('betting-section-bet-input').value) {
        document.getElementById('betting-section-button').innerHTML = 'Cashout (+ ' + (n * parseFloat(document.getElementById('betting-section-bet-input').value)).toFixed(2) + ')';
    }
}
function updateChart (e) {
    if (e > 2) {
        c.options.scales.yAxes[0].ticks.max = e;
    }
    c.data.labels.push(Math.round(10/100));
    c.data.datasets[0].data.push(e);
    c.update();
}

// UNUSED FUNCTION
function update () {
    var r = 0.001;
    n =  Math.floor(100 * Math.pow(Math.E, r * u)) / 100;

    if (crash <= n) {
        let tp = document.getElementById('table-players');
        for (var i = 0, row; row = tp.rows[i]; i++) {
            row.style.color = '#ff6962';
        }

        document.getElementById('bust-text').innerHTML = 'Busted<br> @ x ' + n.toFixed(2);
        document.getElementById('bust-text').style.display = 'block';
        document.getElementById('multi').style.display = 'none';
        
        clearInterval(inte);

        setTimeout(countdown, 3000);
        
        u = 0;
    }

    u++;
    updateChart(u, n);
}


function showLoginRegister (e) {
    document.getElementById('login-register').style.display = 'flex';

    if (e.getAttribute('action') == 'login') {
        $('#container-login').show();
    } else if (e.getAttribute('action') == 'register') {
        $('#container-register').show();
    } 
}
function closeLoginRegister () {
    document.getElementById('login-register').style.display = 'none';
    $('#container-login').hide();
    $('#container-register').hide();
}

function isLogged () {
    return Cookies.get('token') != null;
}

function changeMenuIfLogged (logged) {
    if (logged) {
        $('#menu-notlogged').hide();
        $('#menu-logged').show();
        $('#menu-pseudo').text(Cookies.get('pseudo'));
    } else {
        $('#menu-notlogged').show();
        $('#menu-logged').hide();
    }
}

function disconnect () {
    Cookies.remove('token');
    Cookies.remove('pseudo');
    Cookies.remove('email');
    location.reload();
}