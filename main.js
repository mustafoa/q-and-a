// Send-telegram
function sendtelegram(message) {
    let telegram_bot_id = "5140293099:AAGqaTJBYGLwDprRPyrbTL_piLg2ZGzZvxM";
    let chat_id = 976376314;
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };
    $.ajax(settings).done(function (response) {
    });
};

let name = prompt(`Enter your name`);
let LocalName = 'inson';

if (localStorage.getItem('LocalLimit')) {
    let nums = parseInt(localStorage.getItem('LocalLimit')) + 1;
    localStorage.setItem('LocalLimit', nums);
} else {
    localStorage.setItem('LocalLimit', 0);
}

if (localStorage.getItem('UserNameAlicoder')) {
    LocalName = localStorage.getItem('UserNameAlicoder');
} else {
    localStorage.setItem('UserNameAlicoder', name);
    LocalName = name;
}

if (name && parseInt(localStorage.getItem('LocalLimit')) <= 10) {
    let answerTrue = 0;
    let count = +prompt(name + ' How many questions would you like?');

    if (isNaN(count) || count > 200) {
        sendtelegram(`${name} (${LocalName})! ${count} Choose a question`);
        alert(name + '! You did not enter a number here, or you entered a number greater than 200! Try again');
    } else {
        sendtelegram(`${name} (${LocalName})! ${count} chose the question`);
        let sum = [];
        let xato = [];

        for (let i = 1; i <= count; i++) {
            let num1 = Math.floor(1 + Math.random() * 12);
            let num2 = Math.floor(1 + Math.random() * 12);
            let answer = +prompt(`${i}-question: ${num1} * ${num2} = ?`);

            if (answer == num1 * num2) {
                document.write(`<strong class = 'trueAnswer'>${i}-question: ${num1} * ${num2} = ${answer}  To'g'ri </strong> <br>`);
                answerTrue++;
                sum.push(`${i}-question: ${num1} * ${num2} = ${answer}  Correct`);
            } else {
                document.write(`<strong class = 'falseAnswer'>${i}-question:  ${num1} * ${num2} = ${answer}  Wrong! <strong class = 'true'>(Correct Answer: ${num1 * num2})</strong> </strong> <br>`);
                // sum.push(`${i}-question: ${num1} * ${num2} = ${answer} xato (${num1 * num2})`);
                xato.push(`${i}-question: ${num1} * ${num2} = ${answer} Wrong (${num1 * num2})`);
            }
        }

        if (answerTrue == count && answerTrue > 0) {
            document.write(`<p class = 'true'> ${name}! ${count} All your answers from the question are correct</p>`);
            sendtelegram(`${name} (${LocalName})! ${count} All answers from this question are correct ${sum}`);
        } else if (answerTrue <= 0 && count > 0) {
            document.write(`<p class = 'false'>${name}! ${count} All your answers from this question are wrong.
                Please try again</p>`);
            sendtelegram(`${name} (${LocalName})! ${count} All your answers from this question are wrong. ${sum}`);
        } else if (count > 0) {
            document.write(`<p class = 'true'>${name}! you have done ${count} from the question </p>`);
            document.write(`<p class = 'true'>Number of correct answers: ${answerTrue} </p>`);
            document.write(`<p class = 'false'>Number of wrong answers: ${count - answerTrue} </p>`);
            sendtelegram(`${name} (${LocalName})! ${count} from the question ${answerTrue} is correct, ${count - answerTrue} error ${sum} ; !!!error!!! what they set : ${xato}`);
        } else {
            alert('Please try again!');
            sendtelegram(`${name} (${LocalName})! ${count} chose the question, but did not do it! ${sum}`);
        }


    }
}
else if (parseInt(localStorage.getItem('LocalLimit')) > 10) {
    sendtelegram(`${name} (${LocalName})! You reached your limit`);
    document.write(`<p class = 'false'>Welcome ${name}!You have reached the limit allocated to you. To increase the limit, call +99899 588-88-98 </p>`);
}