//using a FIB logo as an svg found at Viquipedia by Farisori
export function createFibLogo() {
    const link = document.createElement('a');
    link.title = 'Farisori, CC BY-SA 4.0';
    link.href = 'https://commons.wikimedia.org/wiki/File:FIB.svg';
    const img = document.createElement('img');
    img.width = 256;
    img.alt = 'FIB';
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/FIB.svg/256px-FIB.svg.png?20110206101803';
    link.appendChild(img);
  
    return link;
  }