export function brailleFromDots(dots: boolean[]): string {
  let code = 0x2800;
  dots.forEach((on, i) => {
    if (on) code += 1 << i;
  });
  return String.fromCharCode(code);
}

export function transrateBraille(brailleText: string): string {
  const transratedText: string[] = [];
  const UNKNOWN = '[?]';
  let isNumMode = false;
  let isAlphabetMode = false;
  let isQuoteMode = false;
  let isUpperMode = false;
  let isTempUpperMode = false;

  function startNumMode() {
    isAlphabetMode = false;
    isNumMode = true;
  }

  function startAlphabetMode() {
    isAlphabetMode = true;
    isNumMode = false;
  }

  function startQuoteMode() {
    isQuoteMode = true;
    isNumMode = false;
  }

  function endMode() {
    isAlphabetMode = false;
    isNumMode = false;
    isTempUpperMode = false;
    if(!isQuoteMode) isUpperMode = false;
  }

  function endQuoteMode() {
    isQuoteMode = false;
    isUpperMode = false;
  }

  for (let i = 0; i < brailleText.length; i++) {
    let c = brailleText.charAt(i);

    // 数字符
    if(c == '⠼'){
      startNumMode();
      continue;
    }

    // 外国語引用符
    if(c == '⠦' && !isQuoteMode){
      startQuoteMode();
      continue;
    }

    // 閉じ符
    if(c == '⠴' && isQuoteMode){
      endQuoteMode();
      continue;
    }

    // 外字符
    if(c == '⠰' && i < brailleText.length-1 && brailleText.charAt(i+1) != '⠀'){
      startAlphabetMode();
      continue;
    }

    // 大文字符
    if(c == '⠠' && (isAlphabetMode || isQuoteMode)) {
      // 二重
      if(i < brailleText.length-1 && brailleText.charAt(i+1) == '⠠'){
          isUpperMode = true;
          i++;
      } else {
        // 通常
        isTempUpperMode = true;
      }    
      continue;
    }

    // 空白
    if(c == '⠀') {
      transratedText.push(" ");
      if(!isQuoteMode) endMode();
      continue;
    }

    // つなぎ符
    if(c == '⠤' && !(isAlphabetMode || isQuoteMode)) {
      endMode();
      continue;
    }

    // 数字モード
    if(isNumMode){
      if(c in numberMap){
        transratedText.push(numberMap[c]);
        continue;
      }
    }

    // 英字モード
    if(isAlphabetMode || isQuoteMode){
      if(c in alphabetMap){
        c = alphabetMap[c];
        if(isTempUpperMode || isUpperMode) {
          c = c.toUpperCase();
          isTempUpperMode = false;
        }
        transratedText.push(c);
        continue;
      }
    }

    endMode();
    // 2文字
    if(specialCalacters.includes(c) && i < brailleText.length-1) {
      let d = c + brailleText.charAt(i+1);
      if(d in doubleMap) {
        transratedText.push(doubleMap[d]);
        i++;
        continue; 
      }
    }

    // 1文字
    if(c in singleMap && !isQuoteMode) {
      transratedText.push(singleMap[c]);
      continue;
    }
    
    // どれにも当てはまらない
    transratedText.push(UNKNOWN);
  }

  return transratedText.join("");
}

const specialCalacters: string[] = ['⠠', '⠐', '⠈', '⠘', '⠨', '⠰'];

const numberMap: {[key:string]:string} = {
  "⠁": "１", "⠃": "２", "⠉": "３", "⠙": "４", "⠑": "５",
  "⠋": "６", "⠛": "７", "⠓": "８", "⠊": "９", "⠚": "０",
  "⠂": "．", "⠄": "，",
}

const alphabetMap: {[key:string]:string} = {
  "⠁": "a", "⠃": "b", "⠉": "c", "⠙": "d", "⠑": "e", "⠋": "f",
  "⠛": "g", "⠓": "h", "⠊": "i", "⠚": "j", "⠅": "k", "⠇": "l",
  "⠍": "m", "⠝": "n", "⠕": "o", "⠏": "p", "⠟": "q", "⠗": "r", 
  "⠎": "s", "⠞": "t", "⠥": "u", "⠧": "v", "⠺": "w", "⠭": "x",
  "⠽": "y", "⠵": "z", 
  "⠤": "-", "⠒": ":", "⠆": ";", "⠂": ",", "⠲": ".",
  "⠦": "?", "⠖": "!", "⠄": "’", 
}

const singleMap: {[key:string]:string} = {
  "⠁": "あ", "⠃": "い", "⠉": "う", "⠋": "え", "⠊": "お",
  "⠡": "か", "⠣": "き", "⠩": "く", "⠫": "け", "⠪": "こ",
  "⠱": "さ", "⠳": "し", "⠹": "す", "⠻": "せ", "⠺": "そ",
  "⠕": "た", "⠗": "ち", "⠝": "つ", "⠟": "て", "⠞": "と",
  "⠅": "な", "⠇": "に", "⠍": "ぬ", "⠏": "ね", "⠎": "の",
  "⠥": "は", "⠧": "ひ", "⠭": "ふ", "⠯": "へ", "⠮": "ほ",
  "⠵": "ま", "⠷": "み", "⠽": "む", "⠿": "め", "⠾": "も",
  "⠌": "や", "⠬": "ゆ", "⠜": "よ",
  "⠑": "ら", "⠓": "り", "⠙": "る", "⠛": "れ", "⠚": "ろ",
  "⠄": "わ", "⠆": "ゐ", "⠖": "ゑ", "⠔": "を",
  "⠴": "ん", "⠂": "っ", "⠲": "。",
  "⠒": "ー", "⠐": "・", "⠢": "？", 
}

const doubleMap: {[key:string]:string} = {
  "⠐⠡": "が", "⠐⠣": "ぎ", "⠐⠩": "ぐ", "⠐⠫": "げ", "⠐⠪": "ご",
  "⠐⠱": "ざ", "⠐⠳": "じ", "⠐⠹": "ず", "⠐⠻": "ぜ", "⠐⠺": "ぞ",
  "⠐⠕": "だ", "⠐⠗": "ぢ", "⠐⠝": "づ", "⠐⠟": "で", "⠐⠞": "ど",
  "⠐⠥": "ば", "⠐⠧": "び", "⠐⠭": "ぶ", "⠐⠯": "べ", "⠐⠮": "ぼ",
  "⠠⠥": "ぱ", "⠠⠧": "ぴ", "⠠⠭": "ぷ", "⠠⠯": "ぺ", "⠠⠮": "ぽ",
  "⠈⠡": "きゃ", "⠈⠩": "きゅ", "⠈⠪": "きょ",
  "⠘⠡": "ぎゃ", "⠘⠩": "ぎゅ", "⠘⠪": "ぎょ",
  "⠈⠱": "しゃ", "⠈⠹": "しゅ", "⠈⠺": "しょ",
  "⠘⠱": "じゃ", "⠘⠹": "じゅ", "⠘⠺": "じょ",
  "⠈⠕": "ちゃ", "⠈⠝": "ちゅ", "⠈⠞": "ちょ",
  "⠘⠕": "ぢゃ", "⠘⠝": "ぢゅ", "⠘⠞": "ぢょ",
  "⠈⠅": "にゃ", "⠈⠍": "にゅ", "⠈⠎": "にょ",
  "⠈⠥": "ひゃ", "⠈⠭": "ひゅ", "⠈⠮": "ひょ",
  "⠘⠥": "びゃ", "⠘⠭": "びゅ", "⠘⠮": "びょ",
  "⠨⠥": "ぴゃ", "⠨⠭": "ぴゅ", "⠨⠮": "ぴょ",
  "⠈⠵": "みゃ", "⠈⠽": "みゅ", "⠈⠾": "みょ",
  "⠈⠑": "りゃ", "⠈⠙": "りゅ", "⠈⠚": "りょ",
  "⠰⠀": "、",
}