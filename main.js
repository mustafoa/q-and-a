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

let name = prompt(`Ismizni kiriting`);
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
    let count = +prompt(name + ' nechta savol beraylik?');

    if (isNaN(count) || count > 200) {
        sendtelegram(`${name} (${LocalName})! ${count} ta savolni tanladi`);
        alert(name + '! Siz bu joyda son kiritmadiz, yoki 200 dan kattaroq son kiritdingiz! Qaytadan harakat qiling');
    } else {
        sendtelegram(`${name} (${LocalName})! ${count} ta savolni tanladi`);
        let sum = [];
        let xato = [];

        for (let i = 1; i <= count; i++) {
            let num1 = Math.floor(1 + Math.random() * 12);
            let num2 = Math.floor(1 + Math.random() * 12);
            let answer = +prompt(`${i}-savol: ${num1} * ${num2} = ?`);

            if (answer == num1 * num2) {
                document.write(`<strong class = 'trueAnswer'>${i}-savol: ${num1} * ${num2} = ${answer}  To'g'ri </strong> <br>`);
                answerTrue++;
                sum.push(`${i}-savol: ${num1} * ${num2} = ${answer}  To'g'ri`);
            } else {
                document.write(`<strong class = 'falseAnswer'>${i}-savol:  ${num1} * ${num2} = ${answer}  Xato! <strong class = 'true'>(To'g'ri javob: ${num1 * num2})</strong> </strong> <br>`);
                // sum.push(`${i}-savol: ${num1} * ${num2} = ${answer} xato (${num1 * num2})`);
                xato.push(`${i}-savol: ${num1} * ${num2} = ${answer} xato (${num1 * num2})`);
            }
        }

        if (answerTrue == count && answerTrue > 0) {
            document.write(`<p class = 'true'> ${name}! ${count} ta savoldan barcha javoblaringiz to'g'ri</p>`);
            sendtelegram(`${name} (${LocalName})! ${count} ta savoldan barcha javoblari to'g'ri ${sum}`);
        } else if (answerTrue <= 0 && count > 0) {
            document.write(`<p class = 'false'>${name}! ${count} ta savoldan barcha javoblaringiz noto'g'ri.
                Qaytadan harakat qilib ko'ring</p>`);
            sendtelegram(`${name} (${LocalName})! ${count} ta savoldan barchasi noto'g'ri ${sum}`);
        } else if (count > 0) {
            document.write(`<p class = 'true'>${name}! siz bajargan ${count} ta savoldan </p>`);
            document.write(`<p class = 'true'>To'g'ri javoblar soni: ${answerTrue} ta </p>`);
            document.write(`<p class = 'false'>Noto'g'ri javoblar soni: ${count - answerTrue} ta </p>`);
            sendtelegram(`${name} (${LocalName})! ${count} ta savoldan ${answerTrue} ta to'g'ri, ${count - answerTrue} ta xato ${sum} ; !!!XATO!!! belgilaganlari : ${xato}`);
        } else {
            alert('Iltimos qaytadan harakat qiling!');
            sendtelegram(`${name} (${LocalName})! ${count} ta savolni tanladi, lekin bajarmadi! ${sum}`);
        }


    }
}
else if (parseInt(localStorage.getItem('LocalLimit')) > 10) {
    sendtelegram(`${name} (${LocalName})! Limiti tugadi`);
    document.write(`<p class = 'false'>Xurmatli ${name}!Sizga ajratilgan limit tugadi. <br> Limitni oshirish uchun +99899 588-88-98 raqamiga telefon qiling </p>`);
}