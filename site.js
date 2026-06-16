const sectionLinks = Array.from(document.querySelectorAll("[data-tab-link]"));
const tabs = sectionLinks.filter((link) => link.classList.contains("tab"));
const panels = Array.from(document.querySelectorAll("[data-panel]"));

function getPanel(name) {
  return panels.find((panel) => panel.dataset.panel === name) || panels[0];
}

function activateSection(name, options = {}) {
  const { updateHash = true, scroll = true } = options;
  const panel = getPanel(name);
  const activeName = panel.dataset.panel;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.tabLink === activeName;
    tab.classList.toggle("is-active", isActive);
    if (isActive) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });

  panels.forEach((item) => {
    const isActive = item === panel;
    item.classList.toggle("is-active", isActive);
    item.hidden = !isActive;
  });

  if (updateHash && location.hash !== `#${activeName}`) {
    history.replaceState(null, "", `#${activeName}`);
  }

  if (scroll) {
    panel.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

sectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activateSection(link.dataset.tabLink);
  });
});

window.addEventListener("hashchange", () => {
  activateSection(location.hash.replace("#", "") || "home", {
    updateHash: false,
  });
});

activateSection(location.hash.replace("#", "") || "home", {
  updateHash: false,
  scroll: Boolean(location.hash),
});
