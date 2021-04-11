import { v4 as uuidv4 } from "uuid";
import a from '../src/images/a.jpg'
import b from '../src/images/b.jpg'
import c from '../src/images/c.jpg'
import d from '../src/images/d.jpg'
import e from '../src/images/e.jpg'

function chillHop() {
  return [
    {
      name: "Beaver Creek",
      cover: a,
      artist: "Aso, Middle School, Aviino",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
      color: ["#205950", "#2ab3bf"],
      id: uuidv4(),
      active: true,
    },
    {
      name: "Daylight",
      cover: b,
      artist: "Aiguille",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
      color: ["#DE954A", "#CA0E03"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Keep Going",
      cover: c,
      artist: "Swørn",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
      color: ["#93917A", "#006C24"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Swimming",
      cover: e,
      artist: "Sleepy Fish",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=3527",
      color: ["#CEEAF1", "#206F93"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Nightfall",
      cover: b,
      artist: "Aiguille",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9148",
      color: ["#DE954A", "#CA0E03"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Reflection",
      cover: c,
      artist: "Swørn",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9228",
      color: ["#93917A", "#006C24"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Under the City Stars",
      cover: d,
      artist: "Aso, Middle School, Aviino",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=10074",
      color: ["#205950", "#2ab3bf"],
      id: uuidv4(),
      active: false,
    }    
  ];
}

export default chillHop;