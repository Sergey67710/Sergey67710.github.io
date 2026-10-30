const wifiPassword = "G03382284212";
const wifiNetworkName = "GUEST_TRAVEL_5G";

async function copyWifiPassword(button, defaultLabel) {
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(wifiPassword);
      copied = true;
    }
  } catch {}

  if (!copied) {
    window.prompt("Автоматическое копирование недоступно. Скопируйте пароль:", wifiPassword);
    button.textContent = "Скопируйте пароль в окне";
    window.setTimeout(() => button.textContent = defaultLabel, 2200);
    return;
  }
  button.textContent = "Скопировано";
  window.setTimeout(() => button.textContent = defaultLabel, 1800);
}

const wifiDialog = document.getElementById("wifiDialog");
const openWifiDialogButton = document.getElementById("openWifiDialog");
const closeWifiDialogButton = document.getElementById("closeWifiDialog");
const copyDialogPasswordButton = document.getElementById("copyWifiPassword");

function openWifiDialog() {
  wifiDialog.classList.add("is-open");
  wifiDialog.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  closeWifiDialogButton.focus();
}

function closeWifiDialog() {
  wifiDialog.classList.remove("is-open");
  wifiDialog.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  openWifiDialogButton.focus();
}

openWifiDialogButton.addEventListener("click", openWifiDialog);
closeWifiDialogButton.addEventListener("click", closeWifiDialog);
wifiDialog.querySelectorAll("[data-close-wifi]").forEach((element) => {
  element.addEventListener("click", closeWifiDialog);
});
copyDialogPasswordButton.addEventListener("click", () => {
  copyWifiPassword(copyDialogPasswordButton, "Скопировать пароль");
});

async function copyNetworkName(button, feedback) {
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(wifiNetworkName);
      copied = true;
    }
  } catch {}

  if (!copied) {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = wifiNetworkName;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.left = "8px";
    temporaryInput.style.top = "8px";
    temporaryInput.style.width = "220px";
    temporaryInput.style.height = "36px";
    temporaryInput.style.fontSize = "16px";
    temporaryInput.style.opacity = "0.02";
    temporaryInput.style.zIndex = "9999";
    document.body.appendChild(temporaryInput);
    try {
      temporaryInput.focus();
      temporaryInput.select();
      temporaryInput.setSelectionRange(0, temporaryInput.value.length);
      copied = document.execCommand("copy");
    } catch {}
    temporaryInput.remove();
  }

  if (!copied) {
    window.prompt("Автоматическое копирование недоступно. Скопируйте имя сети:", wifiNetworkName);
    feedback.textContent = "Скопируйте имя сети в окне";
    return;
  }
  feedback.textContent = "Имя сети скопировано";
  button.classList.add("is-copied");
  window.setTimeout(() => {
    feedback.textContent = "";
    button.classList.remove("is-copied");
  }, 2200);
}

const copyNetworkNameInDialogButton = document.getElementById("copyNetworkNameInDialog");
const ssidCopyFeedbackInDialog = document.getElementById("ssidCopyFeedbackInDialog");
copyNetworkNameInDialogButton.addEventListener("click", () => copyNetworkName(copyNetworkNameInDialogButton, ssidCopyFeedbackInDialog));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && wifiDialog.classList.contains("is-open")) {
    closeWifiDialog();
  }
});
