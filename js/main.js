/* ============================================================
   SITE CONFIG — the ONE place to update contact + booking details.
   Every WhatsApp link, call button and address on the site reads
   from here at runtime, so changing a number means editing only
   this object (also mirrored in the JSON-LD blocks in each page's
   <head> — see README.md "Admin / content configuration").
   ============================================================ */
window.SITE_CONFIG = {
  propertyName: "The Coorg Chimm's Camptime Homestay",
  phoneDisplay: "+91 99726 26256",
  phoneE164: "+919972626256",
  whatsappNumber: "919972626256",
  whatsappDefaultMessage: "Hi! I'd like to enquire about booking the entire homestay at The Coorg Chimm's Camptime Homestay.",
  addressLines: [
    "Odiyappana House, Post, Suntikoppa",
    "Gaddehalla, Uluguli Village, Uluguli",
    "Karnataka 571237, India"
  ],
  googleMapsUrl: "https://maps.app.goo.gl/PQrB6bmcCKveKeAh9",
  checkIn: "",
  checkOut: ""
};

(function () {
  "use strict";

  function whatsappHref() {
    var msg = encodeURIComponent(window.SITE_CONFIG.whatsappDefaultMessage);
    return "https://wa.me/" + window.SITE_CONFIG.whatsappNumber + "?text=" + msg;
  }
  function callHref() {
    return "tel:" + window.SITE_CONFIG.phoneE164;
  }

  function applyConfig() {
    document.querySelectorAll('[data-cta="whatsapp"]').forEach(function (el) {
      el.setAttribute("href", whatsappHref());
    });
    document.querySelectorAll('[data-cta="call"]').forEach(function (el) {
      el.setAttribute("href", callHref());
    });
    document.querySelectorAll('[data-cta="maps"]').forEach(function (el) {
      el.setAttribute("href", window.SITE_CONFIG.googleMapsUrl);
    });
    document.querySelectorAll("[data-phone-display]").forEach(function (el) {
      el.textContent = window.SITE_CONFIG.phoneDisplay;
    });
    document.querySelectorAll("[data-checkin]").forEach(function (el) {
      el.textContent = window.SITE_CONFIG.checkIn;
    });
    document.querySelectorAll("[data-checkout]").forEach(function (el) {
      el.textContent = window.SITE_CONFIG.checkOut;
    });
  }

  function initMobileMenu() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".mobile-menu");
    var close = document.querySelector(".mobile-menu-close");
    if (!toggle || !menu) return;
    function open() {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }
    function shut() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      toggle.focus();
    }
    toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", shut);
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", shut);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) shut();
    });
  }

  function initGalleryFilters() {
    var buttons = document.querySelectorAll(".filter-btn");
    var items = document.querySelectorAll("[data-category]");
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        var cat = btn.getAttribute("data-filter");
        items.forEach(function (item) {
          var show = cat === "all" || item.getAttribute("data-category") === cat;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  function initEnquiryForm() {
    var form = document.getElementById("enquiry-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var required = form.querySelectorAll("[required]");
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        if (status) {
          status.textContent = "Please fill in all required fields before sending your enquiry.";
          status.hidden = false;
        }
        return;
      }
      var data = new FormData(form);
      var lines = [
        "Booking enquiry — " + window.SITE_CONFIG.propertyName,
        "Name: " + data.get("name"),
        "Phone: " + data.get("phone"),
        "Email: " + data.get("email"),
        "Check-in: " + data.get("checkin"),
        "Check-out: " + data.get("checkout"),
        "Guests: " + data.get("guests"),
        "Message: " + data.get("message")
      ];
      var waMsg = encodeURIComponent(lines.join("\n"));
      var waUrl = "https://wa.me/" + window.SITE_CONFIG.whatsappNumber + "?text=" + waMsg;
      if (status) {
        status.innerHTML =
          'Thank you — your enquiry details are ready. <a href="' +
          waUrl +
          '" class="btn btn-whatsapp btn-sm" style="margin-top:0.75rem;">Send via WhatsApp</a>';
        status.hidden = false;
      }
      /* NOTE for site owner: this form currently hands the enquiry to
         WhatsApp so nothing is invented about backend email delivery.
         Wire it to your preferred form backend (e.g. Formspree, a
         serverless function, or your booking inbox) when ready — see
         README.md "Booking / enquiry flow". */
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initMobileMenu();
    initGalleryFilters();
    initEnquiryForm();
  });
})();
