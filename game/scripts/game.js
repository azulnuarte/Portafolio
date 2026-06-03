const scenes = {

    start: {
        image: "images/1.png",
        title: "The Silent Tower",
        text: "Welcome to the king's castle. You are the royal scribe. Today, you woke up as usual to do your duties, but you notice that there's no one else in the castle—just you... What's going on?",

        choices: [
            {
                text: "Start",
                next: "king"
            }
        ]
    },

    king: {
        image: "images/2.png",
        title: "The scribe",
        text: "Today, like every morning, you wake up early to go to work. You go downstairs to have breakfast with the other servants, but there’s no one there, and breakfast hasn’t been served. Every day you usually go downstairs and find the kitchen bustling with noise, dirty dishes, chatter, laughter, and the delicious smell of hot chocolate, but today it’s not like that… Should I eat something for breakfast or go see where everyone is?",

        choices: [
            {
                text: "Have Breakfast",
                next: "breakfast"
            },

            {
                text: "Look for others",
                next: "argument"
            }
        ]
    },

    argument: {
        image: "images/discusion.png",
        title: "La discusión",
        text: "Las palabras se convierten en acusaciones.",

        choices: [
            {
                text: "Continuar",
                next: "emptyTown"
            }
        ]
    }

};

function loadScene(sceneId){

    const scene = scenes[sceneId];

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

loadScene("start");