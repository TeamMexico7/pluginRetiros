browser.browserAction.onClicked.addListener(() => {
  reorderTabsByTitle();
});

function reorderTabsByTitle() {
  // Obtener la ventana activa
  browser.windows.getCurrent().then((currentWindow) => {
    // Consultar las pestañas de la ventana activa
    return browser.tabs.query({ windowId: currentWindow.id });
  }).then((tabs) => {
    // Ordenar las pestañas por título
    tabs.sort((a, b) => {
      const titleA = a.title ? a.title.toLowerCase() : "";
      const titleB = b.title ? b.title.toLowerCase() : "";
      return titleA.localeCompare(titleB);
    });

    // Mover las pestañas a su nueva posición
    const tabIds = tabs.map(tab => tab.id);
    for (let i = 0; i < tabIds.length; i++) {
      browser.tabs.move(tabIds[i], { index: i });
    }
  });
}