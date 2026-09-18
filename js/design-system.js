(function () {
  "use strict";

  var WA_NUMBER = "50374657567";
  var WA_MESSAGES = {
    hero: "Hola, vengo de la página web y quiero información sobre los planes empresariales.",
    plans:
      "Hola, vi la tabla de planes en la página web y quiero una cotización para mi empresa.",
    close:
      "Hola, vengo de la página web y quiero agendar una reunión para conocer los planes empresariales.",
    float:
      "Hola, vengo de la página web y quiero hablar con un asesor.",
  };

  function waUrl(source) {
    var text = WA_MESSAGES[source] || WA_MESSAGES.hero;
    return (
      "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text)
    );
  }

  function track(eventName) {
    var endpoint = document.documentElement.getAttribute("data-goatcounter");
    if (!endpoint) return;
    var url =
      endpoint +
      "?p=" +
      encodeURIComponent(eventName) +
      "&t=" +
      encodeURIComponent(eventName) +
      "&e=true";
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url);
      return;
    }
    var img = new Image();
    img.src = url;
  }

  /**
   * Bracket Annotation Processor
   *
   * Finds [bracketed text] in elements with the `data-annotate` attribute
   * and wraps them in <span class="annotation">[text]</span>.
   */
  function processAnnotations() {
    var elements = document.querySelectorAll("[data-annotate]");
    elements.forEach(function (el) {
      if (el.querySelector(".annotation")) return;
      el.innerHTML = el.innerHTML.replace(
        /\[([^\]]+)\]/g,
        '<span class="annotation">[$1]</span>',
      );
    });
  }

  /**
   * One number, four prefilled messages. The first WhatsApp line the
   * business receives is the attribution: hero, plans, close, or float.
   */
  function wireWhatsApp() {
    var links = document.querySelectorAll("[data-wa]");
    links.forEach(function (link) {
      var source = link.getAttribute("data-wa");
      link.setAttribute("href", waUrl(source));
      link.addEventListener("click", function () {
        track("whatsapp-" + source);
      });
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
      { rootMargin: "0px 0px 30% 0px", threshold: 0 },
    );

    anchors.forEach(function (anchor) {
      observer.observe(anchor);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    processAnnotations();
    wireWhatsApp();
    setupFloatingWhatsApp();
  });

  if (typeof window !== "undefined") {
    window.DesignSystem = {
      processAnnotations: processAnnotations,
      waUrl: waUrl,
    };
  }
})();
