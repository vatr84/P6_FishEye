// Fonction pour garder le focus à l'intérieur de la modale
export function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const firstFocusableEl = focusableEls[0];  
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
  
    element.addEventListener('keydown', function(e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
  
        if (!isTabPressed) {
            return;
        }
  
        if (e.shiftKey) { // Si l'utilisateur presse Shift + Tab
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else { // Si l'utilisateur presse Tab seulement
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });
  }