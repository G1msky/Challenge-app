import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useChallengesStore } from "@/stores/challenges";
import { useUserStore } from "@/stores/user";
import { formatSiblingDate, timeAgo } from "@/utils/date";

export function useChallenges() {
  const store = useChallengesStore();
  const userStore = useUserStore();
  const {
    challenges,
    isLoading,
    error,
    joinedChallenges,
    ownChallenges,
    searchQuery,
    searchDifficulty,
  } = storeToRefs(store);

  const formatChallenges = (challenges) => {
    return challenges.map((challenge) => ({
      ...challenge,
      formattedDate: formatSiblingDate(challenge.createdAt),
      timeAgo: timeAgo(challenge.createdAt),
      formattedStartDate: formatSiblingDate(challenge.start_date),
      formattedExpirationDate: formatSiblingDate(challenge.end_date),
    }));
  };

  const filterAndSortChallenges = (
    challenges,
    searchQuery,
    searchDifficulty
  ) => {
    return challenges
      .filter((challenge) => {
        const title = challenge.title?.toLowerCase() || "";
        const category = challenge.category?.toLowerCase() || "";
        const query = searchQuery.value?.toLowerCase() || "";
        const difficulty = searchDifficulty.value?.toLowerCase() || "";
        return (
          (title.includes(query) || category.includes(query)) &&
          challenge.difficulty.toLowerCase().includes(difficulty)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const formattedChallenges = computed(() => {
    return formatChallenges(challenges.value);
  });

  const formattedJoinedChallenges = computed(() => {
    return formatChallenges(joinedChallenges.value);
  });

  const formattedOwnChallenges = computed(() => {
    return formatChallenges(ownChallenges.value);
  });

  const sortedChallenges = computed(() => {
    return filterAndSortChallenges(
      formattedChallenges.value,
      searchQuery,
      searchDifficulty
    );
  });

  const sortedJoinedChallenges = computed(() => {
    return filterAndSortChallenges(
      formattedJoinedChallenges.value,
      searchQuery,
      searchDifficulty
    );
  });

  const sortedOwnChallenges = computed(() => {
    return filterAndSortChallenges(
      formattedOwnChallenges.value,
      searchQuery,
      searchDifficulty
    );
  });

  const isParticipant = (challenge) => {
    if (!challenge) {
      console.log("Challenge is undefined");
      return false;
    }

    if (!challenge.participants) {
      console.log("Participants is undefined");
      return false;
    }

    if (!userStore.user?.id) {
      console.log("User is not authenticated");
      return false;
    }

    return challenge.participants.some(
      (participant) => +participant.userId === userStore.user.id
    );
  };

  const getChallengeById = computed(() => (id) => {
    // First check in public challenges
    let challenge = challenges.value.find((c) => c.id === id);

    // Then check in joined challenges
    if (!challenge) {
      challenge = joinedChallenges.value.find((c) => c.id === id);
    }

    // Finally check in own challenges
    if (!challenge) {
      challenge = ownChallenges.value.find((c) => c.id === id);
    }

    return challenge;
  });

  const fetchChallengeById = async (id) => {
    return await store.fetchChallengeById(id);
  };

  return {
    // Реактивные состояния из store
    sortedChallenges,
    sortedJoinedChallenges,
    sortedOwnChallenges,
    getChallengeById,
    isLoading,
    isParticipant,
    searchQuery,
    searchDifficulty,
    setSearchQuery: store.setSearchQuery,
    setSearchDifficulty: store.setSearchDifficulty,
    error,
    // Методы из store
    fetchChallenges: store.fetchChallenges,
    createChallenge: store.createChallenge,
    joinChallenge: store.joinChallenge,
    removeChallenge: store.removeChallenge,
    fetchJoinedChallenges: store.fetchJoinedChallenges,
    fetchOwnChallenges: store.fetchOwnChallenges,
    fetchChallengeById,
  };
}
