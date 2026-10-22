/* Preview-only behaviour. The real site uses React for this; the shared
   preview is plain HTML so it works from any URL, signed in or not. */
(function () {
  // Mobile navigation
  var btn = document.querySelector('[aria-controls="mobile-nav"]');
  var nav = document.getElementById("mobile-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.hasAttribute("hidden");
      if (open) nav.removeAttribute("hidden");
      else nav.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", String(open));
      var path = btn.querySelector("path");
      if (path)
        path.setAttribute(
          "d",
          open ? "M2 2 L20 12 M20 2 L2 12" : "M1 1.5 H21 M1 7 H21 M1 12.5 H15"
        );
    });
  }

  // Article search and category filter
  var grid = document.querySelector("[data-nf-grid]");
  if (!grid) return;
  var search = document.getElementById("learn-search");
  var count = document.querySelector("[data-nf-count]");
  var filters = [].slice.call(document.querySelectorAll("[data-nf-filter]"));
  var items = [].slice.call(grid.querySelectorAll("[data-nf-item]"));
  var active = "All";

  var empty = document.createElement("p");
  empty.className = "mt-16 max-w-md text-ink-soft";
  empty.textContent =
    "Nothing matches that yet. Try a different search, or browse all categories.";
  empty.hidden = true;
  grid.parentNode.insertBefore(empty, grid.nextSibling);

  function apply() {
    var q = (search && search.value ? search.value : "").trim().toLowerCase();
    var shown = 0;
    items.forEach(function (el) {
      var okCat = active === "All" || el.getAttribute("data-nf-category") === active;
      var okQ = !q || (el.getAttribute("data-nf-text") || "").indexOf(q) !== -1;
      var show = okCat && okQ;
      el.style.display = show ? "" : "none";
      if (show) shown++;
    });
    if (count)
      count.textContent =
        shown + (shown === 1 ? " article" : " articles") +
        (active !== "All" ? " in " + active : "");
    grid.hidden = shown === 0;
    empty.hidden = shown !== 0;
  }

  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      active = b.getAttribute("data-nf-filter");
      filters.forEach(function (o) {
        var on = o === b;
        o.setAttribute("aria-pressed", String(on));
        o.className = on
          ? "text-[0.82rem] uppercase tracking-[0.14em] transition-colors text-maroon underline underline-offset-[6px]"
          : "text-[0.82rem] uppercase tracking-[0.14em] transition-colors text-ink-soft hover:text-navy";
      });
      apply();
    });
  });
  if (search) search.addEventListener("input", apply);
})();
