interface IDuck {
  name: string;
  numLegs: number;
  makeSound: (sound: string) => void;
}

class Duck implements IDuck {
  name: string = "";
  numLegs: number = 0;
  constructor(name: string, numLegs: number = 0) {
    this.name = name;
    this.numLegs = numLegs;
  }
  makeSound = function(sound: string){
    alert(sound)
  }
}

const duck1 = new Duck("Duck 1", 5);
const duck2 = new Duck("Duck 2", 10);
const duck3 = new Duck("Duck 3", 22);
const duck4 = new Duck("Duck 4", 50);
const duck5 = new Duck("Duck 5", 55);

const ducks = [duck1, duck2, duck3, duck4, duck5];

function DuckElement({name, numLegs, makeSound}: Duck){
  return (
    <div>
      <span>Name : {name}</span>
      <span>Num Legs : {numLegs}</span>
      <button onClick={() => makeSound(`Hello, I'm ${name}`)}>sound</button>
    </div>
  );
}

function DuckList({listDucks}: {listDucks: Array<Duck>}){
  return (
    <div>
      {listDucks.map(duck => <DuckElement key={duck.name} {...duck}></DuckElement>)}
    </div>
  );
}

export {ducks, DuckList}
