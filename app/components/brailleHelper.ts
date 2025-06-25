export function brailleFromDots(dots: boolean[]): string {
  let code = 0x2800;
  dots.forEach((on, i) => {
    if (on) code += 1 << i;
  });
  return String.fromCharCode(code);
}

export function transrateBraille(brailleText: string): string {
  const transratedText: string[] = [];
  const UNKNOWN = '?';
  let isNumMode = false;

  for (let i = 0; i < brailleText.length; i++) {
    let c = brailleText.charAt(i);

    // 数字符
    if(c == '⠼'){
      isNumMode = true;
      continue;
    }

    // 空白
    if(c == '⠀') {
      transratedText.push(" ");
      isNumMode = false;
      continue;
    }

    // つなぎ符
    if(c == '⠤') {
      isNumMode = false;
      continue;
    }

    // 数字モード
    if(isNumMode){
      if(c in numberMap){
        transratedText.push(numberMap[c]);
        continue;
      }
      isNumMode = false;
    }

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
    if(c in singleMap) {
      transratedText.push(singleMap[c]);
      continue;
    }
    
    // どれにも当てはまらない
    transratedText.push(UNKNOWN);
  }

  return transratedText.join("");
}

const specialCalacters: string[] = ['⠠', '⠐', '⠈', '⠘', '⠨'];

const numberMap: {[key:string]:string} = {
  "⠁": "１", "⠃": "２", "⠉": "３", "⠙": "４", "⠑": "５",
  "⠋": "６", "⠛": "７", "⠓": "８", "⠊": "９", "⠚": "０",
  "⠂": "．", "⠄": "，",
}

const singleMap: {[key:string]:string} = {
  "⠁": "あ", "⠃": "い", "⠉": "う", "⠋": "え", "⠊": "お",
  "⠡": "か", "⠣": "き", "⠩": "く", "⠫": "け", "⠪": "こ",
  "⠱": "さ", "⠳": "し", "⠹": "す", "⠻": "せ", "⠺": "そ",
  "⠕": "た", "⠗": "ち", "⠝": "つ", "⠟": "て", "⠞": "と",
  "⠅": "な", "⠇": "に", "⠍": "ぬ", "⠏": "ね", "⠎": "の",
  "⠥": "は", "⠧": "ひ", "⠭": "ふ", "⠯": "へ", "⠮": "ほ",
  "⠵": "ま", "⠷": "み", "⠽": "む", "⠿": "め", "⠾": "も",
  "⠌": "や", "⠆": "ゐ", "⠬": "ゆ", "⠖": "ゑ", "⠜": "よ",
  "⠑": "ら", "⠓": "り", "⠙": "る", "⠛": "れ", "⠚": "ろ",
  "⠄": "わ", "⠔": "を", "⠴": "ん",
  "⠒": "ー", "⠐": "・", "⠂": "っ", "⠢": "？",
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
}