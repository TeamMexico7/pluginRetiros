browser.contextMenus.create({
  id: "open-links",
  title: "Abrir Tarjetas",
  contexts: ["link"],
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
  const linkUrl = info.linkUrl;
  const linkText = linkUrl.substring(linkUrl.lastIndexOf('=') + 1);

  const urls = [
    `https://tmbo.mx/bo/player!view?userId=${linkText}`,
    `https://tmbo.mx/bo/playerPayments!view?userId=${linkText}`,
    `https://tmbo.mx/bo/alarms!search?userId=${linkText}&alarmStatus=open`,
  ];

  urls.forEach((url) => {
    browser.tabs.create({ url: url, active: false });
  });
});