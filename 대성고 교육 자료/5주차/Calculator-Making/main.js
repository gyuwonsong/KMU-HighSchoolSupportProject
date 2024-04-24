// 어떤 버튼이 눌렸는지
const buttons = document.querySelectorAll('button');
// 어떤 연산자가 눌렸는지
const operators = document.querySelectorAll('.operator');
// 디스플레이 값 가져옴
const displayElement = document.querySelector('.input');
// 어떤 숫자가 눌렸는지
const numBtn = document.querySelectorAll('.numBtn');

let operatorOn = ''; // 연산자 입력
let previousNum = ''; // 이전 값
let resentNum = ''; // 최근값

// 연산자 버튼을 눌렀을 때 인자로 받은 첫번째 수와 두번째 수 계산
// calculate 함수 (previousNum, operatorOn, resentNum 인자로 받음)
let calculate = (n1, operator, n2) => {
  let result = 0;
  switch (operator) {
    case '+':
      result = Number(n1) + Number(n2);
      break;
    case '-':
      result = Number(n1) - Number(n2);
      break;
    case 'x':
      result = Number(n1) * Number(n2);
      break;
    case '/':
      result = Number(n1) / Number(n2);
      break;
    default:
      break;
  }
  return String(result);
};

let calculator = () => {
    let isFirstDigit = true;
    // 첫 번째 숫자 여부를 판별하는 변수 (0이 오면 안됨)
  
    buttons.forEach((item) => {
      item.addEventListener('click', (e) => {
        let action = e.target.classList[0];
        let click = e.target.innerHTML;
        
        // A. 연산자가 눌렸을 때에 대한 처리 
        if (action === 'operator') {
          operatorOn = click;
          previousNum = displayElement.textContent;
          displayElement.textContent = '';
          isFirstDigit = true; 
          // 연산자를 누르면 다음 숫자는 첫 번째 숫자가 됨
        }

        // B. 숫자가 눌렸을 때에 대한 처리
        if (action === 'numBtn') {
          // 1. 첫 번째 숫자이고 입력된 값이 0인 경우
          if (isFirstDigit && click === '0') {
            return; // 아무것도 수행하지 않음
          }
  
          // 2. 창이 비어있고, 연산자를 누르지 않았을 때 (한자리)
          if (displayElement.textContent === '' && operatorOn === '') {
            displayElement.textContent = click; // 그대로 표시
            previousNum = displayElement.textContent;
          }

          // 3. 창이 비어있지 않고, 연산자를 누르지 않았을 때 (한자리 이상)
          else if (displayElement.textContent !== '' && operatorOn === '') {
            displayElement.textContent = displayElement.textContent + click;
            // 숫자끼리 결합
            previousNum = displayElement.textContent;
          }
          
          // 4. 창이 비어있고, 연산자를 눌렀을 때 (한자리)
          else if (displayElement.textContent === '' && operatorOn !== '') {
            displayElement.textContent = click;
            resentNum = displayElement.textContent;
          }
          
          // 5. 창이 비어있지 않고, 연산자를 눌렀을 때 (한자리 이상)
          else if (displayElement.textContent !== '' && operatorOn !== '') {
            displayElement.textContent = displayElement.textContent + click;
            resentNum = displayElement.textContent;
          }

          // 첫 번째 숫자 입력 후에는 첫 번째 숫자가 아님을 표시
          isFirstDigit = false; 
        }

        // C. 결과에 대한 처리
        if (action === 'result') {
          // = 눌렀을 때 calculate함수 실행
          displayElement.textContent = calculate(
            previousNum, operatorOn, resentNum);

          // 결과를 표시한 후에는 다음 숫자는 첫 번째 숫자가 됨 
          isFirstDigit = true; 
        }

        // D. 초기화 버튼에 대한 처리
        if (action === 'ac') {
          // C 버튼 눌렀을 때 모든 할당 초기화
          displayElement.textContent = '';
          previousNum = '';
          operatorOn = '';
          resentNum = '';

          // 모든 할당 초기화 후에는 다음 숫자는 첫 번째 숫자가 됨
          isFirstDigit = true; 
        }
      });
    });
  };

// 실행
calculator();