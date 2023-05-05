function* genId(){
  const t: string[] = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "1234567890"
  ];
  const l: number = 15;
  let result: string;
  
  while (true){
    result = '#';
    for (let n = 0; n < l; n++){
      let random_m: number = Math.floor(Math.random() * t.length)
      let random_v: number = Math.floor(Math.random() * t[random_m].length)
      result += t[random_m].charAt(random_v);
    }
    yield result;
  }
}

const newGen: Generator = genId()

function start(){
  console.log(newGen.next().value);
  setTimeout(start, 1250)
}
start();