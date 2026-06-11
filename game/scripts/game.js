const scenes = {

    
    start: {
        image: "images/1.png",
        title: "The Silent Tower",
        text: "Welcome to the King's Castle. You are the Royal Scribe. This morning begins like any other... or so you think.",
    
        choices: [
            {
                text: "Begin",
                next: "introMorning"
            }
        ]
    },
    
    introMorning: {
        image: "images/2.png",
        title: "An Empty Morning",
        text: "You wake up and prepare for another day of work.\n\n'The King probably wants another report rewritten,' you sigh.\n\nYou leave your room.\n\nSilence.\n\nNo servants. No guards. No maids.\n\nThe castle is completely quiet.\n\n'Where is everyone?'",
    
        choices: [
            {
                text: "Go to the kitchen",
                next: "kitchen"
            },
            {
                text: "Search the castle",
                next: "castleHall"
            }
        ]
    },
    
    kitchen: {
        image: "images/kitchen.png",
        title: "The Kitchen",
        text: "The ovens are warm but the room is empty.\n\nBreakfast hasn't been served.\n\n'Wonderful. Now I have to cook.'",
    
        choices: [
            {
                text: "Make porridge",
                next: "porridge"
            },
            {
                text: "Cook eggs",
                next: "eggs"
            },
            {
                text: "Skip breakfast",
                next: "castleHall"
            }
        ]
    },
    
    porridge: {
        image: "images/porridge.png",
        title: "A Terrible Breakfast",
        text: "The porridge tastes awful.\n\n'How do the cooks make this edible every day?'\n\nWhile cleaning the bowl, you find a note.\n\n'Check the King's Library.'",
    
        choices: [
            {
                text: "Continue",
                next: "castleHall"
            }
        ]
    },
    
    eggs: {
        image: "images/eggs.png",
        title: "Burnt Breakfast",
        text: "The eggs burn instantly.\n\nSmoke fills the room.\n\nAfter opening every window, you notice something strange.\n\nNot a single dish is dirty.\n\nThe kitchen looks unnaturally perfect.",
    
        choices: [
            {
                text: "Continue",
                next: "castleHall"
            }
        ]
    },
    
    castleHall: {
        image: "images/hall.png",
        title: "The Silent Castle",
        text: "The castle remains empty.\n\nIf answers exist, they must be somewhere inside.",
    
        choices: [
            {
                text: "Servants' Quarters",
                next: "servantsRoom"
            },
            {
                text: "Queen's Chambers",
                next: "queenRoom"
            },
            {
                text: "Prince's Room",
                next: "princeRoom"
            },
            {
                text: "King's Chambers",
                next: "kingRoom"
            },
            {
                text: "Leave for the town",
                next: "townGate"
            }
        ]
    },
    
    servantsRoom: {
        image: "images/servants.png",
        title: "Servants' Quarters",
        text: "The beds are empty.\n\nA diary lies open.\n\n'Her Majesty grows stranger every day...'\n\nThe entry suddenly stops.\n\nWas the Queen involved?\n\nOr is this misleading?",
    
        choices: [
            {
                text: "Return to the hall",
                next: "castleHall"
            }
        ]
    },
    
    queenRoom: {
        image: "images/queen.png",
        title: "The Queen's Chambers",
        text: "The Queen's embroidery sits unfinished.\n\nMost of it contains small mistakes.\n\nBut near the end, every stitch becomes impossibly perfect.\n\nYou run your fingers over the fabric.\n\n'Why would she suddenly change her style?'",
    
        choices: [
            {
                text: "Return to the hall",
                next: "castleHall"
            }
        ]
    },
    
    princeRoom: {
        image: "images/prince.png",
        title: "The Prince's Room",
        text: "The Prince's toys are arranged in perfect rows.\n\nEvery toy sits exactly the same distance apart.\n\nThe Prince was never this organized.\n\nSomething feels wrong.",
    
        choices: [
            {
                text: "Return to the hall",
                next: "castleHall"
            }
        ]
    },
    
    kingRoom: {
        image: "images/kingroom.png",
        title: "The King's Chambers",
        text: "You stop at the doorway.\n\nEverything is perfectly organized.\n\nThe desk.\nThe books.\nThe clothes.\n\n'This isn't right.'\n\nThe King hated organization.\n\nYou spent years trying to convince him to keep things tidy.\n\nOn the desk lies a torn paper.\n\n'I can no longer allow this...'\n\nThe rest is missing.",
    
        choices: [
            {
                text: "Search the library",
                next: "kingLibrary"
            },
            {
                text: "Return to the hall",
                next: "castleHall"
            }
        ]
    },
    
    kingLibrary: {
        image: "images/library.png",
        title: "The King's Library",
        text: "Stacks of books cover every table.\n\nOne collection catches your attention.\n\nNotes written by the King.\n\n'Memories inconsistent.'\n\n'People changing.'\n\n'Reality becoming idealized.'\n\nOne final page reads:\n\n'If I am right, the Royal Scribe must never use the Pen again.'\n\nThe Pen?\n\nWhat Pen?",
    
        choices: [
            {
                text: "Keep reading",
                next: "falseLibraryClue"
            },
            {
                text: "Leave for town",
                next: "townGate"
            }
        ]
    },
    
    falseLibraryClue: {
        image: "images/library2.png",
        title: "A Suspicious Discovery",
        text: "Another document suggests the King planned to destroy the kingdom.\n\nThat seems strange.\n\nCould the King be responsible for all of this?\n\nThe evidence feels convincing... perhaps too convincing.",
    
        choices: [
            {
                text: "The King is guilty",
                next: "townGate"
            },
            {
                text: "Something doesn't add up",
                next: "townGate"
            }
        ]
    },
    
    townGate: {
        image: "images/gate.png",
        title: "The Road to Town",
        text: "You leave the castle.\n\nThe roads are empty.\n\nNo travelers.\nNo merchants.\n\nOnly silence.\n\nAhead lies the town.\n\nPerhaps answers wait there.",
    
        choices: [
            {
                text: "Continue to Chapter 2",
                next: "market"
            }
        ]
    
    
    },

    market: {
        image: "images/market.png",
        title: "The Silent Market",
        text: "The town market is deserted.\n\nEvery stall remains stocked.\n\nApples shine as if they had just been picked.\n\nBread sits on tables without a trace of mold.\n\nNothing has spoiled.\n\nNothing has aged.\n\n'This makes no sense,' you whisper.\n\nThe entire town looks frozen in time.",
        
        
        choices: [
            {
                text: "Visit the Church",
                next: "church"
            },
            {
                text: "Visit Sara's House",
                next: "saraHouse"
            },
            {
                text: "Visit the Blacksmith",
                next: "blacksmith"
            }
        ]
        
        
        },
        
        church: {
        image: "images/church.png",
        title: "The Empty Church",
        text: "The church stands silent.\n\nRows of empty benches face the altar.\n\nOn the pulpit lies an unfinished sermon.\n\n'To be human is to be imperfect.'\n\nThe sentence catches your attention.\n\nSomeone has underlined it several times.",
        
        
        choices: [
            {
                text: "Read further",
                next: "churchClue"
            },
            {
                text: "Leave",
                next: "townHub"
            }
        ]
        
        
        },
        
        churchClue: {
        image: "images/church2.png",
        title: "The Sermon",
        text: "The priest's notes speak of acceptance.\n\nMistakes.\n\nFailure.\n\nGrowth.\n\nOne page has been torn out.\n\nYou cannot shake the feeling that something important is missing.",
        
        
        choices: [
            {
                text: "Continue",
                next: "townHub"
            }
        ]
        
        
        },
        
        blacksmith: {
        image: "images/blacksmith.png",
        title: "The Blacksmith",
        text: "The forge is cold.\n\nNo sign of the blacksmith.\n\nRows of tools hang neatly on the walls.\n\nToo neatly.\n\nEven the most used hammer looks brand new.\n\nNo scratches.\n\nNo wear.\n\nAlmost as if years of use had been erased.",
        
        
        choices: [
            {
                text: "Inspect further",
                next: "blacksmithClue"
            },
            {
                text: "Leave",
                next: "townHub"
            }
        ]
        
        
        },
        
        blacksmithClue: {
        image: "images/tools.png",
        title: "An Impossible Workshop",
        text: "You inspect the tools more closely.\n\nEvery imperfection is gone.\n\nEvery crack repaired.\n\nEvery flaw corrected.\n\nThe word corrected lingers in your mind.",
        
        
        choices: [
            {
                text: "Continue",
                next: "townHub"
            }
        ]
        
        
        },
        
        saraHouse: {
        image: "images/sarahouse.png",
        title: "Sara's House",
        text: "You hesitate before the door.\n\nYou have not seen Sara in years.\n\nStill...\n\nYou remember this place.\n\nThe lavender flowers.\n\nThe old fence.\n\nThe carved bird you gave her when you were children.\n\nEverything is exactly where it should be.\n\nBut Sara is gone.",
        
        
        choices: [
            {
                text: "Enter the house",
                next: "saraInside"
            },
            {
                text: "Leave",
                next: "townHub"
            }
        ]
        
        
        },
        
        saraInside: {
        image: "images/sarahouse2.png",
        title: "Old Memories",
        text: "The house is empty.\n\nOn a shelf sits the wooden bird you carved as a child.\n\nYou smile.\n\n'She actually kept it.'\n\nNearby rests a box filled with old letters.",
        
        
        choices: [
            {
                text: "Read the letters",
                next: "saraLetters"
            },
            {
                text: "Search the house",
                next: "saraClue"
            }
        ]
        
        
        },
        
        saraLetters: {
        image: "images/letters.png",
        title: "Letters From Childhood",
        text: "One letter catches your eye.\n\n'Sometimes I think you want everything to be perfect.'\n\nYou laugh softly.\n\nSara always teased you about that.\n\nAnother letter reads:\n\n'One day you'll rewrite the world if someone gives you enough ink.'\n\nAt the time it was only a joke.",
        
        
        choices: [
            {
                text: "Continue",
                next: "townHub"
            }
        ]
        
        
        },
        
        saraClue: {
        image: "images/desk.png",
        title: "A Strange Note",
        text: "Inside a drawer you find a note.\n\n'If anything happens, don't trust the King.'\n\nNo signature.\n\nNo date.\n\nNo explanation.\n\nThe message feels suspiciously convenient.",
        
        
        choices: [
            {
                text: "The King is suspicious",
                next: "townHub"
            },
            {
                text: "This might be a trap",
                next: "townHub"
            }
        ]
        
        
        },
        
        townHub: {
        image: "images/townsquare.png",
        title: "The Silent Town",
        text: "You stand alone in the town square.\n\nThe mystery has only deepened.\n\nThe King was investigating something.\n\nThe townsfolk vanished.\n\nSara is missing.\n\nAnd everywhere you look, things seem unnaturally perfect.\n\nPerhaps the answer lies back at the castle.",
        
        
        choices: [
            {
                text: "Return to the Castle",
                next: "returnCastle"
            },
            {
                text: "Keep Searching Town",
                next: "market"
            }
        ]
        
        
        },
        
        returnCastle: {
        image: "images/castlenight.png",
        title: "Back to the Castle",
        text: "Night has fallen by the time you return.\n\nThe castle seems even quieter than before.\n\nAs you approach your office, you hear footsteps.\n\nSomeone is there.\n\nSomeone who definitely should not be.",
        
        
        choices: [
            {
                text: "Investigate",
                next: "saraReveal"
            }
        ]
        
        
        },
        
        saraReveal: {
        image: "images/sara.png",
        title: "A Familiar Face",
        text: "A figure steps from the shadows.\n\nFor a moment neither of you speaks.\n\nThen you recognize her.\n\n'Sara?'\n\nShe stares at you.\n\nAlive.\n\nConfused.\n\nAnd just as surprised as you are.",
        
        
        choices: [
            {
                text: "'Sara! You're alive!'",
                next: "friendlySara"
            },
            {
                text: "'What are you doing here?'",
                next: "neutralSara"
            },
            {
                text: "'Did you do this?'",
                next: "hostileSara"
            }
        ]
        
        
        },
        
function loadScene(sceneId) {

    const scene = scenes[sceneId];

    // Evita errores si la escena no existe
    if (!scene) {
        alert(`La escena "${sceneId}" no existe.`);
        return;
    }

    // Guardar progreso automáticamente
    localStorage.setItem("currentScene", sceneId);

    document.getElementById("scene-image").src =
        scene.image;

    document.getElementById("scene-title").textContent =
        scene.title;

    document.getElementById("scene-text").textContent =
        scene.text;

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    scene.choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.textContent =
            choice.text;

        button.onclick = () =>
            loadScene(choice.next);

        choices.appendChild(button);
    });
}

// Reiniciar partida
function resetGame() {
    localStorage.removeItem("currentScene");
    loadScene("start");
}

// Cargar progreso guardado
const savedScene =
    localStorage.getItem("currentScene");

loadScene(savedScene || "start");