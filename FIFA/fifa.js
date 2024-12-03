document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-player-form');
    const bench = document.querySelector('.bench-grid');
    const formationGrid = document.querySelector('.formation-grid');
    const playerPositionSelect = document.getElementById('player-position');

    // Load players from local storage
    let dataCollect = JSON.parse(localStorage.getItem('players')) || [];
    let currentPlayerIndex = null;

    // Function to get background image based on player rating
    function getPlayerCardBackground(rating) {
        rating = parseFloat(rating); // Convert rating to a number
        if (rating < 50) {
            return 'url("")'; // Placeholder for low ratings
        } else if (rating < 70) {
            return 'url("FIFA/img/ba")'; // Image for < 70
        } else if (rating < 80) {
            return 'url("FIFA/img/badge_ballon_dor.webp")'; // Image for < 80
        } else {
            return 'url("FIFA/img/badge_total_rush.webp")'; // Image for >= 80
        }
    }

    // Function to render player cards in the bench
    function miseDekka() {
        bench.innerHTML = ''; 
        dataCollect.forEach(function (player, index) {
            const backgroundImage = getPlayerCardBackground(player.rating);
            bench.innerHTML += `
            <div class="card-container" style="position:relative; width: 248px; height: 341px; background-image: ${backgroundImage};" data-index="${index}" draggable="true">
                <img src="img/badge_gold.webp" style="width: 100%; height: 100%; object-fit: cover;" alt="Player Badge">
                <div style="position:absolute; top:33%; left:19%; display:flex; flex-direction:column; gap:10px; height:150px;">
                    <img src="${player.playerImageUrl}" id="playerPhoto" style="width:158px; position:absolute; bottom:46px; left:1px;" alt="Player Photo">
                    <div class="numdiv" style="color:black;position:absolute;bottom: 94%;left: -4px;">
                        <div class="playercard-25-rating" style="font-size: 16px;font-weight: 800;">${player.rating}</div>
                        <div class="playercard-25-position" style="font-size: 12px;font-weight: 800;">${player.position}</div>
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

    // Initial rendering of the bench
    miseDekka();

    // Event listener for clicking on the formation to remove players
    formationGrid.addEventListener('click', function (event) {
        const targetCard = event.target.closest('.player-card');
        
        if (targetCard) {
            const index = targetCard.dataset.index; // Get the index of the clicked card
            
            if (index !== undefined) {
                const playerIndex = parseInt(index); // Retrieve the player index
                const player = dataCollect[playerIndex]; // Get the player data
                
                // Remove the player from the formation grid
                targetCard.parentNode.removeChild(targetCard);
                
                // Add the player back to the dataCollect (bench)
                dataCollect.push(player); 
                
                // Update local storage
                localStorage.setItem('players', JSON.stringify(dataCollect));
                
                // Re-render the bench with updated dataCollect
                miseDekka(); 
            }
        }
    });

    // Submit form event listener
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

        // Validation
        if (!name) {
            alert("Player name is required.");
            return;
        }
        if (!rating) {
            alert("Player rating is required.");
            return;
        }

        // Create new player object
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

        // Check if we're updating an existing player
        if (currentPlayerIndex !== null) {
            dataCollect[currentPlayerIndex] = newPlayer; // Update existing player
            currentPlayerIndex = null; // Reset index after updating
        } else {
            dataCollect.push(newPlayer); // Add new player
        }

        // Update local storage
        localStorage.setItem('players', JSON.stringify(dataCollect));

        // Update bench and reset the form
        miseDekka();
        form.reset(); // Reset form inputs
    });

    // Dragging from bench to formation
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

    // Handle the drop event
    formationGrid.addEventListener('drop', function (event) {
        event.preventDefault();
        const index = event.dataTransfer.getData('text/plain');
        const player = dataCollect[index];
        const targetCard = event.target.closest('.player-card');

        // Validate position before dropping
        if (targetCard && player.position === targetCard.dataset.position) {
            targetCard.innerHTML = `<div class="card-container" style="position:relative;" data-index="${index}" draggable="true">
                <img src="img/badge_gold.webp" style="width: 100%; height: 100%; object-fit: cover;" alt="Player Badge">
                <div class="PlayerImage">
                    <img style="width: 76%;object-fit: cover;left: 14%;position: absolute;bottom: 36%;" src="${player.playerImageUrl}" id="playerPhoto" alt="Player Photo">
                </div>
                <div style="position:absolute; top:33%; left:19%; display:flex; flex-direction:column; gap:10px; height:150px;">
                    <div class="numdiv" style="color:black; position:absolute;top:-14px;left:-2px;">
                        <div class="playercard-25-rating" style="font-size: 9px; font-weight: 800;">${player.rating}</div>
                        <div class="playercard-25-position" style="font-size: 6px; font-weight: 800;">${player.position}</div>
                    </div>
                    <div class="playerNme" style="color:black; display:flex; align-items:center; justify-content:center; white-space:nowrap;">
                        <p style="font-size: 8px; font-weight: bold; margin: 40px; margin-right: 77%;" class="player-Name" id="playerName">${player.name}</p>
                    </div>
                    <div class="playerDetails" style="display:flex; gap: 0.2rem; font-size: 5px; position: absolute; color: black; bottom: 59%; left: -8%;">
                        <div class="prop1"><div class="ca">PAC</div><div class="ca">${player.pace}</div></div>
                        <div class="prop1"><div class="ca">SHO</div><div class="ca">${player.shooting}</div></div>
                        <div class="prop1"><div class="ca">PAS</div><div class="ca">${player.passing}</div></div>
                        <div class="prop1"><div class="ca">DRI</div><div class="ca">${player.dribbling}</div></div>
                        <div class="prop1"><div class="ca">DEF</div><div class="ca">${player.defending}</div></div>
                        <div class="prop1"><div class="ca">PHY</div><div class="ca">${player.physical}</div></div>
                    </div>
                    <div class="CountryAndTeam" style="display:flex;position:absolute;justify-content:center;">
                        <div class="nationality"><img src="${player.flagUrl}" class="flag-img" style="width: 9px;" alt="Flag"></div>
                        <div class="club"><img src="${player.clubLogoUrl}" class="club-logo-img" style="width:9px;" alt="Club Logo"></div>
                    </div>
                </div>
            </div>`;
            targetCard.setAttribute('data-index', index);
            dataCollect.splice(index, 1); // Remove player from the bench
            localStorage.setItem('players', JSON.stringify(dataCollect)); // Update local storage
            miseDekka(); // Refresh bench display
        } else {
            alert('Invalid Position: drop the player in their designated position.');
        }
    });

    // Bench actions for remove and update buttons
    bench.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.closest('.card-container').dataset.index; // Get the index
            dataCollect.splice(index, 1); // Remove the player from the array
            localStorage.setItem('players', JSON.stringify(dataCollect)); // Update local storage
            miseDekka(); // Refresh the bench display
        }

        // Update button
        if (event.target.classList.contains('update-button')) {
            currentPlayerIndex = event.target.closest('.card-container').dataset.index; // Find player for update
            const player = dataCollect[currentPlayerIndex]; // Get player data

            // Populate the form with player data for editing
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
            playerPositionSelect.value = player.position; // Set position select
        }
    });
});
