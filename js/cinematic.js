(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isKannada = document.documentElement.lang === "kn" || location.pathname.indexOf("/kn/") !== -1;
  var copy = isKannada ? {
    explore: "3D ಯಲ್ಲಿ ಅನ್ವೇಷಿಸಿ", close: "ಪ್ರವಾಸ ಮುಚ್ಚಿರಿ", touring: "3D ಪ್ರವಾಸ ಸಕ್ರಿಯವಾಗಿದೆ",
    hint: "ಎಳೆಯಿರಿ · ಸ್ಕ್ರೋಲ್ ಮಾಡಿ · ಸ್ಥಳ ಆಯ್ಕೆಮಾಡಿ", scene: "ನಿಮ್ಮ ಆಗಮನದ ಕಥೆ",
    hotspots: [
      ["ಸಂಪೂರ್ಣ ಖಾಸಗಿ ಹೋಂಸ್ಟೇ", "ಕುಟುಂಬ ಮತ್ತು ಸ್ನೇಹಿತರಿಗಾಗಿ ಸಂಪೂರ್ಣ ಆಸ್ತಿ."],
      ["3 ಮಲಗುವ ಕೋಣೆಗಳು", "ಮೂರು ಆರಾಮದಾಯಕ ಕೋಣೆಗಳು ಒಂದೇ ಖಾಸಗಿ ವಾಸ್ತವ್ಯದ ಭಾಗ."],
      ["2 ಸ್ನಾನಗೃಹಗಳು", "ಗುಂಪಿನ ವಾಸ್ತವ್ಯಕ್ಕೆ ಎರಡು ಸ್ನಾನಗೃಹಗಳು."],
      ["ತೋಟ ಮತ್ತು ಕ್ಯಾಂಪ್‌ಫೈರ್", "ಸಂಜೆಯ ಸಂಭಾಷಣೆ ಮತ್ತು ನಿಧಾನವಾದ ಹೊರಾಂಗಣ ಕ್ಷಣಗಳಿಗಾಗಿ."],
      ["ಕಾಫಿ ತೋಟ", "ಮಂಜು, ಹಸಿರು ಮತ್ತು ಕಾಫಿಯ ಸುವಾಸನೆಯ ನಡುವೆ."],
      ["ದೃಶ್ಯದ ನೋಟ", "ಕೊಡಗಿನ ಬೆಟ್ಟಗಳು ಮತ್ತು ಕಣಿವೆಗಳ ಶಾಂತ ಅನುಭವ."]
    ]
  } : {
    explore: "Explore in 3D", close: "Close tour", touring: "3D tour active",
    hint: "Drag · scroll · choose a place", scene: "Your arrival story",
    hotspots: [
      ["Private Homestay", "The entire property is exclusively yours for a relaxed group stay."],
      ["3 Bedrooms", "Three comfortable bedrooms are included in one private stay."],
      ["2 Bathrooms", "Two washrooms make the home easy to share with your group."],
      ["Garden & Campfire", "An outdoor corner for unhurried golden-hour conversations."],
      ["Coffee Plantation", "Wake among coffee, mist, and the green rhythm of Coorg."],
      ["Scenic View", "A quiet outlook towards Coorg's hills and valleys."]
    ]
  };

  function button(label, index) {
    var el = document.createElement("button");
    el.type = "button";
    el.className = "cinematic-hotspot";
    el.dataset.hotspot = index;
    el.setAttribute("aria-label", label);
    el.innerHTML = '<span class="cinematic-hotspot-dot" aria-hidden="true"></span><span>' + label + "</span>";
    return el;
  }

  function initHero() {
    var hero = document.querySelector(".hero");
    if (!hero || hero.dataset.cinematicReady) return;
    hero.dataset.cinematicReady = "true";
    hero.classList.add("cinematic-hero");

    var media = hero.querySelector(".hero-media");
    var layer = document.createElement("div");
    layer.className = "cinematic-webgl";
    layer.setAttribute("aria-hidden", "true");
    media.appendChild(layer);

    var content = hero.querySelector(".hero-content");
    var controls = document.createElement("div");
    controls.className = "cinematic-controls";
    controls.innerHTML = '<button type="button" class="cinematic-explore" aria-pressed="false"><span aria-hidden="true">✦</span> ' + copy.explore + '</button><span class="cinematic-hint">' + copy.hint + "</span>";
    content.appendChild(controls);

    var tour = document.createElement("aside");
    tour.className = "cinematic-tour";
    tour.setAttribute("aria-label", copy.touring);
    var list = document.createElement("div");
    list.className = "cinematic-hotspot-list";
    copy.hotspots.forEach(function (item, index) { list.appendChild(button(item[0], index)); });
    var card = document.createElement("div");
    card.className = "cinematic-info-card";
    card.innerHTML = "<p>01 / 06</p><h2>" + copy.hotspots[0][0] + "</h2><span>" + copy.hotspots[0][1] + "</span>";
    tour.appendChild(list);
    tour.appendChild(card);
    hero.appendChild(tour);

    var story = document.createElement("div");
    story.className = "cinematic-story";
    story.innerHTML = "<span>" + copy.scene + "</span><i></i><b>01</b>";
    hero.appendChild(story);

    var state = { active: 0, target: 0, enabled: false, camera: null };
    function select(index) {
      state.active = index;
      state.target = index;
      list.querySelectorAll("button").forEach(function (item, i) {
        item.classList.toggle("is-active", i === index);
        item.setAttribute("aria-pressed", i === index ? "true" : "false");
      });
      card.innerHTML = "<p>" + String(index + 1).padStart(2, "0") + " / 06</p><h2>" + copy.hotspots[index][0] + "</h2><span>" + copy.hotspots[index][1] + "</span>";
      hero.style.setProperty("--cinematic-focus", index / 5);
    }
    list.addEventListener("click", function (event) {
      var item = event.target.closest("[data-hotspot]");
      if (item) select(Number(item.dataset.hotspot));
    });
    select(0);
    controls.querySelector("button").addEventListener("click", function () {
      var open = !hero.classList.contains("is-tour-open");
      hero.classList.toggle("is-tour-open", open);
      this.setAttribute("aria-pressed", open ? "true" : "false");
      this.innerHTML = "<span aria-hidden=\"true\">" + (open ? "×" : "✦") + "</span> " + (open ? copy.close : copy.explore);
      if (open) select((state.active + 1) % copy.hotspots.length);
    });

    initDepthCards();
    if (!reducedMotion && window.innerWidth >= 820 && (navigator.hardwareConcurrency || 4) >= 4) {
      initWebGL(layer, hero, state);
    }
  }

  function initDepthCards() {
    document.querySelectorAll(".hero ~ section .card").forEach(function (card) {
      if (card.dataset.depthReady) return;
      card.dataset.depthReady = "true";
      card.classList.add("cinematic-depth-card");
      card.addEventListener("pointermove", function (event) {
        if (window.innerWidth < 820 || reducedMotion) return;
        var box = card.getBoundingClientRect();
        var x = (event.clientX - box.left) / box.width - 0.5;
        var y = (event.clientY - box.top) / box.height - 0.5;
        card.style.setProperty("--rx", (-y * 4).toFixed(2) + "deg");
        card.style.setProperty("--ry", (x * 5).toFixed(2) + "deg");
      });
      card.addEventListener("pointerleave", function () { card.style.removeProperty("--rx"); card.style.removeProperty("--ry"); });
    });
  }

  function initWebGL(host, hero, state) {
    import("https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js").then(function (THREE) {
      var scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x9fafa0, 0.075);
      var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 2.3, 8.4);
      var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);
      scene.add(new THREE.HemisphereLight(0xf6d5a1, 0x152418, 2.8));
      var sun = new THREE.DirectionalLight(0xffb35a, 3.2); sun.position.set(-6, 8, 4); scene.add(sun);
      var ground = new THREE.Mesh(new THREE.CircleGeometry(17, 48), new THREE.MeshStandardMaterial({ color: 0x24412d, roughness: 1 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -1.18; scene.add(ground);
      function mesh(geometry, color, x, y, z) { var m = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: color, roughness: 0.82 })); m.position.set(x, y, z); scene.add(m); return m; }
      mesh(new THREE.BoxGeometry(4.2, 1.5, 2.6), 0x6b4b32, 0, -0.35, 0);
      var roof = mesh(new THREE.ConeGeometry(3.3, 1.55, 4), 0x27221c, 0, 1.15, 0); roof.rotation.y = Math.PI / 4;
      [[-4, -0.3, -1], [3.9, -0.3, -1.3], [-3.3, -0.3, 2.5], [4.2, -0.3, 2.2], [-5.2, -0.3, 1.4], [5.4, -0.3, -0.2]].forEach(function (p, i) {
        var trunk = mesh(new THREE.CylinderGeometry(.08, .13, 1.15, 7), 0x382d1d, p[0], p[1], p[2]);
        mesh(new THREE.ConeGeometry(.68 + (i % 2) * .15, 1.9, 8), 0x214b31, p[0], p[1] + 1.1, p[2]);
      });
      var mist = mesh(new THREE.PlaneGeometry(14, 5), 0xdce6da, 0, 1.2, -3.8); mist.material.transparent = true; mist.material.opacity = .13;
      var pointer = { x: 0, y: 0 }, dragging = false;
      host.addEventListener("pointerdown", function () { dragging = true; });
      window.addEventListener("pointerup", function () { dragging = false; });
      host.addEventListener("pointermove", function (event) { if (dragging || event.pointerType === "mouse") { pointer.x = (event.offsetX / host.clientWidth - .5) * 2; pointer.y = (event.offsetY / host.clientHeight - .5) * 2; } });
      host.addEventListener("wheel", function (event) { event.preventDefault(); camera.position.z = Math.max(5.2, Math.min(9.5, camera.position.z + event.deltaY * .006)); }, { passive: false });
      function resize() { camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight); }
      window.addEventListener("resize", resize);
      var clock = new THREE.Clock();
      function render() {
        var t = clock.getElapsedTime();
        var scroll = Math.min(1, Math.max(0, window.scrollY / Math.max(hero.offsetHeight, 1)));
        var focus = state.target / 5 - .5;
        camera.position.x += ((pointer.x * .75 + focus * 1.4) - camera.position.x) * .025;
        camera.position.y += ((2.15 - pointer.y * .22 + scroll * .15) - camera.position.y) * .02;
        camera.lookAt(focus * 1.2, .1, 0);
        mist.position.x = Math.sin(t * .12) * .45;
        mist.material.opacity = .09 + Math.sin(t * .4) * .025;
        roof.rotation.y = Math.PI / 4 + Math.sin(t * .09) * .018;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      render();
    }).catch(function () { hero.classList.add("cinematic-fallback"); });
  }

  function initGallery() {
    var gallery = document.querySelector(".masonry");
    if (!gallery) return;
    gallery.classList.add("cinematic-gallery");
    gallery.querySelectorAll("[data-category]").forEach(function (item, i) {
      item.classList.add("cinematic-gallery-item");
      item.style.setProperty("--gallery-z", (i % 3) * 12 + "px");
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", isKannada ? "ಚಿತ್ರವನ್ನು ದೊಡ್ಡದಾಗಿ ನೋಡಿ" : "View image larger");
      function open() { document.body.classList.add("cinematic-lightbox-open"); item.classList.add("is-viewing"); }
      item.addEventListener("click", open);
      item.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") open(); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { document.body.classList.remove("cinematic-lightbox-open"); gallery.querySelectorAll(".is-viewing").forEach(function (i) { i.classList.remove("is-viewing"); }); } });
  }

  /* This file is inserted dynamically by main.js after DOMContentLoaded. */
  initHero();
  initGallery();
})();
