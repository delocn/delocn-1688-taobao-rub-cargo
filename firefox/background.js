// Фоновый сервис-воркер DeloCN Helper (Manifest V3)
// Синхронизирует актуальные курсы валют и контакты с https://delocn.com/structured-tariffs.json

const DEFAULT_CONFIG = {
  cny_1688_rub: 12.90,
  cny_invoice_rub: 12.75,
  cny_cb_rub: 12.35,
  usd_cargo_rub: 92.50,
  tg_bot_url: "https://t.me/delocn_bot",
  tg_bot_username: "delocn_bot",
  tg_manager_url: "https://t.me/delocn",
  tg_manager_username: "delocn",
  auto_badge_enabled: true,
  updated_at: "2026"
};

const api = typeof browser !== "undefined" ? browser : chrome;

async function syncRatesFromDeloCN() {
  try {
    const resp = await fetch("https://delocn.com/structured-tariffs.json", {
      method: "GET",
      cache: "no-store"
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    const rates = data.exchange_rates_rub || {};
    const contacts = data.contact_channels || {};
    const patch = {
      cny_1688_rub: parseFloat(rates.cny_1688_rub) || DEFAULT_CONFIG.cny_1688_rub,
      cny_invoice_rub: parseFloat(rates.cny_invoice_rub) || DEFAULT_CONFIG.cny_invoice_rub,
      cny_cb_rub: parseFloat(rates.cny_cb_rub) || DEFAULT_CONFIG.cny_cb_rub,
      usd_cargo_rub: parseFloat(rates.usd_cargo_rub) || DEFAULT_CONFIG.usd_cargo_rub,
      tg_bot_url: contacts.telegram_bot_24_7 || DEFAULT_CONFIG.tg_bot_url,
      tg_manager_url: contacts.telegram_online_manager || DEFAULT_CONFIG.tg_manager_url,
      updated_at: data.updated_date || new Date().toISOString().slice(0, 10)
    };
    await api.storage.local.set({ delocn_config: patch });
    return patch;
  } catch (e) {
    return null;
  }
}

api.runtime.onInstalled.addListener(async () => {
  const stored = await api.storage.local.get(["delocn_config"]);
  if (!stored || !stored.delocn_config) {
    await api.storage.local.set({ delocn_config: DEFAULT_CONFIG });
  }
  await syncRatesFromDeloCN();
});

api.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.action === "SYNC_RATES") {
    syncRatesFromDeloCN().then((res) => {
      sendResponse({ ok: Boolean(res), config: res });
    });
    return true;
  }
  return false;
});
