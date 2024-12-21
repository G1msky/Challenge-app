import { useChallengesStore } from "@/stores/challenges";
import { useUserStore } from "@/stores/user";

export default async function checkChallengeParticipation(to, from, next) {
  const challengesStore = useChallengesStore();
  const userStore = useUserStore();
  if (userStore.isAuthenticated) {
    // Получаем ID челенджа из параметров маршрута
    const challengeId = to.params.challengeId;
    console.log(challengeId);

    // Проверяем, есть ли у пользователя доступ к данным
    if (!userStore.isAuthenticated) {
      return next(); // Если пользователь не аутентифицирован, продолжаем
    }

    // Загружаем данные о челенджах
    await challengesStore.fetchJoinedChallenges();

    // Проверяем, участвует ли пользователь в челендже
    const isParticipant = challengesStore.joinedChallenges.some(
      (challenge) => challenge.id == challengeId
    );

    if (isParticipant) {
      // Если пользователь уже участвует, редиректим на страницу челенджа
      return next({ name: "challenge-detail", params: { id: challengeId } });
    }
  }
  next(); // Если не участвует, продолжаем
}
