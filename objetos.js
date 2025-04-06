class A {
  // constructor , se llama literamente contructor.
  constructor() {
    // declaracion de variables...
    this.valor1 = 5;
    this.valor2 = 10;
  }

  setValor1(valor) {
    this.setValor1 = valor;
  }

  setValor2(valor) {
    this.setValor2 = valor;
  }

  getValor1() {
    return this.valor1;
  }

  getValor2() {
    return this.valor2;
  }
}

// Creamos un objeto A 
let objetoA = new A();

console.log('Objeto A:')
console.log('A: ', objetoA.getValor1());
console.log('B: ', objetoA.getValor2());

objetoA.setValor1(50);
objetoA.setValor2(100);

console.log('Objeto A:')
console.log(`Valor 1:  ${objetoA.getValor1()}`);
console.log(`Valor 2: ${objetoA.getValor1()}`);

console.log('--------------------------------------');
// Creamos un clase B 
class B {
  constructor() {
    this.valorX = 1000;
    this.valorY = 1000;
  }

  setValorX(valor) {
    // this.setValorX = valor , not working.
    this.valorX = valor;
    // retorna la referencia al objeto actualmente 
    return this;
  }

  setValorY(valor) {
    // retorna la referencia al objeto actualmente 
    this.valorY = valor;
    return this;
  }

  getValorX() {
    return this.valorX;
  }

  getValorY() {
    return this.valorY;
  }
}


// Declaramos un objeto de clase B 
let objetoB = new B();

console.log('Objeto B :')
console.log('X: ', objetoB.getValorX());
console.log('Y: ', objetoB.getValorY());

// Lo tratamos como si fueran promesas.
objetoB
  .setValorX(8)
  .setValorY(4);

console.log('-----------------')
console.log('X: ', objetoB.getValorX());
console.log('Y: ', objetoB.getValorY());
/*
console.log('-----------------')
console.log('X : Y' , objetoB.getValorX().getValorY); // underfined
*/
