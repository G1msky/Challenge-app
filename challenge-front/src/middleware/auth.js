import { useUserStore } from "@/stores/user";

export default function auth(to, from, next) {
  const userStore = useUserStore();

  // Проверяем, авторизован ли пользователь
  if (userStore.isAuthenticated) {
    // Если авторизован и пытается зайти на страницу авторизации, перенаправляем на профиль
    if (to.path === "/") {
      return next({ path: "/profile" }); // Перенаправляем на страницу профиля
    }
  } else {
    // Если не авторизован, перенаправляем на страницу авторизации
    if (to.path !== "/") {
      return next({ path: "/" }); // Перенаправляем на страницу авторизации
    }
  }

  next(); // Если все проверки пройдены, продолжаем
}
