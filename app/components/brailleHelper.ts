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
  let isAlphabet = false;
  let isNumber = false;

  for (let i = 0; i < brailleText.length; i++) {
    let c = brailleText.charAt(i);

    if(c == String.fromCharCode(0x2800)) {
      transratedText.push(" ");
      continue;
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

    if(c in singleMap) {
      transratedText.push(singleMap[c]);
    }
    else {
      transratedText.push(UNKNOWN);
    }
  }

  return transratedText.join("");
}

const specialCalacters: string[] = ['⠠', '⠐', '⠈', '⠘', '⠨'];

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