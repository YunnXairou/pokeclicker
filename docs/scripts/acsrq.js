var clickEngagedD, clickEngagedG, clickEngagedS, clickEngagedBF, clickEngagedSR, chestOpened, curDungeon, curRoute, dMax, dMaxY, evoName, evoUsed, lastArea, lastPokeType, lastRegion, leftStep, localLocal, menuPos, phases, phaseVal, save, saveKey, saveLoaded, smnName, smnUsed;

var bossA = 0;
var bossB = 0;
var catchValue = 0;
var hasRun = 0;
var hasExported = 0;
var isCatching = false;
var isCurrentShiny = 0;
var lastCount = 0;
var lastCounts = 0;
var lastECount = 0;
var lastEPoke = 0;
var lastPoke = 0;
var maxPhaseCount = 0;
var moveBoss = 0;
var mystSCount = 0;
var started = 0;

Element.prototype.appendBefore = function (element) {
    element.parentNode.insertBefore(this, element);
},false;

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', () => {
    setTimeout(() => {
        main();
        setInterval(() => {
            main();
        }, 500);
    }, 1000);

    setInterval(function(){
        if (Settings.getSetting('disableSave').observableValue() == true) {
            Save.counter = 0;
            window.onbeforeunload = [];
        } else {
            window.onbeforeunload = function () {
                Save.store(player);
            };
        }
    }, 1000);

    setInterval(function(){
        if (Settings.getSetting('noWander').observableValue() == true) {
            var wanLog = []
            for(var x = 0; x < App.game.logbook.logs().length; x++){
                if(App.game.logbook.logs()[x].description.includes("wandered")){
                    if(App.game.logbook.logs()[x].description.includes("shiny")){
                        wanLog.push(App.game.logbook.logs()[x]);
                    }
                }
                else{
                    wanLog.push(App.game.logbook.logs()[x]);
                }
            }
            App.game.logbook.logs(wanLog);
        }
    }, 5000);

    setInterval(function(){
        if (clickEngagedD){
            if (DungeonRunner.map != undefined && Battle.catching() != true && DungeonRunner.fighting() != true){
                dungeonBot();
            }
        }
        if (clickEngagedG){
            gymBot();
        }
        if (clickEngagedBF){
            bfBot();
        }
    }, 100);

    setInterval(function(){
        if (clickEngagedS){
            safariBot();
        }
    }, 250);

    setTimeout(function(){
        setInterval(function(){
            if (clickEngagedSR){
                srBot();
            }
        }, 3000);
    }, 3000);
});

function main() {
    var CharCard = document.querySelector("#saveSelector > div > div.mb-3.col-lg-4.col-md-6.col-sm-12.xol-xs-12 > div");
    if (CharCard == null && App.game != undefined) {
        a6save();
        a6menu();
        a6phases();

        if (Settings.getSetting('botstate.sr').observableValue()) {
            clickEngagedSR = 1;
            localSettings[2] = 1;
            localStorage.setItem(settingKey, JSON.stringify(localSettings));
        } else {
            clickEngagedSR = 0;
            srCount = 0;
            localSettings[2] = 0;
            localStorage.setItem(settingKey, JSON.stringify(localSettings));
            localLocal[6][1] = '';
            localLocal[6][2] = '';
            localStorage.setItem(saveKey, JSON.stringify(localLocal));
        }

        if (Settings.getSetting('ballBuyOpts').observableValue() != 'none' && Settings.getSetting('ballPurAmount').observableValue() != 0) {
            ballBot();
        }

        setTimeout(function(){
            a6settings();
        }, 1500);
    } else {
        if (localStorage.getItem('a6csrq-settings') != null) {
            if (JSON.parse(localStorage.getItem('a6csrq-settings'))[2] == 1) {
                Save.key = JSON.parse(localStorage.getItem('a6csrq-settings'))[1];
                $(`[data-key="${Save.key}"]`)[1]?.click();
            }
        }
    }
}

function a6save() {
    localLocal = [[["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]], ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"], "", "", ["0",""], "", ["", "", ""]];
    saveKey = "a6csrq-" + Save.key;

    if ( localStorage.getItem(saveKey) == null ) {
        localStorage.setItem(saveKey, JSON.stringify(localLocal));
    } else {
        localLocal = JSON.parse(localStorage.getItem(saveKey));
    }

    if (localLocal[0].length == 25) {
        newArr = [];
        newArr.push(localLocal[0]);
        newArr.push(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
        newArr.push(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
        newArr.push(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
        newArr.push(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
        newArr.push(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
        localLocal[0] = newArr;
        localStorage.setItem(saveKey, JSON.stringify(localLocal));
    }
    if (localLocal[0].length == 6) {
        newArr = [];
        newArr.push(localLocal[0][0]);
        newArr.push(localLocal[0][1]);
        newArr.push(localLocal[0][2]);
        newArr.push(localLocal[0][3]);
        newArr.push(localLocal[0][4]);
        newArr.push(localLocal[0][5]);
        newArr.push(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0", "0", "0", "0","0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]);
        localLocal[0] = newArr;
        localStorage.setItem(saveKey, JSON.stringify(localLocal));
    }
    if (localLocal[1].length == 10) {
        localLocal[1].push("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
        localStorage.setItem(saveKey, JSON.stringify(localLocal));
    }
    if (localLocal[1].length == 98) {
        localLocal[1].push("0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0");
        localStorage.setItem(saveKey, JSON.stringify(localLocal));
    }

    localSettings = ['','','',''];
    settingKey = "a6csrq-settings";

    if ( localStorage.getItem(settingKey) == null ) {
        localStorage.setItem(settingKey, JSON.stringify(localSettings));
    } else {
        localSettings = JSON.parse(localStorage.getItem(settingKey));
    }

    if (localSettings.length == 14) {
        localSettings = localSettings.splice(9,1)[0];
        localStorage.setItem(settingKey, JSON.stringify(localSettings));
    }

    phases = [];
    if ( localStorage.getItem(`phaseTracker${Save.key}`) == null ) {
        localStorage.setItem(`phaseTracker${Save.key}`, JSON.stringify(phases));
    } else {
        phases = JSON.parse(localStorage.getItem(`phaseTracker${Save.key}`));
    }
    localStorage[`phaseTracker${Save.key}`] = JSON.stringify(phases);
    localStorage.setItem(`phaseTracker${Save.key}`, JSON.stringify(phases));

    saveLoaded = 1;
}

function a6menu() {
    lastPokeEncounter();
    areaClears();
}

async function a6settings() {
    localStorage.setItem(settingKey, JSON.stringify(localSettings));

    if (Settings.getSetting('botOptions')?.observableValue()) {
        //Breeding Bot
        const breedingCheck = document.getElementById('checkbox-botstate.breeding');
        if (!breedingCheck.disabled && breedingCheck.checked) {
            autoBreed();
        }

        //Dungeon Bot
        const dungeonCheck = document.getElementById('checkbox-botstate.dungeon');
        const dungeon = player.town().dungeon;
        const curDT = App.game.wallet.currencies[GameConstants.Currency.dungeonToken]();
        if (!dungeonCheck.disabled && dungeonCheck.checked && curDT >= dungeon.tokenCost) {
            switch (Settings.getSetting('dungeOpts').observableValue()) {
                case 'dungOptN':
                    dungeonClick(1);
                    break;
                case 'dungOptSC':
                    dungeonClick(!DungeonRunner.dungeonCompleted(dungeon, true));
                    break;
                case 'dungOptC':
                    dungeonClick(App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(dungeon.name)]() < Settings.getSetting('maxClears').observableValue());
                    break;
                case 'dungOptDT':
                    dungeonClick(curDT >= Settings.getSetting('minDT').observableValue());
                    break;
                default:
                    dungeonClick(0);
            }
        } else {
            dungeonClick(0);
        }

        //Gym Bot
        const gymCheck = document.getElementById('checkbox-botstate.gym');
        gymClick(!gymCheck.disabled && gymCheck.checked);

        //Safari Bot
        const safariCheck = document.getElementById('checkbox-botstate.safari');
        if (!safariCheck.disabled && safariCheck.checked) {
            if (Safari.inProgress()) {
                switch (Settings.getSetting('safariOpts').observableValue()) {
                    case 'safariOptN':
                        safariClick(1);
                        break;
                    case 'safariOptSC':
                        safariClick(!Safari.completed(true));
                        break;
                    default:
                        safariClick(0);
                }
            } else if (!Safari.completed(true)) {
                safariClick(0);
            }
        } else if (safariCheck.checked && clickEngagedS && !Safari.completed(true)) {
            if ($('#safariModal')[0].classList.contains('show')) {
                Safari.payEntranceFee();
            } else if (App.game.gameState != 5) {
                App.game.gameState = 5;
                setTimeout(() => {
                    Safari.openModal();
                }, 500);
            }
        } else {
            safariClick(0);
        }

        //BF Bot
        const bfCheck = document.getElementById('checkbox-botstate.bf');
        bfClick(!bfCheck.disabled && bfCheck.checked);

        //Planter Bots
        const plantSelect = document.getElementById('select-botstate.plant');
        if (!plantSelect.disabled && plantSelect.value != 'N/A') {
            plantBot();
        }
        //Mutator Bots
        const mutateSelect = document.getElementById('select-botstate.mutate');
        if (!mutateSelect.disabled && mutateSelect.value != 'N/A') {
            plantBot();
        }
    }
}

function dungeonClick(x) {
    clickEngagedD = !!x;
}

function gymClick(x) {
    clickEngagedG = !!x;
}

function safariClick(x) {
    clickEngagedS = !!x;
}

function bfClick(x) {
    clickEngagedBF = !!x;
}

function lastPokeEncounter() {
    if (JSON.parse(localStorage.getItem(saveKey))[4][0] != "0") {
        lastPoke = JSON.parse(localStorage.getItem(saveKey))[4][0];
    }
    if (JSON.parse(localStorage.getItem(saveKey))[4][1] != "") {
        lastPokeType = JSON.parse(localStorage.getItem(saveKey))[4][1];
    } else {
        lastPokeType = '?: ';
    }

    if (lastPoke == 0) {
        document.querySelector("#lastEncounterPoke > td:nth-child(1)").innerHTML = 'N/A';
    } else {
        var pkName = PokemonHelper.getPokemonById(lastPoke).name.split(" ")[0];
        document.querySelector("#lastEncounterPoke > td:nth-child(1)").innerHTML = lastPokeType + pkName;
    }
}

async function areaClears() {
    var townContent = player.town().content;
    var gymsFound = 0;
    var gymAtX = 0;

    for (let x = 0; x < townContent.length; x++) {
        if (townContent[x].leaderName != null ) {
            gymsFound++;
            gymAtX = x;
        }
    }

    if (document.querySelector("#safariModal").style.display != "none" && document.querySelector("#safariModal").style.display != "") {
        clears = 0;
        if (Safari.inProgress() != false) {
            await phaseCounter(3);
        }
    } else if (player.route() != 0) {
        clears = App.game.statistics.routeKills[player.region][player.route()]().toLocaleString('en-US');
        if (lastArea != player.route() || lastRegion != player.region) {
            lastPoke = 0;
            localLocal[4][0] = 0;
            localLocal[4][1] = '';
            localLocal[3] = 0;
            localStorage.setItem(saveKey, JSON.stringify(localLocal));
        }
        lastArea = player.route();
        lastRegion = player.region;
        await phaseCounter(1);
    } else if (player.town().dungeon != undefined) {
        clears = App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(player.town().name)]().toLocaleString('en-US');
        if (lastArea != player.town().dungeon.name || lastRegion != player.region) {
            lastPoke = 0;
            localLocal[4][0] = 0;
            localLocal[4][1] = '';
            localLocal[3] = 0;
            localStorage.setItem(saveKey, JSON.stringify(localLocal));
        }
        lastArea = player.town().dungeon.name;
        lastRegion = player.region;
        await phaseCounter(2);
    } else if (App.game.gameState == 6) {
        if (gymsFound == 1) {
            clears = townContent[gymAtX].clears()
            if (lastArea != townContent[gymAtX].leaderName || lastRegion != player.region) {
                lastPoke = 0;
                localLocal[4][0] = 0;
                localLocal[4][1] = '';
                localLocal[3] = 0;
                localStorage.setItem(saveKey, JSON.stringify(localLocal));
            }
            lastArea = townContent[gymAtX].leaderName;
            lastRegion = player.region;
            await phaseCounter(4);
        } else if (gymsFound > 1) {
            clears = townContent[Settings.getSetting('gymE4Opts').observableValue() - 1].clears()
            if (lastArea != townContent[Settings.getSetting('gymE4Opts').observableValue() - 1].leaderName || lastRegion != player.region) {
                lastPoke = 0;
                localLocal[4][0] = 0;
                localLocal[4][1] = '';
                localLocal[3] = 0;
                localStorage.setItem(saveKey, JSON.stringify(localLocal));
            }
            lastArea = townContent[Settings.getSetting('gymE4Opts').observableValue() - 1].leaderName;
            lastRegion = player.region;
            await phaseCounter(5);
        } else {
            clears = 0;
        }
    } else {
        clears = 0;
    }
    document.querySelector("#areaClears > td:nth-child(1)").innerHTML = clears;
}

async function phaseCounter(arg) {
    var arg = arg;

    if (localStorage.getItem(saveKey) != null) {
        localLocal[3] = JSON.parse(localStorage.getItem(saveKey))[3];
    }

    var gymFound = 0;
    var townC = player.town().content;
    for (let x = 0; x < townC.length; x++) {
        if (townC[x].constructor.name == 'Gym') {
            gymFound++;
        }
    }

    if (phaseVal == '' || phaseVal == null || phaseVal == undefined){
        if (document.querySelector("#safariModal").style.display != "none" && document.querySelector("#safariModal").style.display != "") {
            if (Safari.inProgress() != false) {
                phaseVal = 0;
                localLocal[5] = 0;
                localStorage.setItem(saveKey, JSON.stringify(localLocal));
            }
        } else if (player.route() != 0) {
            curRoute = player.route();
            curDungeon = GameConstants.getDungeonIndex(player.town().name);
            for (let rC = 0; rC < Routes.getRoutesByRegion(player.region).length; rC++) {
                if (Routes.getRoutesByRegion(player.region)[rC].number == player.route()) {
                    cArea = rC;
                }
            }
            if (localLocal[0][player.region][cArea] == '') {
                phaseVal = 0;
                localLocal[0][player.region][cArea] = 0;
                localStorage.setItem(saveKey, JSON.stringify(localLocal));
            } else {
                phaseVal = localLocal[0][player.region][cArea];
            }
        } else if (player.town().dungeon != undefined) {
            curRoute = player.route();
            curDungeon = GameConstants.getDungeonIndex(player.town().name);
            cArea = GameConstants.getDungeonIndex(player.town().name);
            if (curDungeon == -1) {
                phaseVal = 0;
            } else {
                if (localLocal[1][cArea] == '') {
                    phaseVal = 0;
                    localLocal[1][cArea] = 0;
                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                } else {
                    phaseVal = localLocal[1][cArea];
                }
            }
        } else if (gymFound >= 1) {
            phaseVal = 0;
        }
    } else if (document.querySelector("#phaseCount").value != phaseVal) {
        if (document.querySelector("#safariModal").style.display != "none" && document.querySelector("#safariModal").style.display != "") {
            if (Safari.inProgress() != false) {
                phaseVal = document.querySelector("#phaseCount").value;
                localLocal[5] = phaseVal;
                localStorage.setItem(saveKey, JSON.stringify(localLocal));
            }
        } else if (player.route() != 0) {
            phaseVal = document.querySelector("#phaseCount").value;
            cArea = player.route() - 1;
            localLocal[0][player.region][cArea] = phaseVal;
            localStorage.setItem(saveKey, JSON.stringify(localLocal));
        } else if (player.town().dungeon != undefined) {
            phaseVal = document.querySelector("#phaseCount").value;
            cArea = GameConstants.getDungeonIndex(player.town().name);
            localLocal[1][cArea] = phaseVal;
            localStorage.setItem(saveKey, JSON.stringify(localLocal));
        }
    } else if (curRoute != player.route() || curDungeon != GameConstants.getDungeonIndex(player.town().name)) {
        if (document.querySelector("#safariModal").style.display != "none" && document.querySelector("#safariModal").style.display != "") {
            if (Safari.inProgress() != false) {
                phaseVal = document.querySelector("#phaseCount").value;
                phaseVal = localLocal[5];
                phaseVal = localLocal[5];
            }
        } else if (player.route() != 0) {
            curRoute = player.route();
            curDungeon = GameConstants.getDungeonIndex(player.town().name);
            cArea = player.route() - 1;
            phaseVal = localLocal[0][player.region][cArea];
        } else if (player.town().dungeon != undefined) {
            curRoute = player.route();
            curDungeon = GameConstants.getDungeonIndex(player.town().name);
            cArea = GameConstants.getDungeonIndex(player.town().name);
            phaseVal = localLocal[1][cArea];
        }
    }

    switch (arg) {
        case 1: //wild battles
            if (Battle.enemyPokemon().id != null) {
                if (lastEPoke == 0 && Battle.enemyPokemon().id != 0) {
                    lastEPoke = Battle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[Battle.enemyPokemon().id]();
                    localLocal[3]++;
                } else if ( lastEPoke == Battle.enemyPokemon().id && lastECount == (App.game.statistics.pokemonEncountered[Battle.enemyPokemon().id]() + 1) ) {
                    break;
                } else if ( lastECount == App.game.statistics.pokemonEncountered[Battle.enemyPokemon().id]() ) {
                    break;
                } else {
                    lastEPoke = Battle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[Battle.enemyPokemon().id]();
                    localLocal[3]++;
                }
                if (Battle.enemyPokemon().shiny == true) {
                    if (lastPoke == 0) {
                        lastPokeType = 'W: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = Battle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[Battle.enemyPokemon().id]();
                        phaseVal++;
                        localLocal[3] = 0;
                        localLocal[0][player.region][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
						isCurrentShiny = 1;
                    } else if ( lastPoke == Battle.enemyPokemon().id && lastCounts == App.game.statistics.shinyPokemonEncountered[Battle.enemyPokemon().id]() ) {
                        break;
                    } else {
                        lastPokeType = 'W: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = Battle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[Battle.enemyPokemon().id]();
                        phaseVal++;
                        localLocal[3] = 0;
                        localLocal[0][player.region][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
						isCurrentShiny = 1;

                    }
                } else {
					if (isCurrentShiny == 1) {
						var catchStatus = "";
						phaseLogs = App.game.logbook.logs();
						for (var x = 0; x < 3; x++) {
							var phaseLog = phaseLogs[x];
							if(phaseLog.type.label == "ESCAPED") {
								catchStatus = "Failed";
								break;
							} else if (phaseLog.type.label == "CAUGHT") {
								catchStatus = "Captured";
								break;
							}
						}
                        if (catchStatus == "") {
                            catchStatus = "No Attempt";
                        }
						catchValue = 0;
						isCurrentShiny = 0;
						newPhase = [phaseVal, Routes.getRoute(player.region, player.route()).routeName, "Wild", App.game.party.getPokemon(lastPoke).name, catchStatus, App.game.statistics.routeKills[player.region][player.route()]()];
						phases.push(newPhase);
						localStorage[`phaseTracker${Save.key}`] = JSON.stringify(phases);
						localStorage.setItem(`phaseTracker${Save.key}`, JSON.stringify(phases));
						hasRun = 0;
						a6phases();
					}
				}
            }
            break;
        case 2: //dungeons
            if (DungeonBattle.enemyPokemon() != null) {
                if (lastEPoke == 0 && DungeonBattle.enemyPokemon().id != 0) {
                    lastEPoke = DungeonBattle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[DungeonBattle.enemyPokemon().id]();
                    localLocal[3]++;
                } else if ( lastEPoke == DungeonBattle.enemyPokemon().id && lastECount == App.game.statistics.pokemonEncountered[DungeonBattle.enemyPokemon().id]() ) {
                    break;
                } else if ( DungeonBattle.enemyPokemon().id == 0 ) {
                    break;
                } else {
                    lastEPoke = DungeonBattle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[DungeonBattle.enemyPokemon().id]();
                    localLocal[3]++;
                }
                if (DungeonBattle.enemyPokemon().shiny == true) {
                    if (lastPoke == 0) {
                        if ( DungeonRunner.fightingBoss() == true ) {
                            lastPokeType = 'B: ';
                            localLocal[4][1] = lastPokeType;
                        } else if ( DungeonBattle.trainer() != null ) {
                            App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().dungeon.name}] You encountered a trainer's Shiny ${DungeonBattle.enemyPokemon().name}.`);
                            lastPokeType = 'T: ';
                            localLocal[4][1] = lastPokeType;
                        } else {
                            lastPokeType = 'W: ';
                            localLocal[4][1] = lastPokeType;
                        }
                        lastPoke = DungeonBattle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[DungeonBattle.enemyPokemon().id]();
                        phaseVal++;
                        localLocal[3] = 0;
                        localLocal[1][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
						isCurrentShiny = 1;
                    } else if ( lastPoke == DungeonBattle.enemyPokemon().id && lastCounts == App.game.statistics.shinyPokemonEncountered[DungeonBattle.enemyPokemon().id]() ) {
                        break;
                    } else {
                        if ( DungeonRunner.fightingBoss() == true ) {
                            lastPokeType = 'B: ';
                            localLocal[4][1] = lastPokeType;
                        } else if ( DungeonBattle.trainer() != null ) {
                            App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().dungeon.name}] You encountered a trainer's Shiny ${DungeonBattle.enemyPokemon().name}.`);
                            lastPokeType = 'T: ';
                            localLocal[4][1] = lastPokeType;
                        } else {
                            lastPokeType = 'W: ';
                            localLocal[4][1] = lastPokeType;
                        }
                        lastPoke = DungeonBattle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[DungeonBattle.enemyPokemon().id]();
                        phaseVal++;
                        localLocal[3] = 0;
                        localLocal[1][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
						isCurrentShiny = 1;
                    }
                } else {
					if (isCurrentShiny == 1) {
						var encounterType = "";
						var catchStatus = "";
						phaseLogs = App.game.logbook.logs();
						phaseLoop:
						for (var x = 0; x < 3; x++) {
							var phaseLog = phaseLogs[x];
							if (phaseLog.type.label == "SHINY" && lastPokeType == 'B: ') {
								if (phaseLog.description.includes("trainer")) {
									catchStatus = "Boss Trainer";
									encounterType = "Boss"
									break phaseLoop;
								} else {
									if (phaseLogs[x-1].type.label == "CAUGHT") {
										catchStatus = "Boss Captured";
										encounterType = "Boss";
										break phaseLoop;
									} else if (phaseLogs[x-1].type.label == "ESCAPED") {
										catchStatus = "Boss Failed";
										encounterType = "Boss";
										break phaseLoop;
									}
								}
							} else if (phaseLog.type.label == "SHINY" && lastPokeType == 'T: ') {
								catchStatus = "Trainer";
								encounterType = "Trainer";
								break phaseLoop;
							} else if(phaseLog.type.label == "CAUGHT" && lastPokeType == 'W: ') {
								catchStatus = "Captured";
								encounterType = "Wild";
								break phaseLoop;
							} else if(phaseLog.type.label == "ESCAPED" && lastPokeType == 'W: ') {
								catchStatus = "Failed";
								encounterType = "Wild";
								break phaseLoop;
							}
						}
                        if (catchStatus == "") {
                            catchStatus = "No Attempt";
                        }
						catchValue = 0;
						isCurrentShiny = 0;
						newPhase = [phaseVal, player.town().dungeon.name, encounterType, App.game.party.getPokemon(lastPoke).name, catchStatus, App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(player.town().dungeon.name)]()];
						phases.push(newPhase);
						localStorage[`phaseTracker${Save.key}`] = JSON.stringify(phases);
						localStorage.setItem(`phaseTracker${Save.key}`, JSON.stringify(phases));
						hasRun = 0;
						a6phases();
					}
				}
            }
            break;
        case 3: //safari
            if (SafariBattle.enemy != undefined) {
                if (lastEPoke == 0) {
                    lastEPoke = SafariBattle.enemy.id;
                    lastECount = App.game.statistics.pokemonEncountered[SafariBattle.enemy.id]();
                    localLocal[3]++;
                } else if ( lastEPoke == SafariBattle.enemy.id && lastECount == App.game.statistics.pokemonEncountered[SafariBattle.enemy.id]() ) {
                    break;
                } else {
                    lastEPoke = SafariBattle.enemy.id;
                    lastECount = App.game.statistics.pokemonEncountered[SafariBattle.enemy.id]();
                    localLocal[3]++;
                }
                if (SafariBattle.enemy.shiny == true) {
                    if (lastPoke == 0) {
                        lastPokeType = 'W: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = SafariBattle.enemy.id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[SafariBattle.enemy.id]();
                        phaseVal++;
                        localLocal[3] = 0;
                        localLocal[5] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
						isCurrentShiny = 1;
                    } else if ( lastPoke == SafariBattle.enemy.id && lastCounts == App.game.statistics.shinyPokemonEncountered[SafariBattle.enemy.id]() ) {
                        break;
                    } else {
                        lastPokeType = 'W: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = SafariBattle.enemy.id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[SafariBattle.enemy.id]();
                        phaseVal++;
                        localLocal[3] = 0;
                        localLocal[5] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
						isCurrentShiny = 1;
                    }
                } else {
					if (isCurrentShiny == 1) {
						var catchStatus = "";
						phaseLogs = App.game.logbook.logs();
						for (var x = 0; x < 3; x++) {
							var phaseLog = phaseLogs[x];
							if (phaseLog.type.label == "ESCAPED") {
								catchStatus = "Failed";
								break;
							} else if (phaseLog.type.label == "CAUGHT") {
								catchStatus = "Captured";
								break;
							}
						}
                        if (catchStatus == "") {
                            catchStatus = "No Attempt";
                        }
						catchValue = 0;
						isCurrentShiny = 0;
						newPhase = [phaseVal, "Safari Zone", "Wild", App.game.party.getPokemon(lastPoke).name, catchStatus, "N/A"];
						phases.push(newPhase);
						localStorage[`phaseTracker${Save.key}`] = JSON.stringify(phases);
						localStorage.setItem(`phaseTracker${Save.key}`, JSON.stringify(phases));
						hasRun = 0;
						a6phases();
					}
				}
            }
            break;
        case 4: //gym
            if (GymBattle.enemyPokemon() != null) {
                if (lastEPoke == 0 && GymBattle.enemyPokemon().id != 0) {
                    lastEPoke = GymBattle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]();
                    localLocal[3]++;
                } else if ( lastEPoke == GymBattle.enemyPokemon().id && lastECount == (App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]() + 1) ) {
                    break;
                } else if ( lastECount == App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]() ) {
                    break;
                } else {
                    lastEPoke = GymBattle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]();
                    localLocal[3]++;
                }
                if (GymBattle.enemyPokemon().shiny == true) {
                    if (lastPoke == 0) {
                        App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().gym.town} Gym] You encountered a trainer's Shiny ${this.enemyPokemon().name}.`);
                        lastPokeType = 'T: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = GymBattle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[GymBattle.enemyPokemon().id]();
                        phaseVal = 0;
                        localLocal[3] = 0;
                        localLocal[0][player.region][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    } else if ( lastPoke == GymBattle.enemyPokemon().id && lastCounts == App.game.statistics.shinyPokemonEncountered[GymBattle.enemyPokemon().id]() ) {
                        break;
                    } else {
                        App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().gym.town} Gym] You encountered a trainer's Shiny ${this.enemyPokemon().name}.`);
                        lastPokeType = 'T: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = GymBattle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[GymBattle.enemyPokemon().id]();
                        phaseVal = 0;
                        localLocal[3] = 0;
                        localLocal[0][player.region][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    }
                }
            }
            break;
        case 5: //e4
            if (GymBattle.enemyPokemon() != null) {
                if (lastEPoke == 0 && GymBattle.enemyPokemon().id != 0) {
                    lastEPoke = GymBattle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]();
                    localLocal[3]++;
                } else if ( lastEPoke == GymBattle.enemyPokemon().id && lastECount == (App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]() + 1) ) {
                    break;
                } else if ( lastECount == App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]() ) {
                    break;
                } else {
                    lastEPoke = GymBattle.enemyPokemon().id;
                    lastECount = App.game.statistics.pokemonEncountered[GymBattle.enemyPokemon().id]();
                    localLocal[3]++;
                }
                if (GymBattle.enemyPokemon().shiny == true) {
                    if (lastPoke == 0) {
                        App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().name}] You encountered a ${player.town().gymList[0].town}'s Shiny ${this.enemyPokemon().name}.`);
                        lastPokeType = 'T: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = GymBattle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[GymBattle.enemyPokemon().id]();
                        phaseVal = 0;
                        localLocal[3] = 0;
                        localLocal[0][player.region][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    } else if ( lastPoke == GymBattle.enemyPokemon().id && lastCounts == App.game.statistics.shinyPokemonEncountered[GymBattle.enemyPokemon().id]() ) {
                        break;
                    } else {
                        App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().name}] You encountered a ${player.town().gymList[0].town}'s Shiny ${this.enemyPokemon().name}.`);
                        lastPokeType = 'T: ';
                        localLocal[4][1] = lastPokeType;
                        lastPoke = GymBattle.enemyPokemon().id;
                        localLocal[4][0] = lastPoke;
                        lastCounts = App.game.statistics.shinyPokemonEncountered[GymBattle.enemyPokemon().id]();
                        phaseVal = 0;
                        localLocal[3] = 0;
                        localLocal[0][player.region][cArea] = phaseVal;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    }
                }
            }
    }
    document.querySelector("#phaseCount").value = phaseVal;

    if (localLocal[3].toLocaleString('en-US') == '') {
        document.querySelector("#lastEncounter > td:nth-child(1)").innerHTML = 0;
    } else {
        document.querySelector("#lastEncounter > td:nth-child(1)").innerHTML = localLocal[3].toLocaleString('en-US');
    }
    localStorage.setItem(saveKey, JSON.stringify(localLocal));
}

function removePhase(id){
	var newArray = [];
	for(var x = 0; x < phases.length; x++){
		if(x !== id){
			newArray.push(phases[x]);
		}
	}
	phases = newArray;
	localStorage[`phaseTracker${Save.key}`] = JSON.stringify(phases);
	localStorage.setItem(`phaseTracker${Save.key}`, JSON.stringify(phases));
	hasRun = 0;
	a6phases();
}

function removeAllPhases(){
	phases = [];
	localStorage[`phaseTracker${Save.key}`] = JSON.stringify(phases);
	localStorage.setItem(`phaseTracker${Save.key}`, JSON.stringify(phases));
	hasRun = 0;
	a6phases();
}

async function a6export() {
    hasExported = 0;
    var test_array = phases;
    var csv = test_array.map(row => row.map(item => (typeof item === 'string' && item.indexOf(',') >= 0) ? `"${item}"`: String(item)).join(',')).join('\n');
    var data = encodeURI('data:text/csv;charset=utf-8,' + csv);

    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', 'phases.csv');

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function a6phases() {
    if (Settings.getSetting('trackPhases').observableValue() == true) {
        var newArray = [];
    	var phaseCountDifference = phases.length - Settings.getSetting('phaseCount').observableValue();
    	if (phaseCountDifference > 0) {
    		for (var phase = 0; phase < phases.length; phase++) {
    			if (phaseCountDifference > 0) {
    				phaseCountDifference--;
    			} else {
    				newArray.push(phases[phase]);
    			}
    		}
    		phases = newArray;
    	}
    	if (hasRun == 0) {
            let phaseTable = $('#phaseTable tbody')[0];
            phaseTable.innerHTML = '';
    		for(var x = 0; x < phases.length; x++){
    			var tablePhase = document.createElement('tr');
    			var phaseId = "phase" + x;
    			tablePhaseQuery = "<tr><td>" + phases[x][0] + "</td>" + "<td>" + phases[x][1] + "</td>" + "<td>" + phases[x][2] + "</td>" + "<td>" + phases[x][3] + "</td>" + "<td>" + phases[x][4] + "</td>" + "<td>" + phases[x][5] + "</td>" + "<td>" + "<button type=\"button\" class=\"btn btn-primary\" onclick=\"removePhase(" + x + ")\">Remove</button>" + "</td></tr>";
    			tablePhase.innerHTML = tablePhaseQuery;
    			tablePhase.style.display = "none";
    			phaseTable.append(tablePhase);
    			var childNumber = x + 1;
    			if (x < Number(Settings.getSetting('phaseCount').observableValue())) {
    				var displayQuery = "#phaseTable tbody > tr:nth-child(" + childNumber + ")";
    				document.querySelector(displayQuery).removeAttribute("style");
    				hasRun = 1;
    			}
    		}
    	}
    	localStorage[`phaseTracker${Save.key}`] = JSON.stringify(phases);
    }
}

async function dungeonBot() {
    if (App.game.gameState == 6) {
        stage = 0;
        started = 0;
        chestOpened = 0;
        if (App.game.wallet.currencies[GameConstants.Currency.dungeonToken]() >= DungeonRunner.dungeon.tokenCost) {
            DungeonRunner.initializeDungeon(player.town().dungeon);
        }
    } else if ( DungeonRunner.timeLeft() != -10 && DungeonRunner.dungeonFinished() != true) {
        for (let aa = 0; aa < DungeonRunner.map.board().length; aa++) {
            for (let bb = 0; bb < DungeonRunner.map.board()[aa].length; bb++) {
                var cellType = DungeonRunner.map.board()[aa][bb].type();
                if (cellType == 4) {
                    bossA = aa;
                    bossB = bb;
                }
            }
        }
        var pX = DungeonRunner.map.playerPosition().x;
        var pY = DungeonRunner.map.playerPosition().y;
        if ( Settings.getSetting('botRush').observableValue() == true) {
            if (App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(DungeonRunner.dungeon.name)]() >= 200) {
                if (Math.abs(DungeonRunner.map.playerPosition().y - bossA) <= 1) {
                    if (pX == bossB) {
                        await DungeonRunner.map.moveToCoordinates(bossB,bossA);
                        await DungeonRunner.handleClick();
                    }
                }
                if (Math.abs(DungeonRunner.map.playerPosition().x - bossB) <= 1) {
                    if (pY == bossA) {
                        await DungeonRunner.map.moveToCoordinates(bossB,bossA);
                        await DungeonRunner.handleClick();
                    }
                }
            }
            if (pX == bossB && pY == bossA) {
                await DungeonRunner.handleClick();
            }
        }
        if ( Settings.getSetting('chestCollect').observableValue() == true) {
            if (DungeonRunner.map.currentTile().type() == 3) {
                if (chestOpened < Settings.getSetting('maxChests').observableValue()) {
                    DungeonRunner.handleClick();
                    chestOpened++
                }
            }
        }
        var dClears = App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(player.town().dungeon.name)]();
        var dSize = player.region;

        if (started == 0){
            moveBoss = 0;
            if (dClears < 10) {
                dSize = player.region;
                dMax = 4 + player.region;
            } else if (dClears < 100) {
                dSize = player.region - 1;
                dMax = 4 + player.region - 1;
            } else if (dClears < 1000) {
                dSize = player.region - 2;
                dMax = 4 + player.region - 2;
            } else if (dClears < 10000) {
                dSize = player.region - 3;
                dMax = 4 + player.region - 3;
            } else if (dClears < 100000) {
                dSize = player.region - 4;
                dMax = 4 + player.region - 4;
            } else {
                dSize = player.region - 5;
                dMax = 4 + player.region - 5;
            }
            if (dSize < 0) {
                dSize = 0;
            }
            if (dMax < 4) {
                dMax = 4;
            }
            dMaxY = dMax;
            if (pY == dMax) {
                DungeonRunner.map.moveLeft();
                if (pX == 0 && pY == dMax) {
                    started = 1;
                }
            }
        } else {
            if (moveBoss == 1) {
                if (pX == bossB && pY == bossA) {
                    await DungeonRunner.handleClick();
                }
            } else {
                DungeonRunner.map.moveRight();
                if (pX == dMax && pY == dMaxY) {
                    await DungeonRunner.map.moveToCoordinates(0,dMaxY);
                    await DungeonRunner.map.moveUp();
                    dMaxY = dMaxY - 1;
                } else if (pX == dMax && pY == 0) {
                    await DungeonRunner.map.moveToCoordinates(bossB,bossA);
                    moveBoss = 1;
                }
            }
        }
    }
}

async function gymBot() {
    if (App.game.gameState == 6) {
        var gymsFound = 0;
        var gymAtX = 0;
        var townContent = player.town().content;
        for (let x = 0; x < townContent.length; x++) {
            if (townContent[x].leaderName != null ) {
                gymsFound++;
                gymAtX = x;
            }
        }

        if (gymsFound == 1) {
            if (townContent[gymAtX].isUnlocked() == true) {
                switch(Settings.getSetting('gymOpts').observableValue()) {
                    case "gymOptC":
                        if ((townContent[gymAtX].clears() || 0) < Number(Settings.getSetting('maxClears').observableValue())) {
                            GymRunner.startGym(townContent[gymAtX]);
                        }
                        break;
                    case "gymOptN":
                        GymRunner.startGym(townContent[gymAtX]);
                }
            }
        } else if (gymsFound > 1) {
            var pickE4 = Settings.getSetting('gymE4Opts').observableValue();
            if (townContent[pickE4 - 1].isUnlocked() == true) {
                switch (pickE4) {
                    case "1":
                        GymRunner.startGym(townContent[0]);
                        break;
                    case "2":
                        GymRunner.startGym(townContent[1]);
                        break;
                    case "3":
                        GymRunner.startGym(townContent[2]);
                        break;
                    case "4":
                        GymRunner.startGym(townContent[3]);
                        break;
                    case "5":
                        GymRunner.startGym(townContent[4]);
                        break;
                    default:
                        GymRunner.startGym(townContent[0]);
                }
            }
        }
    }
}

async function safariBot() {
    let bound = {x: Safari.grid[0].length, y: Safari.grid.length};
    let matrix = Array.from({length: bound.y}, () => Array.from({length: bound.x}, () => Infinity));
    const dirOrder = (()=> {
        const lastDir = Safari.lastDirection
        switch (lastDir) {
            case 'left': priority = 'right'; break;
            case 'up': priority = 'down'; break;
            case 'right': priority = 'left'; break;
            case 'down': priority = 'up'; break;
        }
        return [...new Set([priority, lastDir, 'up', 'down', 'left', 'right'])]
    })();

    let nearestGrass = {x:0, y:0, d:Infinity}
    const walkable = [
        0, //ground
        10, //grass
        11,12,13,14,21,22,23,24,15,16,17,18,19 //sand
    ];

    movementMatrix = (origin) => {
        let queue = new Set([JSON.stringify(origin)]);
        for(let p = 0; p < queue.size; p++) {
            let {x, y} = JSON.parse([...queue][p]);
            if (!walkable.includes(Safari.grid[y][x]))
                continue;

            const next = dirOrder.map((dir) => {
                const xy = Safari.directionToXY(dir)
                xy.x += x
                xy.y += y
                return xy;
            }).filter(({x,y})=> y < bound.y && y >= 0 && x < bound.x && x >= 0 );
            for (let n = 0; n < next.length; n++)
                queue.add(JSON.stringify(next[n]));

            if (x == origin.x && y == origin.y)
                matrix[y][x] = 0;
            else {
                matrix[y][x] = Math.min(...next.map(({x, y}) => matrix[y][x])) + 1;

                if (Safari.completed(true)) {
                    if (Safari.grid[y][x] != 10 && matrix[y][x] < nearestGrass.d)
                        nearestGrass = {x, y, d: matrix[y][x]};
                } else {
                    if (Safari.grid[y][x] == 10 && matrix[y][x] < nearestGrass.d && next.map(({x,y}) => Safari.grid[y][x]).includes(10))
                        nearestGrass = {x, y, d: matrix[y][x]};
                }
            }
        }
    }

    if (Safari.inProgress() && document.querySelector("#safariModal").classList.contains('show')) {
        if (Safari.inBattle()) {
            if (!SafariBattle.busy()) {
                if (SafariBattle.enemy.shiny && !App.game.party.alreadyCaughtPokemon(SafariBattle.enemy.id, true)) {
                    if (SafariBattle.enemy.eatingBait != 2 && App.game.farming.berryList[11]() > 25) {
                        SafariBattle.throwBait(2);
                    } else if (Safari.balls() > 0) { //prevent balls to be negativ and lock the safari
                        SafariBattle.throwBall();
                    }
                } else {
                    SafariBattle.run();
                    setTimeout(()=> {
                        SafariBattle.busy(false);
                    }, 1600); // anti soft lock
                }
            }
        } else {
            let dest = {d: Infinity}
            movementMatrix(Safari.playerXY)

            const pkm = Safari.pokemonGrid();
            for (let i = 0; i < pkm.length; i++) {
                const dist = matrix[pkm[i].y][pkm[i].x];
                if (
                    pkm[i].shiny && !App.game.party.alreadyCaughtPokemon(pkm[i].id, true) &&
                    dist < dest.d && dist < pkm[i].steps
                ) {
                    dest = pkm[i];
                    dest.d = dist;
                }
            }
            if (dest.d == Infinity)
                dest = nearestGrass;

            movementMatrix(dest);
            const next = dirOrder.map(dir => {
                const xy = Safari.directionToXY(dir);
                xy.x += Safari.playerXY.x;
                xy.y += Safari.playerXY.y;

                if (xy.y >= bound.y || xy.y < 0 || xy.x >= bound.x || xy.x < 0)
                    return null;
                return {dir, ...xy, d: matrix[Safari.playerXY.y][Safari.playerXY.x] - matrix[xy.y][xy.x]}
            }).filter((n) => n && n.d > 0);

            if (next[0])
                Safari.step(next[0].dir);
        }
    }
}

async function bfBot() {
    if (App.game.gameState == 8) {
        switch(Settings.getSetting('bfOpts').observableValue()) {
            case "bfOptL":
                if (BattleFrontierRunner.started() == true) {
                    if (BattleFrontierRunner.stage() >= Number(Settings.getSetting('maxLvl').observableValue())) {
                        BattleFrontierRunner.end();
                    }
                } else {
                    BattleFrontierRunner.start();
                }
                break;
            case "bfOptT":
                if (BattleFrontierRunner.started() == true) {
                    if (Number(BattleFrontierRunner.timeLeftSeconds()) <= Number(Settings.getSetting('maxTime').observableValue())) {
                        BattleFrontierRunner.end();
                    }
                } else {
                    BattleFrontierRunner.start();
                }
                break;
            case "bfOptN":
                if (BattleFrontierRunner.started() != true) {
                    BattleFrontierRunner.start();
                }
        }
    }
}

async function srBot() {
    var srCount;
    if (localLocal[6][2] != 0) {
        srCount = localLocal[6][2];
    } else {
        srCount = 0;
    }
    localSettings[1] = Save.key;
    localStorage.setItem(settingKey, JSON.stringify(localSettings));
    switch(Settings.getSetting('srOpts').observableValue()) {
        case "mys":
            if (ItemList.Mystery_egg.getCaughtStatus() != 2 ) {
                if (localLocal[6][1] == '') {
                    if (App.game.breeding.eggList[0]().type == -1 && player.itemList["Mystery_egg"]() > 0) {
                        ItemList['Mystery_egg'].use();
                        if(App.game.party.alreadyCaughtPokemonByName(App.game.breeding.eggList[0]().pokemon, true) == true) {
                            console.log( 'Already have - ' + App.game.breeding.eggList[0]().pokemon + ' - Shiny: ' + App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) );
                            location.reload();
                        } else if (App.game.party.alreadyCaughtPokemonByName(App.game.breeding.eggList[0]().pokemon, true) != true) {
                            localLocal[6][1] = App.game.breeding.eggList[0]().pokemon;
                            localStorage.setItem(saveKey, JSON.stringify(localLocal));
                        }
                    }
                } else if (localLocal[6][1] != '') {
                    if (App.game.breeding.eggList[0]().type != -1) {
                        if (App.game.breeding.eggList[0]().steps() < App.game.breeding.eggList[0]().totalSteps) {
                            console.log( 'Waiting for steps - ' + App.game.breeding.eggList[0]().pokemon + ' - Shiny: ' + App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) );
                        }
                        if (App.game.breeding.eggList[0]().steps() >= App.game.breeding.eggList[0]().totalSteps) {
                            console.log( 'Hatching - ' + App.game.breeding.eggList[0]().pokemon + ' - Shiny: ' + App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) );
                            Save.store(player);
                            setTimeout(function(){
                                localLocal[6][1] = App.game.breeding.eggList[0]().pokemon;
                                localStorage.setItem(saveKey, JSON.stringify(localLocal));
                                [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
                                if(App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) != true) {
                                    srCount++;
                                    localLocal[6][2] = srCount;
                                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                                    console.log( 'SR Count: ' + srCount );
                                    location.reload();
                                } else {
                                    console.log( 'Got SR shiny - ' + localLocal[6][1] + ' - SR Count: ' + srCount );
                                    localLocal[6][1] = '';
                                    localLocal[6][2] = 0;
                                    localSettings[2] = 0;
                                    srCount = 0;
                                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                                    localStorage.setItem(settingKey, JSON.stringify(localSettings));
                                    Save.store(player);
                                }
                            }, 1500);
                        }
                    }
                }
            }
            break;
        case "evo":
            var evoUse = Settings.getSetting('evoOpts').observableValue();
            var evoUseCount = Number(Settings.getSetting('evoItemCount').observableValue());
            var evoList = PokemonHelper.getPokemonsWithEvolution(GameConstants.StoneType[evoUse]);
            var evoDone = 0;
            for (let x = 0; x < evoList.length; x++) {
                if (evoList[x].evolutions.length > 1) {
                    for (let y = 0; y < evoList[x].evolutions.length; y++) {
                        if (evoList[x].evolutions[y].stone == GameConstants.StoneType[evoUse]) {
                            if ( App.game.party.alreadyCaughtPokemonByName(evoList[x].evolutions[y].evolvedPokemon, true) != true && evoList[x].evolutions[y].isSatisfied()) {
                                evoDone++;
                            }
                        }
                    }
                } else {
                    if ( App.game.party.alreadyCaughtPokemonByName(evoList[x].evolutions[0].evolvedPokemon, true) != true && evoList[x].evolutions[0].isSatisfied()) {
                        evoDone++;
                    }
                }
            }
            if (evoDone >= 1 ) {
                if (player._itemList[evoUse]() >= 1) {
                    evoLoop:
                    for (let x = 0; x < evoList.length; x++) {
                        for (let y = 0; y < evoList[x].evolutions.length; y++) {
                            if (evoList[x].evolutions[y].stone == GameConstants.StoneType[evoUse]) {
                                if ( App.game.party.alreadyCaughtPokemonByName(evoList[x].evolutions[y].evolvedPokemon, true) != true && evoList[x].evolutions[y].isSatisfied()) {
                                    localLocal[6][1] = evoList[x].evolutions[y].evolvedPokemon;
                                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                                    evoName = evoList[x].evolutions[y].evolvedPokemon;
                                    player.itemList[evoUse](player.itemList[evoUse]() - 1);
                                    ItemHandler.stoneSelected(evoUse);
                                    ItemHandler.pokemonSelected(evoList[x].name);
                                    ItemHandler.amountSelected(evoUseCount);
                                    ItemHandler.useStones();
                                    evoUsed = 1;
                                    break evoLoop;
                                }
                            }
                        }
                    }
                }
            }
            if (evoUsed == 1) {
                if (App.game.party.alreadyCaughtPokemonByName(evoName, true) != true) {
                    srCount++;
                    localLocal[6][2] = srCount;
                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    console.log( '[FAILED] :: ' + evoName + ' :: SR Count: ' + srCount + ' :: Stone: ' + evoUse + ' - Needed: ' + evoDone );
                    location.reload();
                } else {
                    console.log( '[CAUGHT] :: ' + evoName + ' :: SR Count: ' + srCount + ' :: Stone: ' + evoUse + ' - Needed: ' + evoDone );
                    localLocal[6][1] = '';
                    localLocal[6][2] = 0;
                    localSettings[2] = 0;
                    srCount = 0;
                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    localStorage.setItem(settingKey, JSON.stringify(localSettings));
                    evoUsed = 0;
                    evoName = '';
                    Save.store(player);
                }
            }
            break;
        case "fos":
            var fossilSR = Settings.getSetting('fossilOpts').observableValue();
            var fossilDeets = player.mineInventory().find(i => i.name == fossilSR);
            var fossilMon = GameConstants.FossilToPokemon[fossilSR];
            if ( fossilDeets.amount() >= 1 ) {
                if ( App.game.party.alreadyCaughtPokemonByName(fossilMon, true) != true ) {
                    if (App.game.breeding.eggList[0]().type == -1) {
                        Underground.sellMineItem(fossilDeets.id);
                        localLocal[6][1] = fossilMon;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    }
                }
            }
            if (App.game.breeding.eggList[0]().type != -1) {
                if (App.game.breeding.eggList[0]().steps() < App.game.breeding.eggList[0]().totalSteps) {
                    console.log( 'Waiting for steps - ' + App.game.breeding.eggList[0]().pokemon + ' - Shiny: ' + App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) );
                }
                if (App.game.breeding.eggList[0]().steps() >= App.game.breeding.eggList[0]().totalSteps) {
                    console.log( 'Hatching - ' + App.game.breeding.eggList[0]().pokemon + ' - Shiny: ' + App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) );
                    Save.store(player);
                    setTimeout(function(){
                        localLocal[6][1] = App.game.breeding.eggList[0]().pokemon;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
                        [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
                        if(App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) != true) {
                            srCount++;
                            localLocal[6][2] = srCount;
                            localStorage.setItem(saveKey, JSON.stringify(localLocal));
                            console.log( 'SR Count: ' + srCount );
                            location.reload();
                        } else {
                            console.log( 'Got SR shiny - ' + localLocal[6][1] + ' - SR Count: ' + srCount );
                            localLocal[6][1] = '';
                            localLocal[6][2] = 0;
                            localSettings[2] = 0;
                            srCount = 0;
                            localStorage.setItem(saveKey, JSON.stringify(localLocal));
                            localStorage.setItem(settingKey, JSON.stringify(localSettings));
                            Save.store(player);
                        }
                    }, 1500);
                }
            }
            break;
        case "poke":
            var shopA = player.town().content;
            for (let x = 0; x < shopA.length; x++) {
                if (shopA[x].constructor.name == 'Shop') {
                    for (let y = 0; y < shopA[x].items.length; y++) {
                        if (shopA[x].items[y].constructor.name == 'PokemonItem') {
                            var sSName = shopA[x];
                        }
                    }
                }
            }
            ShopHandler.showShop(sSName);
            var smnList = ShopHandler.shopObservable().items;
            var smnNeed = 0;
            for (let x = 0; x < smnList.length; x++) {
                if (smnList[x].imageDirectory == 'pokemonItem' && App.game.party.alreadyCaughtPokemonByName(smnList[x].name, true) != true) {
                    smnNeed++;
                }
            }
            if (smnNeed >= 1 ) {
                for (let x = 0; x < smnList.length; x++) {
                    if (smnList[x].imageDirectory == 'pokemonItem' &&  App.game.party.alreadyCaughtPokemonByName(smnList[x].name, true) != true) {
                        if (App.game.wallet.currencies[ShopHandler.shopObservable().items[x].currency]() >= ShopHandler.shopObservable().items[x].price()) {
                            smnName = smnList[x].name;
                            ShopHandler.shopObservable().items[x].buy(1);
                            smnUsed = 1;
                            break;
                        }
                    }
                }
            }
            if (smnUsed == 1) {
                if (App.game.party.alreadyCaughtPokemonByName(smnName, true) != true) {
                    srCount++;
                    localLocal[6][2] = srCount;
                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    console.log( '[FAILED] :: ' + smnName + ' :: SR Count: ' + srCount + ' :: Needed: ' + smnNeed );
                    location.reload();
                } else {
                    smnNeed = smnNeed - 1;
                    console.log( '[CAUGHT] :: ' + smnName + ' :: SR Count: ' + srCount + ' :: Needed: ' + smnNeed );
                    localLocal[6][1] = '';
                    localLocal[6][2] = 0;
                    localSettings[2] = 0;
                    srCount = 0;
                    localStorage.setItem(saveKey, JSON.stringify(localLocal));
                    localStorage.setItem(settingKey, JSON.stringify(localSettings));
                    smnUsed = 0;
                    smnName = '';
                    Save.store(player);
                }
            }
            break;
        case "egg":
            if (document.querySelector("#breeding-filter > div.form-group.col-md-6.col-6 > input").value == ""){
                document.querySelector("#breeding-filter > div.form-group.col-md-6.col-6 > input").value = localSettings[3];
                BreedingFilters.search.value(new RegExp((document.querySelector("#breeding-filter > div.form-group.col-md-6.col-6 > input").value), 'i'));
            }
            if(document.querySelector("#breeding-filter > div.form-group.col-md-6.col-6 > input").value !== ""){
                localSettings[3] = document.querySelector("#breeding-filter > div.form-group.col-md-6.col-6 > input").value;
                localStorage.setItem(settingKey, JSON.stringify(localSettings));
            }
            PartyController.hatcherySortedList = [...App.game.party.caughtPokemon];
            var sortededHatcheryList = PartyController.hatcherySortedList.sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue()));
            var filteredEggList = sortededHatcheryList.filter( (partyPokemon) => {
                if (partyPokemon.breeding || partyPokemon.level < 100) {
                    return false;
                }
                if (BreedingFilters.category.value() >= 0) {
                    if (partyPokemon.category !== BreedingFilters.category.value()) {
                        return false;
                    }
                }
                if (BreedingFilters.shinyStatus.value() == 0) {
                    if (+partyPokemon.shiny !== BreedingFilters.shinyStatus.value()) {
                        return false;
                    }
                }
                if (BreedingFilters.region.value() > -2) {
                    if (PokemonHelper.calcNativeRegion(partyPokemon.name) !== BreedingFilters.region.value()) {
                        return false;
                    }
                }
                if(localSettings[3] == ""){
                    if (!BreedingFilters.search.value().test(partyPokemon.name)) {
                        return false;
                    }
                }
                else{
                    if (BreedingFilters.search.value().test(partyPokemon.name)) {
                        return false;
                    }
                }
                const type1 = BreedingFilters.type1.value() > -2 ? BreedingFilters.type1.value() : null;
                const type2 = BreedingFilters.type2.value() > -2 ? BreedingFilters.type2.value() : null;
                if (type1 !== null || type2 !== null) {
                    const { type: types } = pokemonMap[partyPokemon.name];
                    if ([type1, type2].includes(PokemonType.None)) {
                        const type = type1 == PokemonType.None ? type2 : type1;
                        if (!BreedingController.isPureType(partyPokemon, type)) {
                            return false;
                        }
                    } else if ((type1 !== null && !types.includes(type1)) || (type2 !== null && !types.includes(type2))) {
                        return false;
                    }
                }
                return true;
            });
            if(filteredEggList.length > 0){
                if(App.game.breeding.eggList[0]().type == -1){
                    App.game.breeding.addPokemonToHatchery(filteredEggList[0]);
                }
                localLocal[6][1] = App.game.breeding.eggList[0]().pokemon;
                localStorage.setItem(saveKey, JSON.stringify(localLocal));
            }

            if (localLocal[6][1] != '' && localLocal[6][1] != "MissingNo." && App.game.breeding.eggList[0]().type != -1) {
                if (App.game.breeding.eggList[0]().steps() < App.game.breeding.eggList[0]().totalSteps) {
                    console.log( 'Waiting for steps - ' + App.game.breeding.eggList[0]().pokemon + ' - Shiny: ' + App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) );
                }
                if (App.game.breeding.eggList[0]().steps() >= App.game.breeding.eggList[0]().totalSteps) {
                    console.log( 'Hatching - ' + App.game.breeding.eggList[0]().pokemon + ' - Shiny: ' + App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) );
                    Save.store(player);
                    setTimeout(function(){
                        localLocal[6][1] = App.game.breeding.eggList[0]().pokemon;
                        localStorage.setItem(saveKey, JSON.stringify(localLocal));
                        [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
                        if(App.game.party.alreadyCaughtPokemonByName(localLocal[6][1], true) != true) {
                            srCount++;
                            localLocal[6][2] = srCount;
                            localStorage.setItem(saveKey, JSON.stringify(localLocal));
                            console.log( 'SR Count: ' + srCount );
                            location.reload();
                        } else {
                            console.log( 'Got SR shiny - ' + localLocal[6][1] + ' - SR Count: ' + srCount );
                            localLocal[6][1] = '';
                            localLocal[6][2] = 0;
                            localSettings[2] = 0;
                            srCount = 0;
                            localStorage.setItem(saveKey, JSON.stringify(localLocal));
                            localStorage.setItem(settingKey, JSON.stringify(localSettings));
                            Save.store(player);
                        }
                    }, 1500);
                }
            }
            break;
    }
}

async function plantBot() {
    var selectedBerry = Settings.getSetting('botstate.plant').value;
    var berryId = BerryType[selectedBerry];
    
    if (berryId >= 0 && App.game.farming.unlockedBerries[berryId]()) {
        if (App.game.farming.plotList[12].isEmpty() == true){
            if (App.game.farming.berryList[berryId]() > 1) {
                if (App.game.farming.plotList[12].isEmpty() == true) {
                    FarmController.selectedBerry(berryId);
                    App.game.farming.plantAll(FarmController.selectedBerry());
                } else if (App.game.farming.plotList[12].age > App.game.farming.berryData[b].growthTime[3]) {
                    App.game.farming.harvestAll();
                }
            }
        } else if (App.game.farming.plotList[12].age > App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[3]) {
            App.game.farming.harvestAll();
        }
    } else if ( selectedBerry > 65 ) {
        switch(selectedBerry) {
            case 'S+C':
                //Starf 65 + Chople 40
                if (App.game.farming.plotList[5].berry == -1) {
                    App.game.farming.plant(5,65)
                    App.game.farming.plant(6,65)
                    App.game.farming.plant(7,65)
                    App.game.farming.plant(8,65)
                    App.game.farming.plant(9,65)
                    App.game.farming.plant(15,65)
                    App.game.farming.plant(16,65)
                    App.game.farming.plant(17,65)
                    App.game.farming.plant(18,65)
                    App.game.farming.plant(19,65)

                    setTimeout(() => {
                        App.game.farming.plant(0,40);
                        App.game.farming.plant(1,40);
                        App.game.farming.plant(2,40);
                        App.game.farming.plant(3,40);
                        App.game.farming.plant(4,40);
                        App.game.farming.plant(10,40);
                        App.game.farming.plant(11,40);
                        App.game.farming.plant(12,40);
                        App.game.farming.plant(13,40);
                        App.game.farming.plant(14,40);
                        App.game.farming.plant(20,40);
                        App.game.farming.plant(21,40);
                        App.game.farming.plant(22,40);
                        App.game.farming.plant(23,40);
                        App.game.farming.plant(24,40);
                    }, 50400000);
                }
                if (App.game.farming.plotList[5].age >= 50400){
                    if (App.game.farming.plotList[0].age >= 71940){
                        App.game.farming.harvestAll();
                    }
                }
                break;
            case 'S+C+P':
                //Starf 65 + Chople 40 + Petaya 62
                if (App.game.farming.plotList[5].berry == -1) {
                    App.game.farming.plant(5,65);
                    App.game.farming.plant(6,65);
                    App.game.farming.plant(7,62);
                    App.game.farming.plant(8,65);
                    App.game.farming.plant(9,65);
                    App.game.farming.plant(15,65);
                    App.game.farming.plant(16,65);
                    App.game.farming.plant(17,65);
                    App.game.farming.plant(18,65);
                    App.game.farming.plant(19,65);
                    setTimeout(() => {
                        App.game.farming.plant(0,40);
                        App.game.farming.plant(1,40);
                        App.game.farming.plant(2,40);
                        App.game.farming.plant(3,40);
                        App.game.farming.plant(4,40);
                        App.game.farming.plant(10,40);
                        App.game.farming.plant(11,40);
                        App.game.farming.plant(12,40);
                        App.game.farming.plant(13,40);
                        App.game.farming.plant(14,40);
                        App.game.farming.plant(20,40);
                        App.game.farming.plant(21,40);
                        App.game.farming.plant(22,40);
                        App.game.farming.plant(23,40);
                        App.game.farming.plant(24,40);
                    }, 50400000);
                }
                if (App.game.farming.plotList[5].age >= 50400){
                    if (App.game.farming.plotList[7].age >= 345600){
                        App.game.farming.harvest(7);
                        App.game.farming.plant(7,62);
                    }
                }
                break;
            case 'S+L':
                //Starf 65 + Lum 19
                if (App.game.farming.plotList[5].berry == -1) {
                    [0,1,2,3,4,5,7,9,10,11,12,13,14,15,17,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,65));
                    setTimeout(() => {
                        [6,8,16,18].forEach(item => App.game.farming.plant(item,19));
                    }, 82800000);
                }
                if (App.game.farming.plotList[6].age >= 41400){
                    if (App.game.farming.plotList[0].age >= 343800){
                        App.game.farming.harvestAll();
                    }
                }
                break;
            case 'S+L+P':
                //Starf 65 + Lum 19 + Petaya 62
                if(App.game.farming.plotList[17].berry == 62 && App.game.farming.plotList[17].age < 90000 && App.game.farming.plotList[17].age >= 86400 && App.game.farming.plotList[7].berry == 62 && App.game.farming.plotList[7].age >= 340000){
                    App.game.farming.harvest(7);
                    App.game.farming.plant(7,65);
                }
                else if(App.game.farming.plotList[7].berry == 62 && App.game.farming.plotList[7].age < 90000 && App.game.farming.plotList[7].age >= 86400 && App.game.farming.plotList[17].berry == 62 && App.game.farming.plotList[17].age >= 340000){
                    App.game.farming.harvest(17);
                    App.game.farming.plant(17,65);
                }
                else if(App.game.farming.plotList[17].age >= 340000){
                    App.game.farming.harvest(7);
                    App.game.farming.plant(7,62);
                }
                else if(App.game.farming.plotList[7].age >= 340000){
                    App.game.farming.harvest(17);
                    App.game.farming.plant(17,62);
                }
                break;
            case 'S+L+C':
                //Starf 65 + Lum 19 + Chople 40
                break;
            case 'S+L+C+P':
                //Starf 65 + Lum 19 + Chople 40 + Petaya 62
        }
    }
}

async function mutateBot() {
    var selectedBerry = Settings.getSetting('botstate.mutate').value;

    switch (selectedBerry) {
        case "Persim":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,6);
                setTimeout(() => {
                    App.game.farming.plant(6,2);
                }, 240000);
            }
            if (App.game.farming.plotList[12].berry == 6) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 8) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].berry != -1) {
                if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                    App.game.farming.harvestAll();
                }
            }
            break;
        case "Razz":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,5);
                setTimeout(() => {
                    App.game.farming.plant(6,0);
                }, 210000);
            }
            if (App.game.farming.plotList[12].berry == 5) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 9) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Bluk":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,5);
                setTimeout(() => {
                    App.game.farming.plant(6,1);
                }, 200000);
            }
            if (App.game.farming.plotList[12].berry == 5) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 10) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Nanab":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,4);
                setTimeout(() => {
                    App.game.farming.plant(6,2);
                }, 60000);
            }
            if (App.game.farming.plotList[12].berry == 4) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 11) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Wepear":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,6);
                setTimeout(() => {
                    App.game.farming.plant(6,3);
                }, 220000);
            }
            if (App.game.farming.plotList[12].berry == 6) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 12) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Pinap":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,7);
                setTimeout(() => {
                    App.game.farming.plant(12,4);
                }, 480000);
            }
            if (App.game.farming.plotList[6].berry == 7) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 13) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Figy":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(7,0);
                App.game.farming.plant(11,0);
                App.game.farming.plant(12,0);
            }
            if (App.game.farming.plotList[12].berry == 0) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 14) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Wiki":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(7,1);
                App.game.farming.plant(11,1);
                App.game.farming.plant(12,1);
            }
            if (App.game.farming.plotList[12].berry == 1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 15) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Mago":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(7,2);
                App.game.farming.plant(11,2);
                App.game.farming.plant(12,2);
            }
            if (App.game.farming.plotList[12].berry == 2) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 16) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Aguav":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(7,3);
                App.game.farming.plant(11,3);
                App.game.farming.plant(12,3);
            }
            if (App.game.farming.plotList[12].berry == 3) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 17) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Iapapa":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(7,4);
                App.game.farming.plant(11,4);
                App.game.farming.plant(12,4);
            }
            if (App.game.farming.plotList[12].berry == 4) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 18) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Lum":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,7);
                setTimeout(() => {
                    App.game.farming.plant(7,6);
                }, 300000);
                setTimeout(() => {
                    App.game.farming.plant(11,5);
                }, 360000);
                setTimeout(() => {
                    App.game.farming.plant(8,4);
                }, 480000);
                setTimeout(() => {
                    App.game.farming.plant(16,3);
                }, 520000);
                setTimeout(() => {
                    App.game.farming.plant(13,2);
                }, 540000);
                setTimeout(() => {
                    App.game.farming.plant(17,1);
                }, 560000);
                setTimeout(() => {
                    App.game.farming.plant(18,0);
                }, 570000);
            }
            if (App.game.farming.plotList[6].berry == 7) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 19) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[18].age > (App.game.farming.berryData[App.game.farming.plotList[18].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        // 3x3 throigh Grepa, then 5x5
        case "Pomeg":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,18);
                setTimeout(() => {
                    App.game.farming.plant(6,16);
                }, 10000);
            }
            if (App.game.farming.plotList[12].berry == 18) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 20) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Kelpsy":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,8);
                setTimeout(() => {
                    App.game.farming.plant(6,1);
                }, 50000);
            }
            if (App.game.farming.plotList[12].berry == 8) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 21) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Qualot":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,16);
                setTimeout(() => {
                    App.game.farming.plant(6,13);
                }, 130000);
            }
            if (App.game.farming.plotList[12].berry == 16) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 22) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Hondew":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,15);
                setTimeout(() => {
                    App.game.farming.plant(13,17);
                    App.game.farming.plant(8,14);
                }, 10000);
            }
            if (App.game.farming.plotList[12].berry == 15) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 23) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[13].age > (App.game.farming.berryData[App.game.farming.plotList[13].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Grepa":
            if (App.game.farming.plotList[12].berry == -1) {
                App.game.farming.plant(12,17);
                App.game.farming.plant(6,14);
            }
            if (App.game.farming.plotList[12].berry == 17) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 24) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Tamato":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,20);
                App.game.farming.plant(9,20);
                App.game.farming.plant(21,20);
                App.game.farming.plant(24,20);
                setTimeout(function(){
                    [0,1,2,3,4,5,7,8,10,11,12,13,14,15,16,17,18,19,20,22,23].forEach(item => App.game.farming.plant(item,9));
                }, 5150000);
            }
            if (App.game.farming.plotList[6].berry == 20) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 25) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[12].age > (App.game.farming.berryData[App.game.farming.plotList[12].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Cornn":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,15);
                App.game.farming.plant(9,15);
                App.game.farming.plant(21,15);
                App.game.farming.plant(24,15);
                setTimeout(function(){
                    App.game.farming.plant(5,10);
                    App.game.farming.plant(8,10);
                    App.game.farming.plant(20,10);
                    App.game.farming.plant(23,10);
                }, 30000);
                setTimeout(function(){
                    App.game.farming.plant(1,5);
                    App.game.farming.plant(4,5);
                    App.game.farming.plant(16,5);
                    App.game.farming.plant(19,5);
                }, 120000);
            }
            if (App.game.farming.plotList[6].berry == 15) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 26) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[1].age > (App.game.farming.berryData[App.game.farming.plotList[1].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Magost":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,16);
                App.game.farming.plant(9,16);
                App.game.farming.plant(21,16);
                App.game.farming.plant(24,16);
                setTimeout(function(){
                    App.game.farming.plant(5,11);
                    App.game.farming.plant(8,11);
                    App.game.farming.plant(20,11);
                    App.game.farming.plant(23,11);
                }, 120000);
                setTimeout(function(){
                    App.game.farming.plant(1,2);
                    App.game.farming.plant(4,2);
                    App.game.farming.plant(16,2);
                    App.game.farming.plant(19,2);
                }, 310000);
            }
            if (App.game.farming.plotList[6].berry == 16) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 27) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[1].age > (App.game.farming.berryData[App.game.farming.plotList[1].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Rabuta":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,17);
                App.game.farming.plant(9,17);
                App.game.farming.plant(21,17);
                App.game.farming.plant(24,17);
                setTimeout(function(){
                    [0,1,2,3,4,5,7,8,10,11,12,13,14,15,16,17,18,19,20,22,23].forEach(item => App.game.farming.plant(item,4));
                }, 230000);
            }
            if (App.game.farming.plotList[6].berry == 17) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 28) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[1].age > (App.game.farming.berryData[App.game.farming.plotList[1].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Nomel":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,13);
                App.game.farming.plant(9,13);
                App.game.farming.plant(21,13);
                App.game.farming.plant(24,13);
            }
            if (App.game.farming.plotList[6].berry == 13) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 29) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Spelon":
            if (App.game.farming.plotList[6].berry == -1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,25);
                }
            }
            if (App.game.farming.plotList[6].berry == 25) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 30) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Pamtre":
            if (App.game.farming.plotList[6].berry == -1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,26);
                }
            }
            if (App.game.farming.plotList[6].berry == 26) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 31) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Watmel":
            if (App.game.farming.plotList[6].berry == -1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,27);
                }
            }
            if (App.game.farming.plotList[6].berry == 27) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 32) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Durin":
            if (App.game.farming.plotList[6].berry == -1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,28);
                }
            }
            if (App.game.farming.plotList[6].berry == 28) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 33) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Belue":
            if (App.game.farming.plotList[6].berry == -1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,29);
                }
            }
            if (App.game.farming.plotList[6].berry == 29) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 34) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Occa":
            if (App.game.farming.plotList[5].berry == -1) {
                App.game.farming.plant(5,30);
                App.game.farming.plant(9,30);
                App.game.farming.plant(22,30);
                setTimeout(function(){
                    App.game.farming.plant(0,25);
                    App.game.farming.plant(4,25);
                    App.game.farming.plant(17,25);
                }, 6840000);
                setTimeout(function(){
                    App.game.farming.plant(2,14);
                    App.game.farming.plant(15,14);
                    App.game.farming.plant(19,14);
                }, 15130000);
                setTimeout(function(){
                    App.game.farming.plant(7,9);
                    App.game.farming.plant(20,9);
                    App.game.farming.plant(24,9);
                }, 15230000);
            }
            if (App.game.farming.plotList[5].berry == 30) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 35) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[7].age > (App.game.farming.berryData[App.game.farming.plotList[7].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Passho":
            if (App.game.farming.plotList[7].berry == -1) {
                App.game.farming.plant(7,43);
                App.game.farming.plant(20,43);
                App.game.farming.plant(24,43);
                setTimeout(function(){
                    App.game.farming.plant(2,21);
                    App.game.farming.plant(15,21);
                    App.game.farming.plant(19,21);
                }, 13800000);
                setTimeout(function(){
                    App.game.farming.plant(0,6);
                    App.game.farming.plant(4,6);
                    App.game.farming.plant(17,6);
                }, 19500000);
                setTimeout(function(){
                    App.game.farming.plant(5,1);
                    App.game.farming.plant(9,1);
                    App.game.farming.plant(22,1);
                }, 19760000);
            }
            if (App.game.farming.plotList[7].berry == 30) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 36) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[5].age > (App.game.farming.berryData[App.game.farming.plotList[5].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Wacan":
            if (App.game.farming.plotList[7].berry == -1) {
                App.game.farming.plant(7,24);
                App.game.farming.plant(20,24);
                App.game.farming.plant(24,24);
                setTimeout(function(){
                    App.game.farming.plant(5,22);
                    App.game.farming.plant(9,22);
                    App.game.farming.plant(22,22);
                }, 2400000);
                setTimeout(function(){
                    App.game.farming.plant(0,18);
                    App.game.farming.plant(4,18);
                    App.game.farming.plant(17,18);
                }, 6820000);
                setTimeout(function(){
                    App.game.farming.plant(2,13);
                    App.game.farming.plant(15,13);
                    App.game.farming.plant(19,13);
                }, 6960000);
            }
            if (App.game.farming.plotList[7].berry == 24) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 37) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[2].age > (App.game.farming.berryData[App.game.farming.plotList[2].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Rindo":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,17);
                App.game.farming.plant(9,17);
                App.game.farming.plant(21,17);
                App.game.farming.plant(24,17);
                App.game.farming.plant(0,14);
                App.game.farming.plant(3,14);
                App.game.farming.plant(15,14);
                App.game.farming.plant(18,14);
            }
            if (App.game.farming.plotList[6].berry == 17) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 38) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Yache":
            if (App.game.farming.plotList[0].berry == -1) {
                App.game.farming.plant(0,36);
                App.game.farming.plant(2,36);
                App.game.farming.plant(4,36);
                App.game.farming.plant(10,36);
                App.game.farming.plant(12,36);
                App.game.farming.plant(14,36);
                App.game.farming.plant(20,36);
                App.game.farming.plant(22,36);
                App.game.farming.plant(24,36);
            }
            if (App.game.farming.plotList[0].berry == 36) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 39) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Chople":
            if (App.game.farming.plotList[0].berry == -1 && OakItem["Blaze_Cassette"].isActive == true) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,30);
                }
            }
            if (App.game.farming.plotList[0].berry == 30) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 40) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Kebia":
            if (App.game.farming.plotList[0].berry == -1 && OakItem["Poison_Barb"].isActive == true) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,31);
                }
            }
            if (App.game.farming.plotList[0].berry == 31) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 41) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Shuca":
            if (App.game.farming.plotList[0].berry == -1 && OakItem["Sprinklotad"].isActive == true) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,32);
                }
            }
            if (App.game.farming.plotList[0].berry == 32) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 42) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Coba":
            if (App.game.farming.plotList[0].berry == -1) {
                App.game.farming.plant(0,15);
                App.game.farming.plant(3,15);
                App.game.farming.plant(15,15);
                App.game.farming.plant(18,15);
                setTimeout(function(){
                    App.game.farming.plant(6,17);
                    App.game.farming.plant(9,17);
                    App.game.farming.plant(21,17);
                    App.game.farming.plant(24,17);
                }, 10000);
            }
            if (App.game.farming.plotList[0].berry == 15) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 43) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[6].age > (App.game.farming.berryData[App.game.farming.plotList[6].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Payapa":
            if (App.game.farming.plotList[7].berry == -1) {
                App.game.farming.plant(7,31);
                App.game.farming.plant(20,31);
                App.game.farming.plant(24,31);
                setTimeout(function(){
                    App.game.farming.plant(2,26);
                    App.game.farming.plant(15,26);
                    App.game.farming.plant(19,26);
                }, 9000000);
                setTimeout(function(){
                    App.game.farming.plant(0,15);
                    App.game.farming.plant(4,15);
                    App.game.farming.plant(17,15);
                }, 17640000);
                setTimeout(function(){
                    App.game.farming.plant(5,10);
                    App.game.farming.plant(9,10);
                    App.game.farming.plant(22,10);
                }, 17670000);
            }
            if (App.game.farming.plotList[7].berry == 31) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 44) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[5].age > (App.game.farming.berryData[App.game.farming.plotList[5].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Tanga":
            if (App.game.farming.plotList[0].berry == -1) {
                [0,1,2,3,4,5,7,9,10,11,12,13,14,15,17,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,38));
            }
            if (App.game.farming.plotList[0].berry == 38) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 45) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Charti":
            if (App.game.farming.plotList[0].berry == -1 && OakItem["Cell_Battery"].isActive == true) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,26);
                }
            }
            if (App.game.farming.plotList[0].berry == 26) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 46) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Kasib":
            if (App.game.farming.plotList[0].berry == -1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,0);
                }
            }
            if (App.game.farming.plotList[0].berry == 26) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 47) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            break;
        case "Haban":
            if (App.game.farming.plotList[1].berry == -1) {
                App.game.farming.plant(1,38);
                App.game.farming.plant(9,38);
                App.game.farming.plant(15,38);
                App.game.farming.plant(23,38);
                setTimeout(function(){
                    App.game.farming.plant(12,35);
                }, 6840000);
                setTimeout(function(){
                    App.game.farming.plant(3,36);
                    App.game.farming.plant(5,36);
                    App.game.farming.plant(19,36);
                    App.game.farming.plant(21,36);
                }, 7200000);
                setTimeout(function(){
                    App.game.farming.plant(2,37);
                    App.game.farming.plant(10,37);
                    App.game.farming.plant(14,37);
                    App.game.farming.plant(22,37);
                }, 27000000);
            }
            if (App.game.farming.plotList[1].berry == 38) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 48) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[2].age > (App.game.farming.berryData[App.game.farming.plotList[2].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Colbur":
            if (App.game.farming.plotList[6].berry == -1) {
                App.game.farming.plant(6,44);
                App.game.farming.plant(9,44);
                App.game.farming.plant(21,44);
                App.game.farming.plant(24,44);
                setTimeout(function(){
                    App.game.farming.plant(1,28);
                    App.game.farming.plant(4,28);
                    App.game.farming.plant(16,28);
                    App.game.farming.plant(19,28);
                }, 21960000);
                setTimeout(function(){
                    App.game.farming.plant(5,47);
                    App.game.farming.plant(8,47);
                    App.game.farming.plant(20,47);
                    App.game.farming.plant(23,47);
                }, 33900000);
            }
            if (App.game.farming.plotList[6].berry == 44) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 49) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[1].age > (App.game.farming.berryData[App.game.farming.plotList[1].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Babiri":
            if (App.game.farming.plotList[0].berry == -1) {
                [0,1,2,3,4,7,17,20,21,22,23,24].forEach(item => App.game.farming.plant(item,42));
                setTimeout(function(){
                    [5,9,10,11,12,13,14,15,19].forEach(item => App.game.farming.plant(item,47));
                }, 1800000);
            }
            if (App.game.farming.plotList[0].berry == 42) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 50) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Chilan":
            if (App.game.farming.plotList[0].berry == -1) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++){
                    App.game.farming.plant(berryIt,40);
                }
            }
            if (App.game.farming.plotList[0].berry == 40) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 51) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Roseli":
            if (App.game.farming.plotList[7].berry == -1) {
                App.game.farming.plant(7,32);
                App.game.farming.plant(20,32);
                App.game.farming.plant(24,32);
                setTimeout(function(){
                    App.game.farming.plant(2,27);
                    App.game.farming.plant(15,27);
                    App.game.farming.plant(19,27);
                }, 2160000);
                setTimeout(function(){
                    App.game.farming.plant(0,16);
                    App.game.farming.plant(4,16);
                    App.game.farming.plant(17,16);
                }, 16190000);
                setTimeout(function(){
                    App.game.farming.plant(5,11);
                    App.game.farming.plant(9,11);
                    App.game.farming.plant(22,11);
                }, 16310000);
            }
            if (App.game.farming.plotList[7].berry == 32) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 52) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[5].age > (App.game.farming.berryData[App.game.farming.plotList[5].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Micle":
            if (App.game.farming.plotList[0].berry == -1) {
                [0,1,2,3,4,5,7,9,10,11,13,14,15,17,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,31));
            }
            if (App.game.farming.plotList[0].berry == 31) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 53) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Custap":
            if (App.game.farming.plotList[0].berry == -1) {
                [0,1,2,3,4,5,7,9,10,11,13,14,15,17,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,32));
            }
            if (App.game.farming.plotList[0].berry == 32) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 54) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Jaboca":
            if (App.game.farming.plotList[0].berry == -1) {
                [0,1,2,3,4,5,7,9,10,11,13,14,15,17,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,33));
            }
            if (App.game.farming.plotList[0].berry == 33) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 55) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Rowap":
            if (App.game.farming.plotList[0].berry == -1) {
                [0,1,2,3,4,5,7,9,10,11,13,14,15,17,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,34));
            }
            if (App.game.farming.plotList[0].berry == 34) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 56) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Kee":
            if (App.game.farming.plotList[0].berry == -1) {
                [0,3,15,18].forEach(item => App.game.farming.plant(item,59));
                [6,9,21,24].forEach(item => App.game.farming.plant(item,60));
            }
            if (App.game.farming.plotList[0].berry == 59) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 57) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Maranga":
            if (App.game.farming.plotList[0].berry == -1) {
                App.game.farming.plant(0,61);
                App.game.farming.plant(3,61);
                App.game.farming.plant(15,61);
                App.game.farming.plant(18,61);
                setTimeout(function(){
                    App.game.farming.plant(6,62);
                    App.game.farming.plant(9,62);
                    App.game.farming.plant(21,62);
                    App.game.farming.plant(24,62);
                }, 86400000);
            }
            if (App.game.farming.plotList[0].berry == 61) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 58) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Liechi":
            if (App.game.farming.plotList[0].berry == -1 && App.game.party.alreadyCaughtPokemonByName("Kyogre") == true) {
                [0,1,2,3,4,5,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,36));
            }
            if (App.game.farming.plotList[0].berry == 36) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 59) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Ganlon":
            if (App.game.farming.plotList[0].berry == -1 && App.game.party.alreadyCaughtPokemonByName("Groudon") == true) {
                [0,1,2,3,4,5,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,42));
            }
            if (App.game.farming.plotList[0].berry == 42) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 60) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Salac":
            if (App.game.farming.plotList[0].berry == -1 && App.game.party.alreadyCaughtPokemonByName("Rayquaza") == true) {
                [0,1,2,3,4,5,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,43));
            }
            if (App.game.farming.plotList[0].berry == 43) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 61) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Petaya":
            if (App.game.farming.plotList[24].berry == -1) {
                App.game.farming.plant(24,48);
                setTimeout(function(){
                    App.game.farming.plant(16,50);
                }, 21600000);
                setTimeout(function(){
                    App.game.farming.plant(14,39);
                }, 43200000);
                setTimeout(function(){
                    App.game.farming.plant(15,42);
                }, 46800000);
                setTimeout(function(){
                    App.game.farming.plant(10,46);
                }, 48600000);
                setTimeout(function(){
                    App.game.farming.plant(21,40);
                }, 50400000);
                setTimeout(function(){
                    App.game.farming.plant(12,44);
                }, 52200000);
                setTimeout(function(){
                    App.game.farming.plant(22,38);
                }, 57600000);
                setTimeout(function(){
                    App.game.farming.plant(4,49);
                }, 59400000);
                setTimeout(function(){
                    App.game.farming.plant(13,36);
                }, 61200000);
                setTimeout(function(){
                    App.game.farming.plant(17,52);
                }, 61200000);
                setTimeout(function(){
                    App.game.farming.plant(0,35);
                }, 64440000);
                setTimeout(function(){
                    App.game.farming.plant(11,43);
                }, 66600000);
                setTimeout(function(){
                    App.game.farming.plant(23,51);
                }, 77400000);
                setTimeout(function(){
                    App.game.farming.plant(18,45);
                }, 79800000);
                setTimeout(function(){
                    App.game.farming.plant(19,37);
                }, 82620000);
                setTimeout(function(){
                    App.game.farming.plant(2,41);
                }, 85800000);
                setTimeout(function(){
                    App.game.farming.plant(20,47);
                }, 86100000);
            }
            if (App.game.farming.plotList[24].berry == 48) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 62) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[19].age > (App.game.farming.berryData[App.game.farming.plotList[19].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Apicot":
            if (App.game.farming.plotList[0].berry == -1 && App.game.party.alreadyCaughtPokemonByName("Palkia") == true) {
                [0,1,2,3,4,5,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,51));
            }
            if (App.game.farming.plotList[0].berry == 51) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 63) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
        case "Lansat":
            if (App.game.farming.plotList[0].berry == -1 && App.game.party.alreadyCaughtPokemonByName("Dialga") == true) {
                [0,1,2,3,4,5,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].forEach(item => App.game.farming.plant(item,52));
            }
            if (App.game.farming.plotList[0].berry == 52) {
                for (let berryIt = 0; berryIt < App.game.farming.plotList.length; berryIt++) {
                    if (App.game.farming.plotList[berryIt].berry == 64) {
                        if (App.game.farming.plotList[berryIt].age > (App.game.farming.berryData[App.game.farming.plotList[berryIt].berry].growthTime[3])) {
                            App.game.farming.harvestAll();
                        }
                    }
                }
            }
            if (App.game.farming.plotList[0].age > (App.game.farming.berryData[App.game.farming.plotList[0].berry].growthTime[4] - 5)) {
                App.game.farming.harvestAll();
            }
            break;
    }
}

async function autoBreed() {
    if (App.game.breeding.hasFreeEggSlot() == true) {
        if(Settings.getSetting('breedingOpts').observableValue() == 'none' || Settings.getSetting('breedingOpts').observableValue() == 'attack'){
            PartyController.hatcherySortedList = [...App.game.party.caughtPokemon];
            let sortededHatcheryList = PartyController.hatcherySortedList.sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue()));
            let filteredEggList = sortededHatcheryList.filter( (partyPokemon) => {
                if (partyPokemon.breeding || partyPokemon.level < 100) {
                    return false;
                }
                if (!BreedingFilters.search.value().test(partyPokemon.name)) {
                    return false;
                }
                if (BreedingFilters.category.value() >= 0) {
                    if (partyPokemon.category !== BreedingFilters.category.value()) {
                        return false;
                    }
                }
                if (BreedingFilters.shinyStatus.value() >= 0) {
                    if (+partyPokemon.shiny !== BreedingFilters.shinyStatus.value()) {
                        return false;
                    }
                }
                if (BreedingFilters.region.value() > -2) {
                    if (PokemonHelper.calcNativeRegion(partyPokemon.name) !== BreedingFilters.region.value()) {
                        return false;
                    }
                }
                const type1 = BreedingFilters.type1.value() > -2 ? BreedingFilters.type1.value() : null;
                const type2 = BreedingFilters.type2.value() > -2 ? BreedingFilters.type2.value() : null;
                if (type1 !== null || type2 !== null) {
                    const { type: types } = pokemonMap[partyPokemon.name];
                    if ([type1, type2].includes(PokemonType.None)) {
                        const type = type1 == PokemonType.None ? type2 : type1;
                        if (!BreedingController.isPureType(partyPokemon, type)) {
                            return false;
                        }
                    } else if ((type1 !== null && !types.includes(type1)) || (type2 !== null && !types.includes(type2))) {
                        return false;
                    }
                }
                if(Settings.getSetting('breedingOpts').observableValue() == 'attack') {
                    var breedAtk = Settings.getSetting('minBreedAttack').observableValue();
                    if (partyPokemon._attack() > breedAtk) {
                        return false;
                    }
                }
                return true;
            });
            [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
            if (filteredEggList[0] != undefined) {
                App.game.breeding.addPokemonToHatchery(filteredEggList[0]);
            }
        } else if(Settings.getSetting('breedingOpts').observableValue() == 'mystery') {
            if (player.itemList["Mystery_egg"]() >= 1) {
                ItemList["Mystery_egg"].use();
            } else {
                Settings.setSettingByName('breedingOpts','none');
                Notifier.notify({
                    title: `[SCRIPT] ACSRQ`,
                    message: `You're out of eggs!`,
                    type: NotificationConstants.NotificationOption.warning,
                    timeout: 5 * GameConstants.SECOND,
                });
            }
            [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
        } else if(Settings.getSetting('breedingOpts').observableValue() == 'typed') {
            var typeEggU = Settings.getSetting('typedEggOpts').observableValue();
            typeEggU = typeEggU.charAt(0).toUpperCase() + typeEggU.slice(1) + '_egg';
            if (player._itemList[typeEggU]() >= 1) {
                ItemList[typeEggU].use();
            } else {
                Settings.setSettingByName('breedingOpts','none');
                Notifier.notify({
                    title: `[SCRIPT] ACSRQ`,
                    message: `You're out of eggs!`,
                    type: NotificationConstants.NotificationOption.warning,
                    timeout: 5 * GameConstants.SECOND,
                });
            }
            [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
        } else if(Settings.getSetting('breedingOpts').observableValue() == 'fossil') {
            var fossilU = Settings.getSetting('fossilOpts').observableValue();
            if (player.mineInventory().find(i => i.name == fossilU).amount() >= 1) {
                Underground.sellMineItem(player.mineInventory().find(i => i.name == fossilU).id);
            } else {
                Settings.setSettingByName('breedingOpts','none');
                Notifier.notify({
                    title: `[SCRIPT] ACSRQ`,
                    message: `You're out of ${fossilU}s!`,
                    type: NotificationConstants.NotificationOption.warning,
                    timeout: 5 * GameConstants.SECOND,
                });
            }
            [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
        }
    } else {
        [3, 2, 1, 0].forEach((index) => App.game.breeding.hatchPokemonEgg(index));
    }
}

async function ballBot() {
    const buyOpts = Settings.getSetting('ballBuyOpts').observableValue();
    const purAmount = Number(Settings.getSetting('ballPurAmount').observableValue());
    const minAmount = Number(Settings.getSetting('minBallAmount').observableValue());

    if (buyOpts == -1 || App.game.pokeballs.pokeballs[buyOpts].quantity() > minAmount)
        return;

    let shop;
    if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Champion Lance')]()) {
        shop = pokeMartShop;
    } else {
        switch (player.region) {
            case GameConstants.Region.kanto:
                shop = [ViridianCityShop, LavenderTownShop, FuchsiaCityShop][buyOpts];
                break;
            case GameConstants.Region.johto:
                shop = [CherrygroveCityShop, GoldenrodDepartmentStoreShop, GoldenrodDepartmentStoreShop][buyOpts];
                break;
            case GameConstants.Region.hoenn:
                shop = [OldaleTownShop, SlateportCityShop, FortreeCityShop][buyOpts];
                break;
            case GameConstants.Region.sinnoh:
                shop = [SandgemTownShop, HearthomeCityShop, DepartmentStoreShop][buyOpts];
                break;
            case GameConstants.Region.unova:
                shop = [FloccesyTownShop, VirbankCityShop, MistraltonCityShop][buyOpts];
                break;
            case GameConstants.Region.kalos:
                shop = [AquacordeTownShop, DepartmentStoreShop, DepartmentStoreShop][buyOpts];
                break;
            case GameConstants.Region.alola:
                shop = [HauoliCityShop, HeaheaCityShop, DepartmentStoreShop][buyOpts];
                break;
        }
    }

    if (shop.isUnlocked() && (!shop.parent || shop.parent?.isUnlocked())) {
        let item = shop.items.find(({name}) => name == GameConstants.Pokeball[buyOpts]);

        if (!(item && item.isAvailable()  && item.price() == item.basePrice)) {
            return;
        }

        ShopHandler.showShop(shop);
        ShopHandler.setSelected(shop.items.indexOf(item));
        ShopHandler.amount(purAmount);

        if (!App.game.wallet.hasAmount(new Amount(item.totalPrice(ShopHandler.amount()), item.currency))) {
            ShopHandler.maxAmount();
        }
        ShopHandler.buyItem();
    }
}
