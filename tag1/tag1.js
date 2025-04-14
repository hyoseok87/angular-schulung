// const farben = ['rot','grün','blau']

// console.log(farben);
// farben.pop()
// console.log(farben);

// farben.shift()
// console.log(farben);


// const namen = ['Anna', 'Ben', 'Clara'];
// namen.forEach(name => console.log(`Hallo, ${name}!`));


// const zahlen = [1, 2, 3];
// const verdoppelt = zahlen.map(n => n * 2);
// console.log(verdoppelt); 

// const zahlen = [1, 2, 3, 4];
// const gerade = zahlen.filter(n => n % 2 === 0);
// console.log(gerade);

// const zahlen2 = [5, 10, 15];
// const gefunden = zahlen2.find(n => n > 8);
// console.log(gefunden); 

// const zahlen = [1, 2, 3];
// const summe = zahlen.reduce((acc, curr) => acc + curr, 0);
// console.log(summe); 

// const nutzer = [
//     { name: 'Anna', aktiv: true },
//     { name: 'Ben', aktiv: false },
//     { name: 'Clara', aktiv: true }
//   ];
  
//   const aktiveNamen = nutzer
//     .filter(nutzer => nutzer.aktiv)
//     .map(nutzer => nutzer.name);
  
//   console.log(aktiveNamen); 

// const zahlen = [5, 10, 15, 20]
// const ergebnis = zahlen.filter(n => n == 15 || n == 20)
//                      .map(n => n * 2);
// console.log(ergebnis); 

// const zahlen = [3, 6, 9];
// const summe = zahlen.reduce((acc, curr) => acc + curr, 0);
// console.log(summe); 

// function multiplizieren(a, b) {
//     return a * b;
//   }
// console.log(multiplizieren(3, 9));

// const nutzer = [
//     { name: 'Anna', alter: 22, aktiv: true, bestellungen: [{ betrag: 29 }, { betrag: 41 }] },
//     { name: 'Ben', alter: 17, aktiv: true, bestellungen: [{ betrag: 15 }] },
//     { name: 'Clara', alter: 30, aktiv: false, bestellungen: [{ betrag: 99 }] },
//     { name: 'David', alter: 25, aktiv: true, bestellungen: [{ betrag: 50 }, { betrag: 10 }] }
//   ];
  
//   const ergebnis = nutzer
//     .filter(n => n.aktiv && n.alter > 18)
//     .map(n => ({
//       name: n.name,
//       umsatz: n.bestellungen.reduce((sum, b) => sum + b.betrag, 0)
//     }))
//     .sort((a, b) => b.umsatz - a.umsatz) 
//     .map(n => n.name);
  
//   console.log(ergebnis); 

// Promise Beispielen
//1.
// const meinPromise = new Promise((resolve, reject) => {
//     const erfolg = true;
  
//     setTimeout(() => {
//       if (erfolg) {
//         resolve('Fertig!');
//       } else {
//         reject('Fehler aufgetreten');
//       }
//     }, 1000);
//   });
  
//   meinPromise
//     .then(result => console.log(result))
//     .catch(error => console.error(error));
//2.
// function datenLaden() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve({ name: 'Anna', beruf: 'Pilotin' });
//       }, 3000);
//     });
//   }
  
//   datenLaden()
//     .then(daten => console.log('Antwort:', daten))
//     .catch(err => console.error('Fehler:', err));

// console.log("ich bin weiter");

// 📘 Promise – Beispiel mit async/await
// async 함수는 항상 Promise를 반환하고,
// await는 Promise가 끝날 때까지 기다려준다.
// try-catch로 성공/실패를 명확하게 나눌 수 있어!
// async function ladeProfil() {
//   try {
//     const daten = await datenLaden(); // datenLaden은 Promise를 반환하는 함수
//     console.log('Erfolg:', daten);
//   } catch (err) {
//     console.error('Fehler beim Abrufen:', err);
//   }
// }

// ladeProfil();

// ✅ 1. Nutzer-Daten 2초 뒤 반환
function holeNutzerDaten() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Anna");
      }, 2000);
    });
  }
  
  // ✅ 2. Berechtigungen 1초 뒤 배열 반환
  function holeBerechtigungen() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(["lesen", "schreiben", "bearbeiten"]);
      }, 1000);
    });
  }
  
  // ✅ 3~5. async/await + try/catch + 콘솔 출력
  async function main() {
    try {
      const nutzer = await holeNutzerDaten();
      const rechte = await holeBerechtigungen();
  
      console.log(`✅ Nutzer: ${nutzer}`);
      console.log(`🔐 Rechte: ${rechte.join(", ")}`);
    } catch (err) {
      console.error("❌ Fehler aufgetreten:", err);
    }
  }
  
  main();
