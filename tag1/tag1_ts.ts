// function greet(name: string): string {
//     return `Hallo, ${name}!`;
//   }
  
//   console.log(greet("DRV"));

// 1.Aufgabe
// function sum(...zahlen: number[]): number {
//   const ergebnis = zahlen.reduce((a, b) => a + b, 0);
//   console.log("Summe:", ergebnis);
//   return ergebnis;
    
// }

// sum(5, 10, 15);

interface Shape {
  kind: "circle" | "rectangle";
  radius?: number;
  width?: number;
  height?: number;
}

function calculateArea(shape: Shape): number {
  if (shape.kind === "circle" && shape.radius !== undefined) {
    return Math.PI * shape.radius ** 2;
  } else if (
    shape.kind === "rectangle" &&
    shape.width !== undefined &&
    shape.height !== undefined
  ) {
    return shape.width * shape.height;
  } else {
    throw new Error("Fehler");
  }
}

const kreis: Shape = { kind: "circle", radius: 5 };
const rechteck: Shape = { kind: "rectangle", width: 10, height: 8 };

console.log("Kreisfläche:", calculateArea(kreis));       
console.log("Rechteckfläche:", calculateArea(rechteck)); 
