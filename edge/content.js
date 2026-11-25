// Контентный скрипт DeloCN Helper для 1688.com, Taobao.com, Tmall.com, Poizon (Dewu.com)
// Автоматически переводит цены в юанях (¥ / ￥) в российские рубли (₽) и добавляет виджет быстрого выкупа.

(function () {
  const api = typeof browser !== "undefined" ? browser : chrome;
  let currentRate = 12.90;
  let tgBotUrl = "https://t.me/delocn_bot";
  let tgMgrUrl = "https://t.me/delocn";
  let badgeEnabled = true;

  function formatRub(val) {
    return Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function injectFloatingBar() {
    if (document.getElementById("delocn-floating-bar")) return;
    const bar = document.createElement("div");
    bar.id = "delocn-floating-bar";

    const botLink = tgBotUrl + "?start=buyout_1688";
    const mgrLink = tgMgrUrl;

    const hdr = document.createElement("div");
    hdr.className = "df-hdr";

    const brand = document.createElement("div");
    brand.className = "df-brand";
    const sDelo = document.createElement("span");
    sDelo.textContent = "DELO";
    const sCn = document.createElement("span");
    sCn.className = "df-pill";
    sCn.textContent = "CN";
    const sSub = document.createElement("span");
    sSub.style.fontWeight = "600";
    sSub.style.fontSize = "11px";
    sSub.style.color = "#CBD5E1";
    sSub.textContent = "Выкуп в ₽";
    brand.appendChild(sDelo);
    brand.appendChild(sCn);
    brand.appendChild(sSub);

    const minBtn = document.createElement("button");
    minBtn.type = "button";
    minBtn.className = "df-toggle";
    minBtn.id = "delocn-df-min-btn";
    minBtn.title = "Свернуть/Развернуть";
    minBtn.textContent = "–";

    hdr.appendChild(brand);
    hdr.appendChild(minBtn);

    const body = document.createElement("div");
    body.className = "df-body";

    const rateRow = document.createElement("div");
    rateRow.className = "df-rate-row";
    const rateLbl = document.createElement("span");
    rateLbl.textContent = "Курс выкупа 1688/Taobao:";
    const rateVal = document.createElement("strong");
    rateVal.style.color = "#0F3D3E";
    rateVal.id = "delocn-df-rate";
    rateVal.textContent = currentRate.toFixed(2) + " ₽ / ¥";
    rateRow.appendChild(rateLbl);
    rateRow.appendChild(rateVal);

    const descDiv = document.createElement("div");
    descDiv.style.fontSize = "11px";
    descDiv.style.color = "#475569";
    descDiv.style.marginBottom = "8px";
    descDiv.textContent = "Комиссия выкупа от 3% • Проверка на складе в Иу (2 200 м²) • Доставка по 16 спецлиниям.";

    const aBot = document.createElement("a");
    aBot.href = botLink;
    aBot.target = "_blank";
    aBot.rel = "noopener";
    aBot.className = "df-btn-tg";
    aBot.textContent = "🤖 Рассчитать выкуп этого товара в Боте";

    const aMgr = document.createElement("a");
    aMgr.href = mgrLink;
    aMgr.target = "_blank";
    aMgr.rel = "noopener";
    aMgr.className = "df-btn-mgr";
    aMgr.textContent = "👨‍💼 Отправить ссылку Онлайн-менеджеру";

    body.appendChild(rateRow);
    body.appendChild(descDiv);
    body.appendChild(aBot);
    body.appendChild(aMgr);

    bar.appendChild(hdr);
    bar.appendChild(body);
    document.body.appendChild(bar);

    minBtn.addEventListener("click", () => {
      bar.classList.toggle("delocn-minimized");
      minBtn.textContent = bar.classList.contains("delocn-minimized") ? "₽" : "–";
    });
  }

  function convertPricesOnPage() {
    if (!badgeEnabled) return;

    const selectors = [
      ".price-text",
      ".price-num",
      ".value",
      "[class*='price']",
      "[class*='Price']",
      ".tb-rmb-num",
      ".tm-price"
    ];

    const candidates = document.querySelectorAll(selectors.join(","));
    const cnyRegex = /(?:[¥￥]|CNY)\s*(\d+(?:[.,]\d{1,2})?)|^(\d{1,6}(?:\.\d{1,2})?)$/;

    candidates.forEach((el) => {
      if (el.dataset && el.dataset.delocnConverted === "1") return;
      if (el.children.length > 2) return;
      const rawText = (el.textContent || "").trim();
      if (!rawText || rawText.length > 24) return;

      const hasCurrency = /[¥￥]/.test(rawText) || (el.previousElementSibling && /[¥￥]/.test(el.previousElementSibling.textContent || ""));
      const m = rawText.match(cnyRegex);
      if (!m) return;

      const numStr = (m[1] || m[2] || "").replace(",", ".");
      const cnyVal = parseFloat(numStr);
      if (!cnyVal || cnyVal <= 0 || cnyVal > 5000000) return;
      if (!hasCurrency && !/price|Price|rmb/i.test(el.className || "")) return;

      el.dataset.delocnConverted = "1";
      const rubVal = formatRub(cnyVal * currentRate);

      const badge = document.createElement("span");
      badge.className = "delocn-rub-badge";
      badge.title = "Пересчёт DeloCN по курсу выкупа " + currentRate.toFixed(2) + " ₽/¥";
      const tagSpan = document.createElement("span");
      tagSpan.className = "delocn-tag";
      tagSpan.textContent = "₽";
      badge.appendChild(tagSpan);
      badge.appendChild(document.createTextNode(" ≈ " + rubVal + " ₽"));
      el.insertAdjacentElement("afterend", badge);
    });
  }

  function initContentScript() {
    api.storage.local.get(["delocn_config", "auto_badge_enabled"], (res) => {
      if (res && res.delocn_config) {
        currentRate = parseFloat(res.delocn_config.cny_1688_rub) || 12.90;
        tgBotUrl = res.delocn_config.tg_bot_url || tgBotUrl;
        tgMgrUrl = res.delocn_config.tg_manager_url || tgMgrUrl;
      }
      if (res && typeof res.auto_badge_enabled === "boolean") {
        badgeEnabled = res.auto_badge_enabled;
      }
      injectFloatingBar();
      convertPricesOnPage();

      const observer = new MutationObserver(() => {
        convertPricesOnPage();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContentScript);
  } else {
    initContentScript();
  }
})();
