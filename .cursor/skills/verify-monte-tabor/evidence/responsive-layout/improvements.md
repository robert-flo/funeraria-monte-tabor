# Mobile and tablet notes after the layout change

Checked phone-portrait `390×844` (`heroCtaBottom` 549, fold 844) and tablet-portrait `768×1024` (hero 2 columns, CTA width 256, plan rights 280/490/700). `assert-viewport.py` and `assert-wa-hrefs.py` both exited 0.

## Still open

- The two remaining ops phrases on `hand` still wrap (`San Salvador` / `del año`). The band is 40px, not 89px. A single unwrapped line would need even smaller type or shorter copy.
- Jardín's featured tab makes that card's header taller, so `Tipo de ataúd` does not share a baseline with the other two cards on `lap`.
- Phone-landscape (`844×390`) is `lap`: two-column hero in a short viewport. Not driven this run.
