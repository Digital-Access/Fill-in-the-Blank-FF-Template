//NB: Insert * as a placeholder for word positions. In words write the correct words in the correct order.

let text = "Here is a sentence that I *. It means that when I type all I add is a * to fill in the blank and I'm really going to add another * here! You can keep adding as much as you please just remember to add a * where you want a blank.";

const lives = 5;

const lifeImagery = "💖" ; //Use any emoji you like surrounded by quotation marks.

const words = [
    "word1",
    "word2",
    "word3",
    "word4"
];

const config = {
    title: "Fill in the Blank",
    question: "Type the correct words in the blank spaces to make the paragraph below make sense.",
    image: "",
    background: "https://a.storyblok.com/f/117027/3129x2020/51e7d3b0d6/prelogin.png",
    background_color: "#172B49",
    celebration_image: "",
    celebration_text: "Well Done! Click the “Next Video” button to proceed now.",
}

const body = document.querySelector('body');
const proceed = document.getElementById("proceed");
const image = document.getElementById("image");
const title = document.getElementById("title");
const question = document.getElementById("question");
const storyElement = document.getElementById('storyElement');
const mainContainer = document.getElementById('mainContainer');
const submit = document.getElementById('submit');
const newInput = document.createElement("input");
const span = document.createElement("div");
const submitContainer = document.getElementById("submitContainer");
const celebrationContainer = document.getElementById("celebrationContainer");
const celebrationImg = document.getElementById("celebration");
const celebrationText = document.getElementById("thankYou");
const livesContainer = document.getElementById("tries");

title.textContent = config.title;
question.textContent = config.question;
image.src = config.image;
proceed.style.display = 'none';
body.style.backgroundImage = `url(${config.background})`;
body.style.backgroundColor =  config.background_color;
celebrationImg.src = config.celebration_image;
celebrationText.textContent = config.celebration_text;

let i = 0;
words.forEach(element => {
    span.appendChild(newInput);
    newInput.type = "text";
    newInput.className = "input"
    text = text.replace("*", span.innerHTML);
    i++;
})
storyElement.innerHTML = text;

let k = 0;
while( k < lives ){
    k++;
    const newLife = document.createElement("span")
    newLife.textContent = lifeImagery;
    livesContainer.appendChild(newLife);
}



let newArray = []
const checkAnswers = () => {
    newArray = []
    storyElement.childNodes.forEach(element => {
        if (element.nodeName === "INPUT") {
            newArray.push(element.value);
        }
    });

    const newArrayString = JSON.stringify(newArray).toLowerCase();
    const wordArrayString = JSON.stringify(words).toLowerCase();

    if (newArrayString === wordArrayString) {
        submit.textContent = 'Correct!';
        submit.classList.add('correct');
        proceed.style.display = 'block';
    } else {
        submit.textContent = 'Incorrect!';
        submit.classList.add('incorrect');
        livesContainer.firstElementChild.remove()
        if (livesContainer.firstElementChild === null) {
            livesContainer.textContent = "0";
            proceed.style.display = 'block';
        }
        setTimeout(() => {
            submit.textContent = 'Submit';
            submit.classList.remove('incorrect');
        }, 1000);
    }
}
submit.addEventListener('click', checkAnswers)

const endScreen = () => {
    headerContainer.style.display = 'none';
    mainContainer.style.display = 'none';
    submitContainer.style.display = 'none';
    celebrationContainer.style.display = 'flex';
}

proceed.addEventListener('click', endScreen)
