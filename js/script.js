// synonym function
const createElements = (arr)=>{
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then(json => displayLessons(json.data))
};

const removeActive = ()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach(btn=> btn.classList.remove("active"));
}

const loadLevelWord=(id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=> res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    });
};

const loadWordDetails= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

}

const displayWordDetails = (word)=>{
    // console.log(word);
    const detailsBox = document.getElementById("details-container");

    detailsBox.innerHTML = `
        <div>
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class="font-bold">Synonym</h2>
                    <div>${createElements(word.synonyms)}</div>
                </div>
    `;

    document.getElementById("word-modal").showModal();
}

const displayLevelWord=(words)=>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded py-5 space-y-6">

            <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="text-xl text-gray-400 font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl bangla-font">নেক্সট Lesson এ যান</h2>
       </div>
        `;
    }


    words.forEach(word =>{
        const card = document.createElement("div");
        card.innerHTML = `
             <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium bangla-font">"${word.meaning ? word.meaning:"meaning not found"}/${word.pronunciation ? word.pronunciation:"pronunciation not found"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(card);
    })
};

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-containerr");
    levelContainer.innerHTML = "";

    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML=`
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-soft btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);
    }
};



loadLessons();