document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-player-form');
    const bench = document.querySelector('.bench-grid');
    const playerPositionSelect = document.getElementById('player-position');
    const dataCollect = [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const position = playerPositionSelect.value;
        const name = document.getElementById('player-name').value;
        const rating = document.getElementById('player-rating').value;
        const pace = document.querySelector('[name="pacing"]').value;
        const shooting = document.querySelector('[name="shooting"]').value;
        const passing = document.querySelector('[name="passing"]').value;
        const dribbling = document.querySelector('[name="dribbling"]').value;
        const defending = document.querySelector('[name="defending"]').value;
        const physical = document.querySelector('[name="physical"]').value;
        const clubLogoUrl = document.getElementById('player-logo').value; 
        const flagUrl = document.getElementById('player-flag').value; 
        const playerImageUrl = document.getElementById('player-photo').value; 
        const benchPlayers = {
            position,
            name,
            rating,
            pace,
            shooting,
            passing,
            dribbling,
            defending,
            physical,
            clubLogoUrl,
            flagUrl,
            playerImageUrl,
        };

        dataCollect.push(benchPlayers);
        bench.innerHTML = '';

        dataCollect.forEach(function(c) {
            bench.innerHTML += `
            <div class="player-card" data-position="${c.position}">
                <img src="${c.playerImageUrl}" alt="${c.name} Card" class="card-background">
                <div class="gk">
                    <div class="player-position">${c.position}</div>
                    <div class="player-name">${c.name}</div>
                    <div class="player-rating">${c.rating}</div>
                    <div class="player-stats">
                        Pace: ${c.pace}, Shooting: ${c.shooting}, Passing: ${c.passing}, 
                        Dribbling: ${c.dribbling}, Defending: ${c.defending}, 
                        Physical: ${c.physical}
                    </div>
                </div>
                <div class="club-info">
                    <img src="${c.clubLogoUrl}" alt="${c.name}'s Club Logo" class="club-logo" />
                    <img src="${c.flagUrl}" alt="${c.name}'s Country Flag" class="country-flag" />
                </div>
            </div>`;
        });

        console.log(dataCollect);
        form.reset();
    });
});

    function addPlayerToFormation(playerCard, position) {
        const benchPlayer = getBenchPlayer(position);
        if (benchPlayer) {
            
            if (playerArea.querySelector('.player-card')) {
                alert("bench full already.");
                return;
            }
            playerArea.appendChild(playerCard);
        } else {
            alert("Invalid position selected.  select a position from the Area Above.");
        }
    }

    function getPlayerArea(position) {
        const areas = {
            'GK1': bench.querySelector('[data-position="GK1"]'),
            'GK2': bench.querySelector('[data-position="GK2"]'),
            'CB2': bench.querySelectorAll('[data-position="CB"]'),
            'LB': bench.querySelector('[data-position="LB"]'),
            'RB': bench.querySelector('[data-position="RB"]'),
            'CM1': bench.querySelectorAll('[data-position="CM1"]'),
            'CM2': bench.querySelectorAll('[data-position="CM2"]'),
            'DM': bench.querySelector('[data-position="DM"]'),
            'LW1': bench.querySelector('[data-position="LW1"]'),
            'RW1': bench.querySelector('[data-position="RW1"]'),
            'ST': bench.querySelector('[data-position="ST"]'),
        };
        return areas[position];
    }
    
