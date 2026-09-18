(() => {
  const pxColumns = (el) => {
    if (!el) return null;
    const t = getComputedStyle(el).gridTemplateColumns;
    if (!t || t === "none") return 0;
    return t.split(" ").filter((tok) => /px$/.test(tok)).length;
  };
  const root = document.documentElement;
  const body = document.body;
  const tableHint = document.querySelector(".table-hint");
  const floatBtn = document.getElementById("wa-float");
  const heroCta = document.querySelector(".hero .cta");
  const heroCtaBox = heroCta ? heroCta.getBoundingClientRect() : null;
  const opSince = document.querySelector(".op-since");
  const plans = Array.from(document.querySelectorAll(".plan-board .plan"));
  const featured = document.querySelector(".plan--featured");
  const pageScrollWidth = Math.max(root.scrollWidth, body.scrollWidth);
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    clientWidth: root.clientWidth,
    scrollWidth: pageScrollWidth,
    pageOverflowX: pageScrollWidth > root.clientWidth + 1,
    tableHintDisplay: tableHint ? getComputedStyle(tableHint).display : null,
    tableHintText: tableHint ? tableHint.textContent.trim() : null,
    mastheadColumns: pxColumns(document.querySelector(".masthead")),
    heroColumns: pxColumns(document.querySelector(".hero")),
    benefitColumns: pxColumns(document.querySelector(".benefit-layout")),
    contactColumns: pxColumns(document.querySelector(".contact-layout")),
    metaRowColumns: pxColumns(document.querySelector(".meta-row")),
    planBoardColumns: pxColumns(document.querySelector(".plan-board")),
    planCount: plans.length,
    planRights: plans.map((el) => Math.round(el.getBoundingClientRect().right)),
    featuredRight: featured
      ? Math.round(featured.getBoundingClientRect().right)
      : null,
    heroCtaTop: heroCtaBox ? Math.round(heroCtaBox.top) : null,
    heroCtaBottom: heroCtaBox ? Math.round(heroCtaBox.bottom) : null,
    heroCtaWidth: heroCtaBox ? Math.round(heroCtaBox.width) : null,
    opSinceDisplay: opSince ? getComputedStyle(opSince).display : null,
    floatVisibility: floatBtn ? getComputedStyle(floatBtn).visibility : null,
    company: (document.querySelector(".company") || {}).textContent || null,
  };
})()
