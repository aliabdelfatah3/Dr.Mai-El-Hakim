// index.js

const texts = [
  "Brighten Your Smile",
  "Healthy Teeth, Happy Life",
  "Care You Deserve",
];
let index = 0,
  charIndex = 0;
const typedText = document.getElementById("typed-text");

function type() {
  if (charIndex < texts[index].length) {
    typedText.textContent += texts[index][charIndex];
    charIndex++;
    setTimeout(type, 100); // سرعة الكتابة
  } else {
    setTimeout(erase, 2000); // وقت الانتظار قبل المسح
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50); // سرعة المسح
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, 500); // وقت الانتظار قبل النص الجديد
  }
}


document.addEventListener("DOMContentLoaded", () => type());

  