/* ============================================================
   REIGN — site behaviour
   1. The + menu overlay
   2. The brush: click and hold on the home page to reveal the
      hidden image underneath the black surface
   3. Works page filters
   4. Scroll reveal
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. THE + MENU
     ------------------------------------------------------------------ */
  var toggle = document.querySelector(".menu-toggle");
  var overlay = document.getElementById("site-navigation-overlay");

  function openMenu() {
    if (!overlay) return;
    overlay.hidden = false;
    document.body.classList.add("nav-open");
    if (toggle) {
      toggle.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close navigation");
    }
  }

  function closeMenu() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  }

  function menuIsOpen() {
    return !!overlay && !overlay.hidden;
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", function () {
      if (menuIsOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Click the black space around the links to close. */
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuIsOpen()) {
        closeMenu();
        if (toggle) toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     2. THE BRUSH — home page only

     The hero starts life as a solid black surface. Holding the pointer
     down and dragging erases that surface (globalCompositeOperation
     "destination-out") along the path of the brush, uncovering the
     photograph sitting beneath it.
     ------------------------------------------------------------------ */
  var hero = document.querySelector(".home-hero");
  var canvas = hero && hero.querySelector(".reveal-canvas");

  if (hero && canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var fallback = hero.querySelector(".hero-black-fallback");
    var cursor = hero.querySelector(".brush-cursor");

    /* To change the hidden image, edit the src of
       <img class="hero-reveal-image"> in index.html. */

    /* Brush feel — change these two to taste. */
    var BRUSH_DIAMETER = 120; /* px, in CSS pixels */
    var EDGE_SOFTNESS = 0.45; /* 0 = hard edge, 0.9 = very soft */

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var painting = false;
    var last = null;

    /* The plain black fallback exists for the no-JS case only: as soon as
       the script runs, the canvas becomes the black surface. */
    if (fallback) fallback.style.display = "none";

    function cssSize() {
      var r = hero.getBoundingClientRect();
      return {
        w: Math.max(1, Math.round(r.width)),
        h: Math.max(1, Math.round(r.height))
      };
    }

    function paintBlack() {
      var s = cssSize();
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, s.w, s.h);
    }

    function resize() {
      var s = cssSize();
      canvas.width = Math.round(s.w * dpr);
      canvas.height = Math.round(s.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      paintBlack();
      last = null;
    }

    /* One soft-edged circular dab of eraser. */
    function stamp(x, y, radius) {
      var inner = Math.max(0, Math.min(EDGE_SOFTNESS, 0.95));
      var g = ctx.createRadialGradient(x, y, radius * inner, x, y, radius);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.72, "rgba(0,0,0,0.92)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    /* Walk from the previous sample to this one so the stroke has no gaps
       even when the pointer moves quickly. */
    function strokeTo(x, y) {
      var radius = BRUSH_DIAMETER / 2;
      if (!last) {
        stamp(x, y, radius);
        last = { x: x, y: y };
        return;
      }
      var dx = x - last.x;
      var dy = y - last.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var step = Math.max(1, radius * 0.18);
      var n = Math.max(1, Math.ceil(dist / step));
      for (var i = 1; i <= n; i++) {
        stamp(last.x + (dx * i) / n, last.y + (dy * i) / n, radius);
      }
      last = { x: x, y: y };
    }

    function localPoint(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    function moveCursor(x, y) {
      if (!cursor) return;
      cursor.style.transform = "translate(" + x + "px," + y + "px)";
    }

    hero.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      /* Never paint when the press started on the header or the + button. */
      if (e.target && e.target.closest && e.target.closest(".site-header")) return;

      painting = true;
      last = null;
      if (cursor) cursor.classList.add("is-visible", "is-painting");
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {
        /* ignore */
      }
      var p = localPoint(e);
      moveCursor(e.clientX, e.clientY);
      stamp(p.x, p.y, BRUSH_DIAMETER / 2);
      last = p;
      e.preventDefault();
    });

    hero.addEventListener("pointermove", function (e) {
      moveCursor(e.clientX, e.clientY);
      if (cursor) cursor.classList.add("is-visible");
      if (!painting) return;
      var p = localPoint(e);
      strokeTo(p.x, p.y);
      e.preventDefault();
    });

    function endStroke(e) {
      if (!painting) return;
      painting = false;
      last = null;
      if (cursor) cursor.classList.remove("is-painting");
      if (e) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch (err) {
          /* ignore */
        }
      }
    }

    hero.addEventListener("pointerup", endStroke);
    hero.addEventListener("pointercancel", endStroke);
    hero.addEventListener("pointerleave", function () {
      if (cursor) cursor.classList.remove("is-visible");
      endStroke();
    });

    /* On touch, painting must not scroll the page. */
    hero.addEventListener(
      "touchmove",
      function (e) {
        if (painting) e.preventDefault();
      },
      { passive: false }
    );

    /* Keep the canvas the size of the hero. */
    if (window.ResizeObserver) {
      var lastW = 0;
      new ResizeObserver(function () {
        var w = cssSize().w;
        if (w !== lastW) {
          lastW = w;
          resize();
        }
      }).observe(hero);
    } else {
      window.addEventListener("resize", resize);
    }

    canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    resize();
  }

  /* ------------------------------------------------------------------
     3. WORKS — filter tabs
     ------------------------------------------------------------------ */
  var filterList = document.querySelector(".filter-list");

  if (filterList) {
    var tabs = Array.prototype.slice.call(filterList.querySelectorAll(".filter-tab"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".project-card"));
    var countEl = document.querySelector(".works-count");
    var total = cards.length;

    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }

    function applyFilter(label) {
      var wanted = label.toLowerCase().replace(/\s+/g, "").replace("/", "-");
      var shown = 0;

      cards.forEach(function (card) {
        var match = wanted === "all" || card.id === wanted;
        card.hidden = !match;
        if (match) shown++;
      });

      if (countEl) countEl.textContent = pad(shown) + " / " + pad(total) + " STUDIES";
    }

    filterList.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".filter-tab") : null;
      if (!btn) return;
      tabs.forEach(function (t) {
        t.setAttribute("aria-pressed", "false");
      });
      btn.setAttribute("aria-pressed", "true");
      applyFilter(btn.textContent.trim());
    });

    /* Landing on /works/#3d from the + menu pre-filters the grid. */
    function filterFromHash() {
      var id = (window.location.hash || "").replace("#", "");
      if (!id) return;
      var card = document.getElementById(id);
      if (!card) return;
      var labelEl = card.querySelector(".project-caption p");
      var label = labelEl ? labelEl.textContent.split("/")[0].trim() : "all";
      tabs.forEach(function (t) {
        t.setAttribute(
          "aria-pressed",
          t.textContent.trim().toLowerCase() === label.toLowerCase() ? "true" : "false"
        );
      });
      applyFilter(label);
    }

    filterFromHash();
    window.addEventListener("hashchange", filterFromHash);
  }

  /* ------------------------------------------------------------------
     4. SCROLL REVEAL
     ------------------------------------------------------------------ */
  var reveals = document.querySelectorAll(".scroll-reveal");

  if (reveals.length && "IntersectionObserver" in window) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("is-visible");
      });
    } else {
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("reveal-ready");
      });

      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
      );

      Array.prototype.forEach.call(reveals, function (el) {
        io.observe(el);
      });
    }
  }
})();
