// RAWG API - Catálogo de Jogos
import axios from 'axios';

const RAWG_BASE_URL = 'https://api.rawg.io/api';
const RAWG_KEY = process.env.REACT_APP_RAWG_KEY;

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string | null;
  rating: number;
  rating_top: number;
  ratings_count: number;
  released: string;
  genres: Array<{ id: number; name: string; slug: string }>;
  platforms: Array<{
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
  short_screenshots?: Array<{
    id: number;
    image: string;
  }>;
  description_raw?: string;
  metacritic?: number;
  playtime?: number;
  esrb_rating?: {
    name: string;
  };
}

export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface GameFilters {
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  genres?: string;
  platforms?: string;
}

// Buscar lista de jogos
export const fetchGames = async (filters: GameFilters = {}): Promise<GamesResponse> => {
  if (!RAWG_KEY) {
    throw new Error('RAWG API Key não configurada. Configure REACT_APP_RAWG_KEY no arquivo .env');
  }

  try {
    const params = {
      key: RAWG_KEY,
      page: filters.page || 1,
      page_size: filters.page_size || 20,
      ...(filters.search && { search: filters.search }),
      ...(filters.ordering && { ordering: filters.ordering }),
      ...(filters.genres && { genres: filters.genres }),
      ...(filters.platforms && { platforms: filters.platforms }),
    };

    const response = await axios.get<GamesResponse>(`${RAWG_BASE_URL}/games`, { params });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || 'Erro ao buscar jogos. Tente novamente.'
    );
  }
};

// Buscar detalhes de um jogo
export const fetchGameDetails = async (id: number | string): Promise<Game> => {
  if (!RAWG_KEY) {
    throw new Error('RAWG API Key não configurada. Configure REACT_APP_RAWG_KEY no arquivo .env');
  }

  try {
    const response = await axios.get<Game>(`${RAWG_BASE_URL}/games/${id}`, {
      params: { key: RAWG_KEY },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || 'Erro ao buscar detalhes do jogo. Tente novamente.'
    );
  }
};

// Buscar gêneros disponíveis
export const fetchGenres = async () => {
  if (!RAWG_KEY) {
    throw new Error('RAWG API Key não configurada');
  }

  try {
    const response = await axios.get(`${RAWG_BASE_URL}/genres`, {
      params: { key: RAWG_KEY },
    });
    return response.data.results;
  } catch (error: any) {
    throw new Error('Erro ao buscar gêneros');
  }
};

// Buscar plataformas disponíveis
export const fetchPlatforms = async () => {
  if (!RAWG_KEY) {
    throw new Error('RAWG API Key não configurada');
  }

  try {
    const response = await axios.get(`${RAWG_BASE_URL}/platforms`, {
      params: { key: RAWG_KEY },
    });
    return response.data.results;
  } catch (error: any) {
    throw new Error('Erro ao buscar plataformas');
  }
};

