const wifiPassword = "G03382284212";
const passwordNode = document.getElementById("password");
const showPasswordButton = document.getElementById("showPassword");
const copyPasswordButton = document.getElementById("copyPassword");
let visible = false;

showPasswordButton.addEventListener("click", () => {
  visible = !visible;
  passwordNode.textContent = visible ? wifiPassword : "•••••••••••";
  showPasswordButton.textContent = visible ? "Скрыть пароль" : "Показать пароль";
});

async function copyWifiPassword(button, defaultLabel) {
  try {
    await navigator.clipboard.writeText(wifiPassword);
    button.textContent = "Скопировано";
    window.setTimeout(() => button.textContent = defaultLabel, 1800);
  } catch {
    passwordNode.textContent = wifiPassword;
    visible = true;
    showPasswordButton.textContent = "Скрыть пароль";
    button.textContent = "Пароль показан выше";
    window.setTimeout(() => button.textContent = defaultLabel, 2200);
  }
}

copyPasswordButton.addEventListener("click", () => {
  copyWifiPassword(copyPasswordButton, "Копировать пароль");
});

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
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && wifiDialog.classList.contains("is-open")) {
    closeWifiDialog();
  }
});


const wifiNetworkName = "GUEST_TRAVEL_5G";

async function copyNetworkName(button, feedback) {
  try {
    await navigator.clipboard.writeText(wifiNetworkName);
  } catch {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = wifiNetworkName;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand("copy");
    temporaryInput.remove();
    if (!copied) {
      feedback.textContent = "Скопировать не удалось — введите имя вручную";
      return;
    }
  }
  feedback.textContent = "Имя сети скопировано";
  button.classList.add("is-copied");
  window.setTimeout(() => {
    feedback.textContent = "";
    button.classList.remove("is-copied");
  }, 2200);
}

const copyNetworkNameButton = document.getElementById("copyNetworkName");
const copyNetworkNameInDialogButton = document.getElementById("copyNetworkNameInDialog");
const ssidCopyFeedback = document.getElementById("ssidCopyFeedback");
const ssidCopyFeedbackInDialog = document.getElementById("ssidCopyFeedbackInDialog");
copyNetworkNameButton.addEventListener("click", () => copyNetworkName(copyNetworkNameButton, ssidCopyFeedback));
copyNetworkNameInDialogButton.addEventListener("click", () => copyNetworkName(copyNetworkNameInDialogButton, ssidCopyFeedbackInDialog));
