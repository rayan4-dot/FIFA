document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-player-form');
    const bench = document.querySelector('.bench-grid');
    const formationGrid = document.querySelector('.formation-grid');
    const playerPositionSelect = document.getElementById('player-position');

    // load players from local storage
    let dataCollect = JSON.parse(localStorage.getItem('players')) || [];
    let currentPlayerIndex = null;

    // function to update the bench UI
    function  miseDekka() {
        bench.innerHTML = ''; 
        dataCollect.forEach(function (player, index) {
            bench.innerHTML += `
            <div class="card-container" style="position:relative; width: 248px; height: 341px;" data-index="${index}" draggable="true">
                <img src="img/badge_gold.webp" style="width: 100%; height: 100%; object-fit: cover;" alt="Player Badge">
                <div style="position:absolute; top:33%; left:19%; display:flex; flex-direction:column; gap:10px; height:150px;">
                    <img src="${player.playerImageUrl}" id="playerPhoto" style="width:158px; position:absolute; bottom:46px; left:1px;">
                    <div class="numdiv" style="color:black; position:absolute; bottom:98%; left:10px;">
                        <div class="playercard-25-rating" style="font-size: 21px; font-weight: 800;">${player.rating}</div>
                        <div class="playercard-25-position" style="font-size: 10px; font-weight: 800;">${player.position}</div>
                    </div>
                    <div class="playerNme" style="color:black; position:absolute; bottom:14%; left:57px; display:flex; align-items:center; justify-content:center; white-space:nowrap;">
                        <p style="font-size:15px; font-weight:800; margin:3px;margin-right: 44%;" class="player-Name" id="playerName">${player.name}</p>
                    </div>
                    <div class="playerDetails" style="display:flex; gap:1.0rem; font-size:9px; position:absolute; bottom:-3%; left:-14px; color:black;">
                        <div class="prop1"><div class="ca">PAC</div><div class="ca">${player.pace}</div></div>
                        <div class="prop1"><div class="ca">SHO</div><div class="ca">${player.shooting}</div></div>
                        <div class="prop1"><div class="ca">PAS</div><div class="ca">${player.passing}</div></div>
                        <div class="prop1"><div class="ca">DRI</div><div class="ca">${player.dribbling}</div></div>
                        <div class="prop1"><div class="ca">DEF</div><div class="ca">${player.defending}</div></div>
                        <div class="prop1"><div class="ca">PHY</div><div class="ca">${player.physical}</div></div>
                    </div>
                    <div class="CountryAndTeam" style="display:flex; position:absolute; justify-content:center;">
                        <div class="nationality"><img src="${player.flagUrl}" class="flag-img" style="width:21px; top:166px; left:39px; position:absolute;"></div>
                        <div class="club"><img src="${player.clubLogoUrl}" class="club-logo-img" style="width:24px; top:161px; left:91px; position:absolute;"></div>
                    </div>
                </div>
                <button class="remove-button" style="position:absolute; bottom:5%; left:10%; background-color:red; color:white;">Remove</button>
                <button class="update-button" style="position:absolute; bottom:5%; left:60%; background-color:blue; color:white;">Update</button>
            </div>`;
        });
    }

    // initial update of the bench
     miseDekka();

//submit
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const position = playerPositionSelect.value;
        const name = document.getElementById('player-name').value.trim();
        const rating = document.getElementById('player-rating').value.trim();
        const pace = document.querySelector('[name="pacing"]').value.trim();
        const shooting = document.querySelector('[name="shooting"]').value.trim();
        const passing = document.querySelector('[name="passing"]').value.trim();
        const dribbling = document.querySelector('[name="dribbling"]').value.trim();
        const defending = document.querySelector('[name="defending"]').value.trim();
        const physical = document.querySelector('[name="physical"]').value.trim();
        const clubLogoUrl = document.getElementById('player-logo').value.trim();
        const flagUrl = document.getElementById('player-flag').value.trim();
        const playerImageUrl = document.getElementById('player-photo').value.trim();

        // validation
        if (!name) {
            alert("Player name is required.");
            return;
        }
        if (!rating) {
            alert("Player rating is required.");
            return;
        }

        // create the new player object
        const newPlayer = {
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

        // check if we're updating an existing player
        if (currentPlayerIndex !== null) {
            dataCollect[currentPlayerIndex] = newPlayer; // update existing player with new data
            currentPlayerIndex = null; // reset index after updating
        } else {
            dataCollect.push(newPlayer); // add new player
        }

        // Update local storage
        localStorage.setItem('players', JSON.stringify(dataCollect));

        // update bench and reset the form
         miseDekka();
        form.reset(); // reset the form inputs
    });

    // dragging from bench to formation
    bench.addEventListener('dragstart', function (event) {
        const cardContainer = event.target.closest('.card-container');
        if (cardContainer) {
            const index = cardContainer.dataset.index;
            event.dataTransfer.setData('text/plain', index);
        }
    });

    formationGrid.addEventListener('dragover', function (event) {
        event.preventDefault(); // Allow dropping
    });

    // handle the drop event
    formationGrid.addEventListener('drop', function (event) {
        event.preventDefault();
        const index = event.dataTransfer.getData('text/plain');
        const player = dataCollect[index];
        const targetCard = event.target.closest('.player-card');

        // validate position before dropping
        if (targetCard && player.position === targetCard.dataset.position) {
            // place player in their valid position
            targetCard.innerHTML = `<div class="card-container" style="position:relative; width: 248px; height: 341px;" data-index="${index}" draggable="true">
            <img src="img/badge_gold.webp" style="width: 100%; height: 100%; object-fit: cover;" alt="Player Badge">
            <div style="position:absolute; top:33%; left:19%; display:flex; flex-direction:column; gap:10px; height:150px;">
                <img src="${player.playerImageUrl}" id="playerPhoto" style="width:158px; position:absolute; bottom:46px; left:1px;" alt="Player Photo">
                <div class="numdiv" style="color:black; position:absolute; bottom:98%; left:10px;">
                    <div class="playercard-25-rating" style="font-size: 21px; font-weight: 800;">${player.rating}</div>
                    <div class="playercard-25-position" style="font-size: 10px; font-weight: 800;">${player.position}</div>
                </div>
                <div class="playerNme" style="color:black; position:absolute; bottom:14%; left:57px; display:flex; align-items:center; justify-content:center; white-space:nowrap;">
                    <p style="font-size:15px; font-weight:800; margin:3px; margin-right: 44%;" class="player-Name" id="playerName">${player.name}</p>
                </div>
                <div class="playerDetails" style="display:flex; gap:1.0rem; font-size:9px; position:absolute; bottom:-3%; left:-14px; color:black;">
                    <div class="prop1"><div class="ca">PAC</div><div class="ca">${player.pace}</div></div>
                    <div class="prop1"><div class="ca">SHO</div><div class="ca">${player.shooting}</div></div>
                    <div class="prop1"><div class="ca">PAS</div><div class="ca">${player.passing}</div></div>
                    <div class="prop1"><div class="ca">DRI</div><div class="ca">${player.dribbling}</div></div>
                    <div class="prop1"><div class="ca">DEF</div><div class="ca">${player.defending}</div></div>
                    <div class="prop1"><div class="ca">PHY</div><div class="ca">${player.physical}</div></div>
                </div>
                <div class="CountryAndTeam" style="display:flex; position:absolute; justify-content:center;">
                    <div class="nationality"><img src="${player.flagUrl}" class="flag-img" style="width:21px; top:166px; left:39px; position:absolute;" alt="Flag"></div>
                    <div class="club"><img src="${player.clubLogoUrl}" class="club-logo-img" style="width:24px; top:161px; left:91px; position:absolute;" alt="Club Logo"></div>
                </div>
            </div>
            <button class="remove-button" style="position:absolute; bottom:5%; left:10%; background-color:red; color:white;">Remove</button>
            <button class="update-button" style="position:absolute; bottom:5%; left:60%; background-color:blue; color:white;">Update</button>
        </div>
        `
        
            dataCollect.splice(index, 1); // remove player from the bench
            localStorage.setItem('players', JSON.stringify(dataCollect)); // update local storage
             miseDekka(); // refresh bench display
        } else {
            alert('Invalid Position: drop the player in their designated position.');
        }
    });

    // click event to remove player from formation
    formationGrid.addEventListener('click', function (event) {
        const targetCard = event.target.closest('.player-card');
        if (targetCard) {
            const position = targetCard.dataset.position;
            const playerName = targetCard.querySelector('.player-name').textContent;

            // Find index of the player based on position and name for restoration
            const playerDataIndex = dataCollect.findIndex(player =>
                
                player.position === position && player.name === playerName);

            if (playerDataIndex >= 0) {
                const playerToReturn = dataCollect[playerDataIndex];

                // add the player back to the bench with existing data
                dataCollect.push(playerToReturn);
                localStorage.setItem('players', JSON.stringify(dataCollect)); // update local storage
                 miseDekka(); // refr the bench display

                // clear the target card in the formation
                targetCard.innerHTML = `
                    <img src="img/badge_gold.webp" alt="Player Card" class="card-background">
                    <div class="gk">
                        <div class="player-position">${position}</div>
                        <div class="player-name"></div>
                    </div>
                `;
            }
        }
    });

    
    // bench actions for remove and update buttons
    bench.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.closest('.card-container').dataset.index; // get the index
            dataCollect.splice(index, 1); // rem the player from the array
            localStorage.setItem('players', JSON.stringify(dataCollect)); // upd local storage
             miseDekka(); // refr the bench display
        }

        //update button

        if (event.target.classList.contains('update-button')) {
            currentPlayerIndex = event.target.closest('.card-container').dataset.index; //find which player was clicked
            const player = dataCollect[currentPlayerIndex]; // get his existing player data except the name unfortunately

            // populate the form with player data for editing
            document.getElementById('player-name').value = player.name;
            document.getElementById('player-rating').value = player.rating;
            document.querySelector('[name="pacing"]').value = player.pace;
            document.querySelector('[name="shooting"]').value = player.shooting;
            document.querySelector('[name="passing"]').value = player.passing;
            document.querySelector('[name="dribbling"]').value = player.dribbling;
            document.querySelector('[name="defending"]').value = player.defending;
            document.querySelector('[name="physical"]').value = player.physical;
            document.getElementById('player-logo').value = player.clubLogoUrl;
            document.getElementById('player-flag').value = player.flagUrl;
            document.getElementById('player-photo').value = player.playerImageUrl;
            playerPositionSelect.value = player.position; // set the position select
        }
    });
});