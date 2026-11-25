// Логика всплывающего окна DeloCN Helper (Калькулятор 16 линий + Выкуп 1688 + Оплата инвойсов)
const PARTNER_TARIFFS = [{"id": "mono_express", "name_cn": "1. 北疆单品专线 (灯具/家具/餐具/五金/文具/美妆工具/宠物/饰品)", "name_ru": "Моно-груз Экспресс (свет, мебель, посуда, хозтовары, декор — 1 наименование)", "note_ru": "Кроме светильников не допускаются товары с АКБ. Свыше 40 м³ — спецтариф. Без бирки +$0.2/кг.", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "8–10 дней", "under_100_m3": 310.0, "tiers": [[400, 1.4], [300, 1.5], [250, 1.6], [200, 1.7], [190, 1.8], [180, 1.9], [170, 2.0], [160, 2.1], [150, 2.2], [140, 2.3], [130, 2.4], [120, 2.5], [110, 2.6], [100, 2.7]]}, "almaty": {"city_ru": "Алматы", "days_ru": "4–5 дней", "under_100_m3": 270.0, "tiers": [[400, 1.0], [300, 1.1], [250, 1.2], [200, 1.3], [190, 1.4], [180, 1.5], [170, 1.6], [160, 1.7], [150, 1.8], [140, 1.9], [130, 2.0], [120, 2.1], [110, 2.2], [100, 2.3]]}}}, {"id": "general_express", "name_cn": "2. 北疆百货 — 特快小百 (9-11天)", "name_ru": "Сборные хозтовары (Малый опт) — Авто-Экспресс", "note_ru": "Универсальная быстрая линия для сборных партий и товаров народного потребления. Без бирки +$0.2/кг.", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "9–11 дней", "under_100_m3": 400.0, "tiers": [[400, 2.3], [350, 2.35], [300, 2.4], [250, 2.45], [200, 2.5], [190, 2.6], [180, 2.7], [170, 2.8], [160, 2.9], [150, 3.0], [140, 3.1], [130, 3.2], [120, 3.3], [110, 3.4], [100, 3.5]]}, "almaty": {"city_ru": "Алматы", "days_ru": "6–8 дней", "under_100_m3": 400.0, "tiers": [[400, 2.3], [350, 2.35], [300, 2.4], [250, 2.45], [200, 2.5], [190, 2.6], [180, 2.7], [170, 2.8], [160, 2.9], [150, 3.0], [140, 3.1], [130, 3.2], [120, 3.3], [110, 3.4], [100, 3.5]]}}}, {"id": "general_air", "name_cn": "3. 北疆百货 — 空运小百 (6-9天)", "name_ru": "Сборные хозтовары — Авиа-Экспресс", "note_ru": "Скоростная доставка сборных грузов (без электронных сигарет, майнеров, телефонов и жидкостей).", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "6–9 дней", "under_100_m3": 410.0, "tiers": [[400, 2.4], [350, 2.45], [300, 2.5], [250, 2.55], [200, 2.6], [190, 2.7], [180, 2.8], [170, 2.9], [160, 3.0], [150, 3.1], [140, 3.2], [130, 3.3], [120, 3.4], [110, 3.5], [100, 3.6]]}, "almaty": {"city_ru": "Алматы", "days_ru": "4–5 дней", "under_100_m3": 410.0, "tiers": [[400, 2.4], [350, 2.45], [300, 2.5], [250, 2.55], [200, 2.6], [190, 2.7], [180, 2.8], [170, 2.9], [160, 3.0], [150, 3.1], [140, 3.2], [130, 3.3], [120, 3.4], [110, 3.5], [100, 3.6]]}}}, {"id": "fabric_line", "name_cn": "4. 北疆布料专线 (12-15天)", "name_ru": "Ткани и текстильные рулоны (Спецлиния)", "note_ru": "Только для тканей (при смешивании с другими товарами считается по тарифу Хозтовары Экспресс). Алматы −$0.4/кг.", "free_ins_usd_kg": 3.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "12–15 дней", "under_100_m3": 280.0, "tiers": [[400, 1.0], [350, 1.1], [300, 1.2], [250, 1.3], [200, 1.4], [190, 1.5], [180, 1.6], [170, 1.7], [160, 1.8], [150, 1.9], [140, 2.0], [130, 2.1], [120, 2.2], [110, 2.3], [100, 2.4]]}, "almaty": {"city_ru": "Алматы", "days_ru": "8–10 дней", "under_100_m3": 240.0, "tiers": [[400, 0.6], [350, 0.7], [300, 0.8], [250, 0.9], [200, 1.0], [190, 1.1], [180, 1.2], [170, 1.3], [160, 1.4], [150, 1.5], [140, 1.6], [130, 1.7], [120, 1.8], [110, 1.9], [100, 2.0]]}}}, {"id": "tools_furniture_line", "name_cn": "5. 北疆电动&手动工具/家具/餐具/灯具/头饰 特快单品 (12-15天)", "name_ru": "Электро- и ручной инструмент, мебель, посуда, свет (Моно-партия)", "note_ru": "Каждое наименование отправляется отдельно без смешивания. Плотность от 600 кг/м³ — от $1.00/кг!", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "12–15 дней", "under_100_m3": 290.0, "tiers": [[600, 1.0], [400, 1.1], [300, 1.2], [250, 1.3], [200, 1.4], [190, 1.5], [180, 1.6], [170, 1.7], [160, 1.8], [150, 1.9], [140, 2.0], [130, 2.1], [120, 2.2], [110, 2.3], [100, 2.4]]}}}, {"id": "clothing_express", "name_cn": "6. 北疆服装 — 特快服装 (8-10天)", "name_ru": "Одежда — Авто-Экспресс (8–10 дней)", "note_ru": "Специализированная линия для коммерческих партий одежды. Обязательное покрытие страховки $7/кг.", "free_ins_usd_kg": 7.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "8–10 дней", "under_100_m3": 530.0, "tiers": [[400, 3.0], [350, 3.1], [300, 3.2], [250, 3.3], [200, 3.4], [190, 3.5], [180, 3.6], [170, 3.7], [160, 3.8], [150, 3.9], [140, 4.0], [130, 4.1], [120, 4.2], [110, 4.3], [100, 4.4]]}, "almaty": {"city_ru": "Алматы", "days_ru": "5–7 дней", "under_100_m3": 530.0, "tiers": [[400, 3.0], [350, 3.1], [300, 3.2], [250, 3.3], [200, 3.4], [190, 3.5], [180, 3.6], [170, 3.7], [160, 3.8], [150, 3.9], [140, 4.0], [130, 4.1], [120, 4.2], [110, 4.3], [100, 4.4]]}}}, {"id": "clothing_air", "name_cn": "7. 北疆服装 — 空运服装 (6-8天)", "name_ru": "Одежда — Авиа-Экспресс (6–8 дней)", "note_ru": "Сверхбыстрая доставка сезонных коллекций одежды в Москву и Алматы.", "free_ins_usd_kg": 7.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "6–8 дней", "under_100_m3": 540.0, "tiers": [[400, 3.1], [350, 3.2], [300, 3.3], [250, 3.4], [200, 3.5], [190, 3.6], [180, 3.7], [170, 3.8], [160, 3.9], [150, 4.0], [140, 4.1], [130, 4.2], [120, 4.3], [110, 4.4], [100, 4.5]]}, "almaty": {"city_ru": "Алматы", "days_ru": "3–5 дней", "under_100_m3": 540.0, "tiers": [[400, 3.1], [350, 3.2], [300, 3.3], [250, 3.4], [200, 3.5], [190, 3.6], [180, 3.7], [170, 3.8], [160, 3.9], [150, 4.0], [140, 4.1], [130, 4.2], [120, 4.3], [110, 4.4], [100, 4.5]]}}}, {"id": "shoes_express", "name_cn": "8. 北疆特快鞋专线 (12-15天)", "name_ru": "Обувь — Спецлиния Экспресс (12–15 дней)", "note_ru": "Только для обувных партий без смешивания с другими категориями товаров.", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "12–15 дней", "under_100_m3": 400.0, "tiers": [[200, 2.3], [190, 2.4], [180, 2.5], [170, 2.6], [160, 2.7], [150, 2.8], [140, 2.9], [130, 3.0], [120, 3.1], [110, 3.2], [100, 3.3]]}}}, {"id": "toys_express", "name_cn": "9. 北疆玩具专线 (8-10天)", "name_ru": "Игрушки — Экспресс линия (8–10 дней)", "note_ru": "Специальный тариф для детских игрушек и игровых наборов.", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "8–10 дней", "under_100_m3": 330.0, "tiers": [[400, 1.3], [350, 1.4], [300, 1.5], [250, 1.6], [200, 1.7], [190, 1.8], [180, 1.9], [170, 2.0], [160, 2.1], [150, 2.2], [140, 2.3], [130, 2.4], [120, 2.5], [110, 2.6], [100, 2.7]]}}}, {"id": "appliances_express", "name_cn": "10. 北疆小家电专线 (厨房电器/音响/投影/风扇/扫地机/加湿器 9-11天)", "name_ru": "Мелкая бытовая техника и электроника (9–11 дней)", "note_ru": "Кухонная техника, колонки, проекторы, вентиляторы, роботы-пылесосы, фены, увлажнители, ТВ.", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "9–11 дней", "under_100_m3": 330.0, "tiers": [[300, 1.6], [250, 1.7], [200, 1.8], [190, 1.9], [180, 2.0], [170, 2.1], [160, 2.2], [150, 2.3], [140, 2.4], [130, 2.5], [120, 2.6], [110, 2.7], [100, 2.8]]}}}, {"id": "ecom_parcels", "name_cn": "11. 电商小包裹专线 (单件≤2KG快递件: 莫斯科/阿拉木图/比什凯克)", "name_ru": "Малые посылки E-commerce (курьерские отправления до 2 кг)", "note_ru": "Каждая индивидуальная посылка внутри мешка должна иметь курьерскую маркировку и вес до 2 кг (кроме одежды).", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "9–12 дней", "under_100_m3": 400.0, "tiers": [[140, 3.2], [130, 3.3], [120, 3.4], [110, 3.5], [100, 3.6]]}, "almaty": {"city_ru": "Алматы", "days_ru": "5–8 дней", "under_100_m3": 300.0, "tiers": [[140, 2.4], [100, 2.5]]}, "bishkek": {"city_ru": "Бишкек", "days_ru": "5–8 дней", "under_100_m3": 280.0, "tiers": [[160, 2.0], [140, 2.1], [120, 2.2], [100, 2.3]]}}}, {"id": "south_general_std", "name_cn": "12. 南疆普快百货 (18-25天)", "name_ru": "Хозтовары Стандарт (Южный маршрут — 18–25 дней)", "note_ru": "Экономичный тариф для регулярных сборных партий хозтоваров. Без бирки +$0.2/кг.", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "18–25 дней", "under_100_m3": 360.0, "tiers": [[400, 2.1], [350, 2.2], [300, 2.3], [250, 2.4], [200, 2.5], [190, 2.6], [180, 2.7], [170, 2.8], [160, 2.9], [150, 3.0], [140, 3.1], [130, 3.2], [120, 3.3], [110, 3.4], [100, 3.5]]}}}, {"id": "south_mono_cat1", "name_cn": "13. 南疆单品百货 (一类/二类/三类/A类 15-18天，超高密度低至$0.85/kg)", "name_ru": "Моно-груз Стандарт (15–18 дней, для плотных грузов до 1000+ кг/м³)", "note_ru": "Базовый расчёт по I категории (для II и III категорий скидка −$0.10..$0.20/кг, для категории А +$0.10/кг).", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "15–18 дней", "under_100_m3": 310.0, "tiers": [[1000, 1.05], [800, 1.1], [600, 1.2], [500, 1.3], [400, 1.4], [350, 1.5], [300, 1.6], [250, 1.7], [200, 1.8], [190, 1.9], [180, 2.0], [170, 2.1], [160, 2.2], [150, 2.3], [140, 2.4], [130, 2.5], [120, 2.6], [110, 2.7], [100, 2.8]]}}}, {"id": "south_clothing_std", "name_cn": "14. 南疆普快服装 (18-25天)", "name_ru": "Одежда Стандарт (18–25 дней)", "note_ru": "Оптимальный маршрут для плановых поставок одежды.", "free_ins_usd_kg": 7.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "18–25 дней", "under_100_m3": 490.0, "tiers": [[400, 3.1], [300, 3.2], [200, 3.3], [190, 3.4], [180, 3.5], [170, 3.6], [160, 3.7], [150, 3.8], [140, 3.9], [130, 4.0], [120, 4.1], [110, 4.2], [100, 4.3]]}}}, {"id": "south_underwear", "name_cn": "15. 南疆内衣专线 (文胸/内裤/泳装/保暖内衣/领带/手套/腰带 18-25天)", "name_ru": "Нижнее бельё, купальники, термобельё, перчатки, ремни (18–25 дней)", "note_ru": "Выгодный спецтариф для бельевого ассортимента и аксессуаров.", "free_ins_usd_kg": 5.0, "destinations": {"moscow": {"city_ru": "Москва", "days_ru": "18–25 дней", "under_100_m3": 350.0, "tiers": [[400, 1.6], [350, 1.7], [300, 1.8], [250, 1.9], [200, 2.0], [190, 2.1], [180, 2.2], [170, 2.3], [160, 2.4], [150, 2.5], [140, 2.6], [130, 2.7], [120, 2.8], [110, 2.9], [100, 3.0]]}}}, {"id": "rail_clothing", "name_cn": "16. 铁路服装专线 (铁路普快20-25天 / 铁路慢陆25-30天)", "name_ru": "Одежда ЖД (ЖД Стандарт 20–25 дн. / ЖД Эконом 25–30 дн.)", "note_ru": "Железнодорожная доставка плотных партий одежды (от 200 кг/м³).", "free_ins_usd_kg": 7.0, "destinations": {"moscow": {"city_ru": "Москва (ЖД 25–30 дн.)", "days_ru": "25–30 дней", "under_100_m3": 450.0, "tiers": [[400, 2.0], [380, 2.1], [360, 2.2], [340, 2.3], [320, 2.4], [300, 2.5], [280, 2.6], [260, 2.7], [240, 2.8], [220, 2.9], [200, 3.0]]}, "moscow_fast_rail": {"city_ru": "Москва (ЖД Ускоренный 20–25 дн.)", "days_ru": "20–25 дней", "under_100_m3": 470.0, "tiers": [[400, 2.2], [380, 2.3], [360, 2.4], [340, 2.5], [320, 2.6], [300, 2.7], [280, 2.8], [260, 2.9], [240, 3.0], [220, 3.1], [200, 3.2]]}}}];
const api = typeof browser !== "undefined" ? browser : chrome;

let state = {
  cny_1688_rub: 12.90,
  cny_invoice_rub: 12.75,
  usd_cargo_rub: 92.50,
  tg_bot_url: "https://t.me/delocn_bot",
  tg_manager_url: "https://t.me/delocn",
  last_calc_payload: "calc"
};

function fmtNum(n) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function renderRatesHeader() {
  document.getElementById("rate-1688-val").textContent = state.cny_1688_rub.toFixed(2) + " ₽/¥";
  document.getElementById("rate-inv-val").textContent = state.cny_invoice_rub.toFixed(2) + " ₽/¥";
  document.getElementById("rate-usd-val").textContent = state.usd_cargo_rub.toFixed(2) + " ₽/$";
}

function populateCargoLines() {
  const sel = document.getElementById("calc-line");
  sel.textContent = "";
  PARTNER_TARIFFS.forEach((line, idx) => {
    const opt = document.createElement("option");
    opt.value = idx.toString();
    opt.textContent = line.name_ru;
    sel.appendChild(opt);
  });
}

function recalcCargo() {
  const lineIdx = parseInt(document.getElementById("calc-line").value || "0", 10);
  const line = PARTNER_TARIFFS[lineIdx] || PARTNER_TARIFFS[0];
  let destKey = document.getElementById("calc-dest").value || "moscow";
  if (!line.destinations[destKey]) {
    destKey = Object.keys(line.destinations)[0];
  }
  const dest = line.destinations[destKey];

  const weight = Math.max(1, parseFloat(document.getElementById("calc-weight").value) || 100);
  const vol = Math.max(0.01, parseFloat(document.getElementById("calc-vol").value) || 0.5);
  const valUsd = Math.max(10, parseFloat(document.getElementById("calc-val").value) || 1000);
  const unbranded = document.getElementById("calc-unbranded").checked;

  const density = weight / vol;
  const surcharge = unbranded ? 0.20 : 0.0;

  let freightUsd = 0;
  let rateLabel = "";

  if (density < 100) {
    const m3Rate = dest.under_100_m3;
    freightUsd = vol * m3Rate + (unbranded ? weight * 0.20 : 0);
    rateLabel = "$" + m3Rate.toFixed(0) + " / м³ (<100 кг/м³)";
  } else {
    let kgRate = dest.tiers[dest.tiers.length - 1][1];
    for (let i = 0; i < dest.tiers.length; i++) {
      if (density >= dest.tiers[i][0]) {
        kgRate = dest.tiers[i][1];
        break;
      }
    }
    const finalKgRate = kgRate + surcharge;
    freightUsd = weight * finalKgRate;
    rateLabel = "$" + finalKgRate.toFixed(2) + " / кг";
  }

  const valPerKg = valUsd / weight;
  let insPct = 0.01;
  if (valPerKg > 50) insPct = 0.03;
  else if (valPerKg > 30) insPct = 0.02;
  const insUsd = valUsd * insPct;
  const totalUsd = freightUsd + insUsd;
  const totalRub = totalUsd * state.usd_cargo_rub;

  document.getElementById("res-density").textContent = density.toFixed(1) + " кг/м³ • " + dest.days_ru;
  document.getElementById("res-rate").textContent = rateLabel;
  document.getElementById("res-breakdown").textContent =
    "$" + fmtNum(freightUsd) + " + $" + fmtNum(insUsd) + " (" + Math.round(insPct * 100) + "%)";
  document.getElementById("res-total").textContent =
    "$" + fmtNum(totalUsd) + " (≈ " + fmtNum(totalRub) + " ₽)";

  state.last_calc_payload =
    "ext_" + Math.round(weight) + "kg_" + Math.round(density) + "d_" + Math.round(totalUsd) + "usd";
}

function recalcBuyout() {
  const cny = Math.max(1, parseFloat(document.getElementById("buyout-cny").value) || 1000);
  const comm = parseFloat(document.getElementById("buyout-comm").value) || 0.03;
  const baseRub = cny * state.cny_1688_rub;
  const feeRub = baseRub * comm;
  const totalRub = baseRub + feeRub;

  document.getElementById("buy-rub-base").textContent = fmtNum(baseRub) + " ₽";
  document.getElementById("buy-rub-fee").textContent = fmtNum(feeRub) + " ₽ (" + Math.round(comm * 100) + "%)";
  document.getElementById("buy-rub-total").textContent = fmtNum(totalRub) + " ₽";
}

function recalcPayment() {
  const cny = Math.max(100, parseFloat(document.getElementById("pay-cny").value) || 10000);
  const comm = parseFloat(document.getElementById("pay-mode").value) || 0.015;
  const baseRub = cny * state.cny_invoice_rub;
  const feeRub = baseRub * comm;
  const totalRub = baseRub + feeRub;

  document.getElementById("pay-rub-base").textContent = fmtNum(baseRub) + " ₽";
  document.getElementById("pay-rub-fee").textContent = fmtNum(feeRub) + " ₽ (" + (comm * 100).toFixed(1) + "%)";
  document.getElementById("pay-rub-total").textContent = fmtNum(totalRub) + " ₽";
}

function grabActiveTabUrl() {
  if (!api.tabs || !api.tabs.query) return;
  api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs && tabs[0] && tabs[0].url) {
      const u = tabs[0].url;
      if (/1688\.com|taobao\.com|tmall\.com|dewu\.com|poizon\.com/i.test(u)) {
        document.getElementById("buyout-url").value = u;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateCargoLines();

  // Tabs switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const pane = document.getElementById(btn.dataset.tab);
      if (pane) pane.classList.add("active");
    });
  });

  // Load saved config
  api.storage.local.get(["delocn_config", "auto_badge_enabled"], (res) => {
    if (res && res.delocn_config) {
      state.cny_1688_rub = parseFloat(res.delocn_config.cny_1688_rub) || 12.90;
      state.cny_invoice_rub = parseFloat(res.delocn_config.cny_invoice_rub) || 12.75;
      state.usd_cargo_rub = parseFloat(res.delocn_config.usd_cargo_rub) || 92.50;
      state.tg_bot_url = res.delocn_config.tg_bot_url || state.tg_bot_url;
      state.tg_manager_url = res.delocn_config.tg_manager_url || state.tg_manager_url;
    }
    if (res && typeof res.auto_badge_enabled === "boolean") {
      document.getElementById("chk-auto-badge").checked = res.auto_badge_enabled;
    }
    renderRatesHeader();
    recalcCargo();
    recalcBuyout();
    recalcPayment();
  });

  grabActiveTabUrl();

  // Event listeners for calculator inputs
  ["calc-line", "calc-dest", "calc-weight", "calc-vol", "calc-val", "calc-unbranded"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", recalcCargo);
    if (el) el.addEventListener("change", recalcCargo);
  });

  ["buyout-cny", "buyout-comm"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", recalcBuyout);
    if (el) el.addEventListener("change", recalcBuyout);
  });

  ["pay-cny", "pay-mode"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", recalcPayment);
    if (el) el.addEventListener("change", recalcPayment);
  });

  document.getElementById("btn-grab-url").addEventListener("click", grabActiveTabUrl);

  document.getElementById("chk-auto-badge").addEventListener("change", (e) => {
    api.storage.local.set({ auto_badge_enabled: e.target.checked });
  });

  document.getElementById("btn-sync-rates").addEventListener("click", () => {
    const btn = document.getElementById("btn-sync-rates");
    btn.textContent = "⏳...";
    api.runtime.sendMessage({ action: "SYNC_RATES" }, (resp) => {
      if (resp && resp.ok && resp.config) {
        state.cny_1688_rub = resp.config.cny_1688_rub;
        state.cny_invoice_rub = resp.config.cny_invoice_rub;
        state.usd_cargo_rub = resp.config.usd_cargo_rub;
        renderRatesHeader();
        recalcCargo();
        recalcBuyout();
        recalcPayment();
      }
      btn.textContent = "✅ ОК";
      setTimeout(() => { btn.textContent = "🔄 Курс"; }, 1500);
    });
  });

  // Telegram CTA buttons
  document.getElementById("btn-calc-tg-bot").addEventListener("click", () => {
    window.open(state.tg_bot_url + "?start=" + encodeURIComponent(state.last_calc_payload), "_blank");
  });
  document.getElementById("btn-calc-tg-mgr").addEventListener("click", () => {
    window.open(state.tg_manager_url, "_blank");
  });
  document.getElementById("btn-buyout-tg-bot").addEventListener("click", () => {
    const cny = Math.round(parseFloat(document.getElementById("buyout-cny").value) || 5000);
    window.open(state.tg_bot_url + "?start=buyout_" + cny + "cny", "_blank");
  });
  document.getElementById("btn-buyout-tg-mgr").addEventListener("click", () => {
    window.open(state.tg_manager_url, "_blank");
  });
  document.getElementById("btn-pay-tg-mgr").addEventListener("click", () => {
    window.open(state.tg_manager_url, "_blank");
  });
});
