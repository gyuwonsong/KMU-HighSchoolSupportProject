// 사용 변수
const GAME_TIME = 9; // 게임 시간
let score = 0; // 점수
let time = GAME_TIME;
let isPlaying = false; // 게임 실행 여부
let timeInterval; // 시간 차
let checkInterval; // 상태 확인의 주기
let words; // 단어장

const wordInput = document.querySelector('.word-input'); // 사용자가 인풋에 입력하는 값
const wordDisplay = document.querySelector('.word-display'); // 현재 보여지고 있는 단어
const scoreDisplay = document.querySelector('.score'); // 현재 보여지고 있는 점수
const timeDisplay = document.querySelector('.time'); // 현재 보여지고 있는 시간
const button = document.querySelector('.button'); // 버튼 불러옴

// 초기화
init();

function init() {
    getWords();
    wordInput.addEventListener('input',checkMatch);
}

// 단어 불러오기
function getWords() {
    words = ['Grape', 'Banana', 'Apple',  'Cherry'];
    buttonChange("게임 시작");
}

// 단어 일치여부 확인하기
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        // 인풋의 값 (소문자 처리) 한 것과 단어장에 보여지고 있는 단어의 값 (소문자 처리) 같은 경우
        // === 엄격하게 같음을 비교할 때 사용하는 연산자 (값, 타입)
        wordInput.value = ""; // 인풋 초기화

        if(!isPlaying) { // 게임 중이 아니라면? (Time Over) 일치 여부도 확인할 필요 없으므로 return
            return;
        }

        score++; // 점수 증가
        scoreDisplay.innerText = score; // 화면에 보여지는 점수를 업데이트

        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex]; // 랜덤 인덱스를 활용하여 단어장에 보여지는 단어를 업데이트
    }
}

// 게임 실행
function run() { // onclick="run()" 이벤트 리스너 X, 태그에 직접 온클릭 이벤트 걸어서
    if(isPlaying) { // 이미 실행 중이라면 굳이 이 함수를 쓸 필요가 ㄴㄴ
        return;
    }
    isPlaying = true; // 게임의 실행 여부 업데이트
    time = GAME_TIME; // 시간 초기화 (처음으로)
    wordInput.focus(); // 인풋 박스 강조
    scoreDisplay.innerText = 0; // 점수 판을 0으로 업데이트
    timeInterval = setInterval(countDown, 1000); // 시간을 1초만큼 감소 (타이머 킴)
    checkInterval = setInterval(checkStatus, 50); // 게임 실행 상태를 주기적으로 확인 (킴/ 50마이크로세컨드 어쩌구요)
    buttonChange("게임 중"); // 버튼을 게임 중으로 변경 
}

// 타이머
function countDown() {
    if(time > 0) { // 0보다 크다면 -1씩
        time--;
    } else {
        isPlaying = false; // 0보다 크지 않다면 게임이 끝났음을 의미, 게임 실행 상태를 false 로 업데이트
    }

    if(!isPlaying) { // 게임 중이 아니라면 (게임이 끝났다면)
        clearInterval(timeInterval); // 타이머 기능 끔
        wordInput.value = ""; // 인풋 값 초기화
    }
    timeDisplay.innerText =  time; // 게임 중이라면 화면에 보이는 시간을 현재 시간으로 업데이트 
}

// 게임 실행 상태 확인
function checkStatus() {
    if(!isPlaying && time === 0) { // 게임 중이 아니고, 남은 시간도 0 이라면
        buttonChange("게임 시작"); // 게임 시작 버튼 활성화
        clearInterval(checkInterval); // 상태 확인 기능 끔
    }
}

// 버튼 변경
function buttonChange(text) {
    button.innerText = text; // 현재 버튼 내 글자를 함수의 인자로 바꿈

    if(text === "게임 시작") { // 함수의 인자로 들어온 값이 '게임 시작' 이라면
        button.classList.remove('loading') // 버튼이 보라색으로 바뀔 것 (로딩 X)
    } else {
        button.classList.add('loading') // 아니라면 회색으로 바뀔 것 (로딩 O)
    }
}