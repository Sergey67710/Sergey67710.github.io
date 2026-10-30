const wifiPassword = "G03382284212";
const passwordNode = document.getElementById("password");
let visible = false;
document.getElementById("showPassword").addEventListener("click", () => {
  visible = !visible;
  passwordNode.textContent = visible ? wifiPassword : "•••••••••••";
  document.getElementById("showPassword").textContent = visible ? "Скрыть пароль" : "Показать пароль";
});
document.getElementById("copyPassword").addEventListener("click", async () => {
  const button = document.getElementById("copyPassword");
  try {
    await navigator.clipboard.writeText(wifiPassword);
    button.textContent = "Скопировано";
    setTimeout(() => button.textContent = "Копировать пароль", 1800);
  } catch {
    passwordNode.textContent = wifiPassword;
    visible = true;
    document.getElementById("showPassword").textContent = "Скрыть пароль";
    button.textContent = "Выделите пароль выше";
  }
});
