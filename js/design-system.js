(function () {
  "use strict";

  /**
   * Bracket Annotation Processor
   *
   * Finds [bracketed text] in elements with the `data-annotate` attribute
   * and wraps them in <span class="annotation">[text]</span>.
   */
  function processAnnotations() {
    var elements = document.querySelectorAll("[data-annotate]");
    elements.forEach(function (el) {
      if (el.querySelector(".annotation")) return; // already processed
      el.innerHTML = el.innerHTML.replace(
        /\[([^\]]+)\]/g,
        '<span class="annotation">[$1]</span>',
      );
    });
  }

  /**
   * Floating WhatsApp Button
   *
   * Reveals the fixed WhatsApp button only while none of the page's own
   * contact cards (or the masthead) are on screen, so the offer stays one
   * tap away without ever competing with the real CTA in view.
   */
  function setupFloatingWhatsApp() {
    var button = document.getElementById("wa-float");
    if (!button) return;

    var anchors = [].slice.call(document.querySelectorAll(".masthead, .cta"));
    if (!anchors.length || !("IntersectionObserver" in window)) {
      button.classList.add("is-visible");
      return;
    }

    var onScreen = new Set();
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            onScreen.add(entry.target);
          } else {
            onScreen.delete(entry.target);
          }
        });
        button.classList.toggle("is-visible", onScreen.size === 0);
      },
      { rootMargin: "-8% 0px -8% 0px" },
    );

    anchors.forEach(function (anchor) {
      observer.observe(anchor);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    processAnnotations();
    setupFloatingWhatsApp();
  });

  // Expose for external use
  if (typeof window !== "undefined") {
    window.DesignSystem = { processAnnotations: processAnnotations };
  }
})();
