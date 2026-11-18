// 報名表：算總計，依選擇顯示／隱藏區塊。隱藏的欄位一律 disabled，瀏覽器不檢查也不送出。
// 金額與欄位的最後檢查在後端（oseling-tw-site 的 lib/register.js），這裡只是方便填寫。
(function () {
  var f = document.getElementById("reg");
  if (!f) return;
  var PLAQUE = 1000, PATRON = 24000, ATM_MAX = 49999;
  var ITEMS = ["item_offer", "item_lamp", "item_flower", "item_meal", "item_center", "item_manang"];

  function val(n) { var el = f.querySelector('[name="' + n + '"]:checked'); return el ? el.value : ""; }
  function num(n) { var v = String(f.elements[n].value).replace(/[,\s]/g, ""); return /^\d+$/.test(v) ? Number(v) : 0; }

  function total() {
    var t = (f.elements.plaque.checked ? PLAQUE : 0) + (f.elements.patron.checked ? PATRON : 0);
    ITEMS.forEach(function (k) { t += num(k); });
    return t;
  }

  function show(key, on) {
    f.querySelectorAll('[data-show="' + key + '"]').forEach(function (el) {
      el.hidden = !on;
      el.querySelectorAll("input,textarea,select").forEach(function (i) { i.disabled = !on; });
    });
  }

  function update() {
    var t = total(), pay = val("pay"), receipt = val("receipt");
    document.getElementById("total").textContent = "NT$" + t.toLocaleString("en-US");
    show("attend-yes", val("attend") === "yes");
    show("plaque", f.elements.plaque.checked);
    show("pay", t > 0);
    show("atm-ok", t > 0 && t <= ATM_MAX);
    if (t > ATM_MAX && pay === "atm") { f.querySelector('[name="pay"][value="atm"]').checked = false; pay = ""; }
    show("receipt-any", t > 0 && (receipt === "paper" || receipt === "tax"));
    show("receipt-paper", t > 0 && receipt === "paper");
    show("receipt-tax", t > 0 && receipt === "tax");
    show("pay-card", t > 0 && pay === "card");
    show("pay-atm", t > 0 && pay === "atm");
    show("pay-transfer", t > 0 && pay === "transfer");
    f.elements.phone.required = val("attend") === "yes";
    document.getElementById("go").textContent = t > 0 && (pay === "card" || pay === "atm") ? "送出報名並前往付款" : "送出報名";
  }

  f.addEventListener("input", update);
  f.addEventListener("change", update);
  f.addEventListener("submit", function (e) {
    var msg = "";
    if (f.elements.plaque.checked && !f.elements.plaque_life.value.trim() && !f.elements.plaque_dead.value.trim())
      msg = "設立牌位請至少填寫一位長壽祈福或亡者超薦的姓名。";
    else if (val("attend") === "no" && total() === 0) msg = "不克前來的法友，請登記牌位或填寫隨喜護持金額。";
    var err = document.getElementById("err");
    err.hidden = !msg; err.textContent = msg;
    if (msg) { e.preventDefault(); err.scrollIntoView({ block: "center" }); return; }
    var b = document.getElementById("go"); b.disabled = true; b.textContent = "送出中……";   // 防止連按送出兩次
  });
  window.addEventListener("pageshow", function () { document.getElementById("go").disabled = false; update(); });   // 從藍新按上一頁回來
  update();
})();
