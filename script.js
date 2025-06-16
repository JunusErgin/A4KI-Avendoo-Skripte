const lectureStyle = `
  #themeWrapper {
    background-color: #f5f7f7;
  }

  #resetContent {
    background-color: #f5f7f7;
  }

  #tutorialMenue .nav-list li a, #mobileTutorialMenu .nav-list li a {
    color: #124658 !important;
  }
  
  #tutorialMenue {
    width: 360px;
    background-color: white;
    padding: 20px;
    border-radius: 40px;
  }

  #tutorialMenue .nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  #tutorialMenue .nav-list li {
    display: block;
    margin-bottom: 0px;
  }

  #tutorialMenue .nav-list .subMenu {
    margin-bottom: 20px;
  }

  #tutorialMenue .tutorialChangePage {
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    /*transition: background-color 0.3s;*/
  }

  #tutorialMenue .tutorialChangePage:hover {
    background-color: #e0e0e0;
  }

  #tutorialMenue .tutorialChangePage.active {
    background-color: #3d2ee4;
    color: white;
  }

  #tutorialMenue .tutorialChangePage .tutorialArrowOpen {
    margin-right: 10px;
  }

  #tutorialMenue .subMenu > ul li a {
    background-color: transparent;
  }

  #tutorialMenue > ul li a {
    border-bottom: none;
  }

  .nav li a {
    /* Menü Links */
  }
`;

function removeTextFromLectureTitle(replaceText) {
  // Sucht das Element anhand der Klasse oder ID
  const lectureTitle = document.querySelector('.tutorialChangePage');

  // Entfernt den Text "Willkommen im Modul" und die Anführungszeichen
  if (lectureTitle) {
    lectureTitle.textContent = lectureTitle.textContent.replace(replaceText, '').replace(/"/g, '');
  }
}

// Funktion, um Fenster NICHT mehr in einem Fenster zu öffnen
// Wir sind sehr früh im Ladevorgang (document_start),
// also setzen wir window.open um, bevor Angular es benutzt.
function suppressPopupLinks() {
  const originalOpen = window.open;
  window.open = function (url, target, features) {
    // Wenn Angular z.B. window.open(url, '_blank') aufruft,
    // landen wir hier und leiten einfach auf die URL um:
    window.location.href = url;
    // Gib zur Sicherheit auch das Window-Objekt der aktuellen Seite zurück
    return window;
  };

  // Für den Fall, dass irgendwo target="_blank" an <a>-Tags gesetzt wird,
  // entfernen wir die Attribute.
  const removeTargets = root => {
    root.querySelectorAll && root.querySelectorAll('a[target]').forEach(a => {
      a.removeAttribute('target');
    });
  };

  // Sobald DOM komplett parst, ein Mal initial bereinigen:
  document.addEventListener('DOMContentLoaded', () => {
    removeTargets(document);
  });

  // Und über einen MutationObserver für nachträglich gerenderte Links:
  const mo = new MutationObserver(mutations => {
    for (const m of mutations) {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          removeTargets(node);
        }
      });
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
}



// ------


const headerStyle = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Figtree', sans-serif;
  background: rgb(245, 247, 247) !important;
}

#FN_pageContent {
  background: rgb(245, 247, 247) !important;
}

.ki-logo {
    height: auto;
    max-height: 44px;
    max-width: 154px;
}

ul#contentMenue li.selected {
    border-top: none;
    background: transparent;
}

.ul#contentMenue li:hover {
  background: transparent;
  border-top: none;
}

.navbar-inner {
    display: flex;
    align-items: center;
    padding-top: 20px;
}

.navbar-inner .container {
    display: flex;
    justify-content: end;
}

ul#contentMenue li {
    border-color: transparent;
}

/*Menüpunkt ausgewählt*/
.ul#contentMenue li.selected {
  background: transparent;
  border-top: none;
}

#contentMenueArea .navbar-inner {
    background: transparent;
    border-bottom: none;
}

#mainpage {
  margin-top: 100px;
}

.learnpath-element-inner {
    border-radius: 24px !important;
    border-color: transparent !important;
}

.learnpathBody .button {
  display:none;
}


/* Card ändern */
.learnpath-element-inner .image .courseItemImage, .learnpath-element-inner .image .sectionCourseItemImage {
  background-size: cover !important;
  min-height: 160px !important;
}

.learnpath-element-inner {
  overflow: hidden;
}

.learnpath-element-inner .image {
  min-height: 170px !important;
}

.learnpath-element-inner.actual-element, .legend-location {
  border-color: #f8d6d3 !important;
} 

.legend-location {
  box-shadow: 0px 0px 0px 1px #f8d6d3;
  border: 1px solid #f8d6d3 !important;
}

ul#contentMenue li:hover {
  background: transparent !important;
  border-top: 1px solid #CCC !important;
  margin-bottom: -1px !important;
}

.learnpath-element-content .title p {
  font-family: 'Figtree', sans-serif;
  font-weight: bold;
  text-align: start;
}

.duration_wrapper {
  display: flex;
}

.learnpath-element-headline {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.learnpath-element-headline .learnpath-element-headline-inner{
  flex: 1;
}

.navbar .nav > li > a {
  font-size: 16px;
  font-weight: 500;
  color: #124658 !important;
}

`;

function moveLearnStatsToBottomOfCard() {
  let cards = document.querySelectorAll('.learnpath-element-inner');
  cards.forEach(function (card) {
    // Erste Überschrift in der Karte finden
    let headline = card.querySelector('.learnpath-element-headline');
    if (headline) {
      // Element einfach ans Ende des Elternelements verschieben
      card.appendChild(headline);
    }
  });
}

function setGrayBackground(selector) {
  document.querySelector(selector).style.background = 'rgba(247, 247, 247)';
}


function applyStyle(css) {
  const headerStyleSheet = document.createElement("style");
  headerStyleSheet.type = "text/css";
  headerStyleSheet.innerHTML = css;
  document.head.appendChild(headerStyleSheet);
}
const elementBackgroundColor = document.querySelector('.elementBackgroundColor');
if (elementBackgroundColor) {
  elementBackgroundColor.style.backgroundColor = '';
}

function hideElement(selector) {
  const elem = document.querySelector(selector);
  if (elem) {
    elem.style.display = 'none';
  }
}
function hideElements(list) {
  list.forEach(hideElement);
}

function addLogoToNavbar() {
  const logoUrl = 'https://lernwelt.education-partners.de/c/image.media?objectId=1742391448691_1&lang=de';
  // Passe hier den Selector so an, dass er genau auf dein UL.nav-Element zeigt:
  const navBar = document.querySelector('.navbar-inner');
  if (!navBar) return;

  // 2) (Alternativ) insertAdjacentHTML
  navBar.insertAdjacentHTML('afterbegin', `<img class="ki-logo" src="${logoUrl}">`);
}

function adjustMainHeight() {
  document.getElementById('contentContentCourse').style.height = 'calc(100vh - 62px)';
}


function hideMenuItems(selectors) {
  const menu = document.getElementById('contentMenue');
  if (!menu) return;
  selectors.forEach(sel => {
    // Suche alle passenden Knoten im Menü
    const items = menu.querySelectorAll(sel);
    items.forEach(item => {
      // Ausblenden via CSS, Event-Listener bleiben erhalten (werden nur unsichtbar)
      item.style.display = 'none';
    });
  });
}

removeTextFromLectureTitle('Willkommen im Modul ');
applyStyle(lectureStyle);
suppressPopupLinks();

// -- Für Hauptseite
applyStyle(headerStyle);
hideElements([
  '#contentHeader', 
  '#description', 
  '.BL_jumpToPosition', 
  '.showIconLanguages']); // Hauptseite
adjustMainHeight();
moveLearnStatsToBottomOfCard();
addLogoToNavbar();
hideMenuItems([
  '.tasks-selector',
  '.filestore-selector',
  '.community-selector'
]);
// Include: https://raw.githubusercontent.com/JunusErgin/A4KI-Avendoo-Skripte/main/script.js