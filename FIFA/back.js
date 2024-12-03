targetCard.innerHTML = ` <div class="card-container" style="position:relative;"" data-index="${index}" draggable="true">
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
    </div>


</div>

</div>