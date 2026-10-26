import type { Locale } from "../lib/types";

const en = [
  "She says ‘I’ll be ready in 5 minutes.’ That’s not time. That’s a teaser.",
  "She says ‘I’m not hungry.’ Then orders dessert with two spoons. One for her, one for her.",
  "She says ‘I’m just looking.’ 45 minutes later, she’s in the payment queue.",
  "She says ‘I’m not mad.’ The whole room suddenly lowers the volume.",
  "She says ‘last photo.’ Her phone storage files a police report.",
  "She says ‘I don’t gossip.’ Then asks ‘did you hear?’ before saying hello.",
  "She says ‘I’ll sleep early.’ 2 a.m. — ‘one more video.’",
  "She says ‘I don’t care.’ Then brings it up again in 3 business days.",
  "She says ‘I have nothing to wear.’ Wardrobe full. Crisis real.",
  "She says ‘I don’t need help.’ Then stands there holding the map upside down.",
];
const ms = [
  "Dia kata ‘5 minit lagi siap.’ Itu bukan masa. Itu teaser.",
  "Dia kata ‘tak lapar.’ Lepas tu pesan pencuci mulut dengan dua sudu. Satu untuk dia, satu lagi untuk dia.",
  "Dia kata ‘tengok-tengok je.’ 45 minit kemudian, dah beratur nak bayar.",
  "Dia kata ‘saya tak marah.’ Satu bilik terus perlahankan suara.",
  "Dia kata ‘gambar terakhir.’ Storan telefon dah buat laporan polis.",
  "Dia kata ‘saya tak mengumpat.’ Lepas tu tanya ‘kau dah dengar?’ sebelum bagi salam.",
  "Dia kata ‘nak tidur awal.’ Pukul 2 pagi — ‘satu video lagi.’",
  "Dia kata ‘saya tak kisah.’ Tiga hari bekerja kemudian, topik itu naik balik.",
  "Dia kata ‘tak ada baju nak pakai.’ Almari penuh. Krisis tetap real.",
  "Dia kata ‘tak perlu tolong.’ Lepas tu pegang peta terbalik.",
];
const zh = [
  "她说‘再等我五分钟’。这不是时间，是预告片。", "她说‘我不饿’，然后点了两把勺子的甜点。两把都给她。",
  "她说‘我只是看看’。45 分钟后，她已经在付款队伍里。", "她说‘我没生气’。整个房间突然自动调低音量。",
  "她说‘最后一张’。手机存储空间已经报警。", "她说‘我不八卦’。然后还没打招呼就问‘你听说了吗？’",
  "她说‘今晚早点睡’。凌晨两点：‘再看一个视频。’", "她说‘我不在意’。三个工作日后又把这件事提了出来。",
  "她说‘我没衣服穿’。衣柜满满，危机也是真的。", "她说‘不用帮我’。然后倒拿着地图站在那里。",
];
export const HERO_JOKES: Record<Locale, { intro: string; jokes: string[]; label: string; next: string; pause: string; resume: string; counter: (n: number) => string }> = {
  en: { intro: "Hi, want to hear a joke about girl?", jokes: en, label: "FUN MODE", next: "Next joke", pause: "Pause jokes", resume: "Resume jokes", counter: (n) => `${n}/10` },
  ms: { intro: "Hai, nak dengar lawak pasal perempuan?", jokes: ms, label: "MOD LAWAK", next: "Lawak seterusnya", pause: "Jeda lawak", resume: "Sambung lawak", counter: (n) => `${n}/10` },
  "zh-Hans": { intro: "嗨，想听一个关于女生的笑话吗？", jokes: zh, label: "轻松一下", next: "下一个笑话", pause: "暂停笑话", resume: "继续笑话", counter: (n) => `${n}/10` },
};
