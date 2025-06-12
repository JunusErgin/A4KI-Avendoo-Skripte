const styles = `
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



`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerHTML = styles;
document.head.appendChild(styleSheet);


// Sucht das Element anhand der Klasse oder ID
const element = document.querySelector('.tutorialChangePage');

// Entfernt den Text "Willkommen im Modul" und die Anführungszeichen
if (element) {
    element.textContent = element.textContent.replace('Willkommen im Modul ', '').replace(/"/g, '');
}



// Funktion, um Fenster NICHT mehr in einem Fenster zu öffnen
// Wir sind sehr früh im Ladevorgang (document_start),
// also setzen wir window.open um, bevor Angular es benutzt.
(function() {
  const originalOpen = window.open;
  window.open = function(url, target, features) {
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
})();
