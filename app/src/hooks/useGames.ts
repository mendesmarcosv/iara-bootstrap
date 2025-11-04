// Hook para buscar jogos da RAWG API
import { useState, useEffect, useCallback } from 'react';
import { fetchGames, fetchGameDetails, Game, GameFilters } from '../lib/api/games';

export const useGames = (filters: GameFilters = {}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(filters.page || 1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const loadGames = useCallback(async (currentPage: number, currentFilters: GameFilters) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchGames({
        ...currentFilters,
        page: currentPage,
      });

      setGames(response.results);
      setTotalCount(response.count);
      setHasMore(!!response.next);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar jogos');
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGames(page, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters.search, filters.ordering, filters.genres, filters.platforms]);

  const nextPage = useCallback(() => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const refresh = useCallback(() => {
    loadGames(page, filters);
  }, [page, filters, loadGames]);

  return {
    games,
    loading,
    error,
    page,
    hasMore,
    totalCount,
    nextPage,
    prevPage,
    goToPage,
    refresh,
  };
};

// Hook para buscar detalhes de um jogo específico
export const useGameDetails = (id: number | string | undefined) => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadGameDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchGameDetails(id);
        setGame(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar detalhes do jogo');
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    loadGameDetails();
  }, [id]);

  return { game, loading, error };
};

