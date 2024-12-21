export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatSiblingDate = (date) => {
  if (!date) return "";
  date = date.split("T")[0];
  const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2))
    .toLocaleDateString("en-CA")
    .split("T")[0];
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toLocaleDateString("en-CA")
    .split("T")[0];
  const today = new Date().toLocaleDateString("en-CA").split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toLocaleDateString("en-CA")
    .split("T")[0];
  const nextDay = new Date(new Date().setDate(new Date().getDate() + 2))
    .toLocaleDateString("en-CA")
    .split("T")[0];

  if (date === today) return "Сегодня";
  if (date === tomorrow) return "Завтра";
  if (date === nextDay) return "Послезавтра";
  if (date === twoDaysAgo) return "Позавчера";
  if (date === yesterday) return "Вчера";
  return formatDate(date);
};

export const timeAgo = (date) => {
  if (!date) return "";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    год: 31536000,
    месяц: 2592000,
    неделя: 604800,
    день: 86400,
    час: 3600,
    минута: 60,
    секунда: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      let unitName = unit;
      if (interval > 1) {
        switch (unit) {
          case "год":
            unitName = "года";
            break;
          case "месяц":
            unitName = "месяца";
            break;
          case "неделя":
            unitName = "недели";
            break;
          case "день":
            unitName = "дня";
            break;
          case "час":
            unitName = "часа";
            break;
          case "минута":
            unitName = "минут";
            break;
          case "секунда":
            unitName = "секунд";
            break;
        }
      }
      return `${interval} ${unitName} назад`;
    }
  }

  return "только что";
};
