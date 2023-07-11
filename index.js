const containerMain = document.querySelector(".container");

////1 ligne 1///////
const cell1 = document.createElement("div");
cell1.className = "cell1";
cell1.textContent = "ROUND";

const cell2 = document.createElement("div");
cell2.className = "cell2";
cell2.textContent = "Joueur 1";
cell2.style.backgroundColor = "yellow";

const cell3 = document.createElement("div");
cell3.className = "cell3";
cell3.textContent = "GLOBAL";

containerMain.appendChild(cell1);
containerMain.appendChild(cell2);
containerMain.appendChild(cell3);

////2 ligne 2///////
const roundHtml = document.createElement("div"); //round
roundHtml.className = "cell1";

const cell23 = document.createElement("div");
cell23.className = "cell2";

const global1Html = document.createElement("div"); //global1
global1Html.className = "cell24";

const global2Html = document.createElement("div"); //global2
global2Html.className = "cell25";

containerMain.appendChild(roundHtml);
containerMain.appendChild(cell23);
containerMain.appendChild(global1Html);
containerMain.appendChild(global2Html);

////3 ligne 3///////
const cell4 = document.createElement("div");
cell4.className = "cell1";

const img1 = document.createElement("img");
img1.className = "img";
img1.src = "./images/9.png";

const cell5 = document.createElement("div");
cell5.className = "cell3";

const buttMain = document.createElement("div");
buttMain.className = "butt-main";
buttMain.textContent = "Lancer le dé";

cell4.appendChild(img1);
containerMain.appendChild(cell4);
containerMain.appendChild(buttMain);
containerMain.appendChild(cell5);

////4 ligne 4///////
const cell6 = document.createElement("div");
cell6.className = "cell1";

const cell7 = document.createElement("div");
cell7.className = "cell2";

const img2 = document.createElement("img");
img2.className = "img2";
img2.src = "./images/9.png";

const cell8 = document.createElement("div");
cell8.className = "cell3";

cell7.appendChild(img2);
containerMain.appendChild(cell6);
containerMain.appendChild(cell7);
containerMain.appendChild(cell8);

////5 ligne 5///////

const buttGameOver = document.createElement("div");
buttGameOver.className = "cell1";
const buttGameOverText = document.createElement("div");
buttGameOverText.className = "game-over";
buttGameOverText.textContent = "New game";

const cell10 = document.createElement("div");
cell10.className = "cell3";

const buttHold = document.createElement("div");
buttHold.className = "butt-hold";
buttHold.textContent = "Hold";

buttGameOver.appendChild(buttGameOverText);
containerMain.appendChild(buttGameOver);
containerMain.appendChild(buttHold);
containerMain.appendChild(cell10);

///BURGER-MENU////
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("active");
  menu.classList.toggle("active");
});

/////MODAL ALERT///
const modal = document.createElement("dialog");
modal.className = "modal";
const modalBox = document.createElement("div");
modalBox.id = "modal-box";
const modalContent = document.createElement("div");
modalContent.className = "modal-content";
const closeModalBtn = document.createElement("button");
closeModalBtn.id = "close-modal-btn";
closeModalBtn.textContent = "Ok";

modalBox.appendChild(modalContent);
modalBox.appendChild(closeModalBtn);
modal.appendChild(modalBox);
containerMain.appendChild(modal);

let isModalOpen = false;

closeModalBtn.addEventListener("click", () => {
  modal.close();
  isModalOpen = false;
});

document.addEventListener("click", (e) => {
  if (isModalOpen && !modalBox.contains(e.target)) {
    modal.close();
  }
});

const alert = (event, message) => {
  modalContent.innerHTML = message;
  modal.showModal();
  isModalOpen = true;
  event.stopPropagation();
};

/////FUNCTIONALITé///////

let global, round, joueur, hold, fin;

const initialisation = () => {
  global = [0, 0];
  round = 0;
  joueur = 1;
  hold = false;
  fin = false;
  global1Html.innerHTML = global[0];
  global2Html.innerHTML = global[1];
  roundHtml.innerHTML = round;
  cell2.innerHTML = "Jouer 1";
  cell2.style.backgroundColor = "yellow";
  img1.src = "./images/9.png";
  img2.src = "./images/9.png";
};

initialisation();

const clickSurBouton = (e) => {
  hold = false;

  round = lancerDe();
  roundHtml.innerHTML = round;
  img1.src = imgDice(round);
  img2.src = imgDice(round);

  if (round === 1) hold = true;
  final(e);
};

const lancerDe = () => {
  const nombreDécimal = Math.random() * 6 + 1;
  const nombre = Math.trunc(nombreDécimal);

  return nombre;
};

const clickSurButtonHold = (e) => {
  if (round === 1) {
    alert(e, "Ce n'est plus votre tour!");
    return;
  } else if (hold) {
    alert(e, "Cliquez sur le bouton Lancer le dé!");
    return;
  } else {
    global[joueur - 1] += round;
    if (joueur === 1) global1Html.innerHTML = global[0];
    else global2Html.innerHTML = global[1];
    round = 0;
    roundHtml.innerHTML = round;
    img1.src = "./images/9.png";
    img2.src = "./images/9.png";
    hold = true;
    final(e);
  }
};

const changeJoueur = () => {
  if (hold && joueur === 1) joueur = 2;
  else if (hold && joueur === 2) joueur = 1;

  if (joueur === 2) {
    cell2.innerHTML = "Joueur 2";
    cell2.style.backgroundColor = "green";
  } else {
    cell2.innerHTML = "Joueur 1";
    cell2.style.backgroundColor = "yellow";
  }
};

const final = (e) => {
  if (global[1] > 0) {
    if (global[0] >= 100 && !fin) {
      alert(e, "joueur1 à gagné !");
      fin = true;
    } else if (global[1] >= 100 && !fin) {
      alert(e, "joueur2 à gagné !");
      fin = true;
    } else changeJoueur();
  } else changeJoueur();
};

const imgDice = (dice) => {
  switch (dice) {
    case 1:
      return "./images/1.png";
      break;
    case 2:
      return "./images/2.png";
      break;
    case 3:
      return "./images/3.png";
      break;
    case 4:
      return "./images/4.png";
      break;
    case 5:
      return "./images/5.png";
      break;
    case 6:
      return "./images/6.png";
      break;
    default:
      "./images/9.png";
  }
};

buttMain.addEventListener("click", (event) => {
  if (fin) alert(event, "partie finie, retenter votre chance!");
  else {
    clickSurBouton(joueur);
  }
});

buttHold.addEventListener("click", clickSurButtonHold);

buttGameOver.addEventListener("click", initialisation);
