function showToast(message) {
  let container = document.getElementById("toastContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className =
      "fixed bottom-6 right-6 z-[70] flex flex-col gap-3 w-[min(20rem,calc(100vw-3rem))]";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className =
    "toast px-4 py-3 rounded-lg text-sm font-medium shadow-lg bg-gray-900 border border-gray-700 text-white";
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast--show"));

  setTimeout(() => {
    toast.classList.remove("toast--show");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}
