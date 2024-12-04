document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-player-form');
    const bench = document.querySelector('.bench-grid');
    const formationGrid = document.querySelector('.formation-grid');
    const playerPositionSelect = document.getElementById('player-position');

    // if it returns null, the || [] part ensures that dataCollect is initialized as an empty array which prevents errors later
    let dataCollect = JSON.parse(localStorage.getItem('players')) || [];
    //to keep track of the index of a player in the dataCollect array that is currently being edited or updated
    let currentPlayerIndex = null; //null, aucun joueur séléctioné actuellemnt

    let backgroundCard;

    // Function to update the bench UI
    function miseDekka() {
        bench.innerHTML = ''; 
        dataCollect.forEach(function (player, index) { //index the player in array, 
            //player is iteration over each player and perform operations on each player object within the function body

            if (player.rating < 50) {
                backgroundCard = 'img/silver.png';
            } else if (player.rating >= 50 && player.rating < 70) {
                backgroundCard = 'img/badge_gold.webp';
            } else if (player.rating >= 70 && player.rating < 80) {
                backgroundCard = 'img/badge_ballon_dor.webp';
            } else {
                backgroundCard = 'img/badge_total_rush.webp';
            }

            bench.innerHTML += `
            <div class="card-container" style="position:relative; width: 248px; height: 341px;" data-index="${index}" draggable="true">
                <img src="${backgroundCard}" style="width: 100%; height: 100%; object-fit: cover;" alt="Player Badge">
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

    // Initial update of the bench
    miseDekka();

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

        // Create the new player object
        const newPlayer = {
            id: Date.now().toString(),
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

        // check if we're adding an existing player
        if (currentPlayerIndex !== null) { //so there's a player that exists already, should be updated 
            dataCollect[currentPlayerIndex] = newPlayer; // update existing player with new data
            currentPlayerIndex = null; // reset index to null, which means it was updated successfully
        } else {
            dataCollect.push(newPlayer); // add new player
        }

        // Update local storage
        localStorage.setItem('players', JSON.stringify(dataCollect));

        // update bench and reset the form
        miseDekka();
        form.reset(); // reset the form inputs

        // dragPlayer()
    });




    
    const playerButtonReset = document.querySelectorAll(".player-card");
    playerButtonReset.forEach((card) => {
        card.addEventListener('click', function (e) {
                const cardContainerDiv = document.querySelector(".card-container");
                // get the clicked element
                let target = e.target;
                // find the closest card-container
                let cardContainer = target.closest(".player-card");
        
                // check if the cardContainer exists
                if (cardContainer) {
                    // remove it from its current parent
                    cardContainer.removeChild(cardContainerDiv); //!!!!!!!!
                    cardContainer.innerHTML = `
                    <img src="img/badge_gold.webp" alt="Player Card" class="card-background">
                    `
                    // append it to the bench
                    const newDiv = document.createElement('div');
                    newDiv.className = 'player-card';
                    newDiv.innerHTML = cardContainerDiv.innerHTML;

                    bench.appendChild(newDiv);
                } 
                }
);
        });

    // }
    // dragging from bench to formation
    bench.addEventListener('dragstart', function (event) {
        const cardContainer = event.target.closest('.card-container');
        //if the card is dragged, its info should be dragged as well
        if (cardContainer) {
            const index = cardContainer.dataset.index;
            event.dataTransfer.setData('text/plain', index); //the index of the card being dragged
        }
    });

    formationGrid.addEventListener('dragover', function (event) {
        event.preventDefault(); // allow dropping
    });

    // Handle the drop event
    formationGrid.addEventListener('drop', function (event) {
        event.preventDefault();
        const index = event.dataTransfer.getData('text/plain');
        const player = dataCollect[index];
        const targetCard = event.target.closest('.player-card');
        
        // Validate position before dropping
        if (targetCard && player.position === targetCard.dataset.position) {
            targetCard.innerHTML = `<div class="card-container" style="position:relative;"" data-index="${index}" draggable="true" >
            <img src="img/badge_gold.webp" style="width: 100%; height: 100%; object-fit: cover;" alt="Player Badge">
            <div class="PlayerImage">
                <img style="width: 76%;object-fit: cover;left: 14%;position: absolute;bottom: 36%;" src="${player.playerImageUrl}" id="playerPhoto" style="width:158px; position:absolute; bottom:46px; left:1px;" alt="Player Photo">
            </div>
            <div style="position:absolute; top:33%; left:19%; display:flex; flex-direction:column; gap:10px; height:150px;">
                
                <div class="numdiv" style="color:black; position:absolute;top:-14px;left:-2px;">
                    
                    <div class="playercard-25-rating" style="font-size: 9px; font-weight: 800;">${player.rating}</div>
                    <div class="playercard-25-position" style="font-size: 6px; font-weight: 800;">${player.position}</div>
                </div>
            
            
                <div class="playerNme" style="color:black; bottom:14%; display:flex; align-items:center; justify-content:center; white-space:nowrap;">
                    <p style="font-size: 8px; font-weight: bold; margin: 40px; margin-right: 77%;" class="player-Name" id="playerName">${player.name}</p>
                </div>
            
            
                <div class="playerDetails" style="display:flex; gap: 0.2rem; font-size: 5px; position: absolute; color: black; bottom: 59%; left: -8%; color:black;">
                    <div class="prop1"><div class="ca">PAC</div><div class="ca">${player.pace}</div></div>
                    <div class="prop1"><div class="ca">SHO</div><div class="ca">${player.shooting}</div></div>
                    <div class="prop1"><div class="ca">PAS</div><div class="ca">${player.passing}</div></div>
                    <div class="prop1"><div class="ca">DRI</div><div class="ca">${player.dribbling}</div></div>
                    <div class="prop1"><div class="ca">DEF</div><div class="ca">${player.defending}</div></div>
                    <div class="prop1"><div class="ca">PHY</div><div class="ca">9${player.physical}</div></div>
                </div>
            
            
                <div class="CountryAndTeam" style="display:flex;position:absolute;justify-content:center;left:-53%;top: 23px;;">
                    <div class="nationality"><img src="${player.flagUrl}" class="flag-img" style="width: 9px;top: 40px;left: 64px;position:absolute;" alt="Flag"></div>
                    <div class="club"><img src="${player.clubLogoUrl}" class="club-logo-img" style="width:9px;top: 40px;left: 79px;position:absolute;" alt="Club Logo"></div>
                    <button id="${player.id}" class="pen reset-player">
                    <i class="fa-solid fa-pen"></i>
                </button> 
                               </div>
                

            
            </div>
            
            </div>`;
            
            targetCard.setAttribute('data-index', index);
            dataCollect.splice(index, 1); // Remove player from the bench, 

            //1 indicates that one element should be removed from the array
            //indexspecifies the position of the player in the array to be removed
            localStorage.setItem('players', JSON.stringify(dataCollect)); // update local storage
            miseDekka(); // refresh bench display
        } else {
            alert('Invalid Position: drop the player in their designated position.');
        }
    });

    // bench actions for remove and update buttons
    bench.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.closest('.card-container').dataset.index; // get the index
            dataCollect.splice(index, 1); // remove the player from the array
            localStorage.setItem('players', JSON.stringify(dataCollect)); // update local storage
            miseDekka(); // refresh the bench display

        }

        // update button
        if (event.target.classList.contains('update-button')) {
            currentPlayerIndex = event.target.closest('.card-container').dataset.index; // find which player was clicked
            const player = dataCollect[currentPlayerIndex]; // get his existing player data

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


//let somme = [{"id":"1733307823938","position":"CB","name":"Donna Patterson","rating":"60","pace":"72","shooting":"26","passing":"92","dribbling":"21","defending":"44","physical":"98","clubLogoUrl":"https://www.qubafatodoni.biz","flagUrl":"https://www.wivabosaqi.cm","playerImageUrl":"https://www.sosuqo.co"},{"id":"1733307829055","position":"GK","name":"Veronica Owens","rating":"96","pace":"33","shooting":"41","passing":"42","dribbling":"23","defending":"17","physical":"34","clubLogoUrl":"https://www.qehat.us","flagUrl":"https://www.xylomupy.org","playerImageUrl":"https://www.tugypycaxotuf.info"},{"id":"1733307830883","position":"CB","name":"Zena Petersen","rating":"22","pace":"57","shooting":"96","passing":"23","dribbling":"19","defending":"49","physical":"60","clubLogoUrl":"https://www.pavigojecehylyl.us","flagUrl":"https://www.wat.com.au","playerImageUrl":"https://www.kybyrumifo.org.uk"},{"id":"1733307836472","position":"LW","name":"Violet Dorsey","rating":"25","pace":"34","shooting":"14","passing":"13","dribbling":"91","defending":"26","physical":"76","clubLogoUrl":"https://www.bus.cm","flagUrl":"https://www.zafe.mobi","playerImageUrl":"https://www.dovozuqulejuz.tv"},{"id":"1733307840849","position":"CM","name":"Yuli Coffey","rating":"71","pace":"37","shooting":"29","passing":"18","dribbling":"22","defending":"70","physical":"87","clubLogoUrl":"https://www.roqihyjabucen.ca","flagUrl":"https://www.cyfy.me.uk","playerImageUrl":"https://www.vacowaxirero.org"},{"id":"1733307843027","position":"CB","name":"Branden Santana","rating":"71","pace":"57","shooting":"61","passing":"26","dribbling":"56","defending":"22","physical":"51","clubLogoUrl":"https://www.nyl.ws","flagUrl":"https://www.huvifi.in","playerImageUrl":"https://www.heki.org.au"},{"id":"1733307849851","position":"GK","name":"Lilah Randolph","rating":"94","pace":"92","shooting":"70","passing":"73","dribbling":"41","defending":"10","physical":"51","clubLogoUrl":"https://www.wiqahizy.me","flagUrl":"https://www.myrav.co.uk","playerImageUrl":"https://www.detapudohaqafa.org.uk"},{"id":"1733307852078","position":"CB","name":"Faith Puckett","rating":"73","pace":"87","shooting":"30","passing":"13","dribbling":"88","defending":"44","physical":"85","clubLogoUrl":"https://www.pybiw.com.au","flagUrl":"https://www.febaxaxur.ws","playerImageUrl":"https://www.nobetafyri.org.uk"},{"id":"1733307853987","position":"ST","name":"Irene Cox","rating":"38","pace":"16","shooting":"69","passing":"47","dribbling":"29","defending":"48","physical":"48","clubLogoUrl":"https://www.buvuvy.us","flagUrl":"https://www.zih.org.uk","playerImageUrl":"https://www.hexunoled.cc"},{"id":"1733307856034","position":"CM","name":"Erin Duran","rating":"57","pace":"37","shooting":"99","passing":"21","dribbling":"52","defending":"89","physical":"78","clubLogoUrl":"https://www.cewimigoz.tv","flagUrl":"https://www.xyloxazedijolax.org","playerImageUrl":"https://www.raw.net"}]