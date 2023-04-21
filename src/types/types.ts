export type DataProps = {
  immortal_1_threshold: number;
  immortal_2_threshold: number;
  immortal_3_threshold: number;
  last_update: number;
  next_update: number;
  radiant_threshold: number;
  total_players: number;
  players: {
    IsAnonymized: boolean;
    IsBanned: boolean;
    PlayerCardID: string;
    TitleID: string;
    competitiveTier: number;
    gameName: string;
    leaderboardRank: number;
    numberOfWins: number;
    puuid: string;
    rankedRating: number;
    tagLine: string;
  }[];
};

export type HeaderProps = {
  immortal_1_threshold: number;
  immortal_2_threshold: number;
  immortal_3_threshold: number;
  last_update: number;
  next_update: number;
  radiant_threshold: number;
  total_players: number;
};

export type CardProps = {
  map: string | undefined;
  start: number | undefined;
  duration: number | undefined;
  player: {
    assets: {
      agentPic: {
        bust: string | undefined;
        full: string | undefined;
        killfeed: string | undefined;
        small: string | undefined;
      };
      cardImg: {
        large: string | undefined;
        small: string | undefined;
        wide: string | undefined;
      };
    };

    character: string | undefined;
    stats: {
      kills: number | undefined;
      assists: number | undefined;
      death: number | undefined;
    };
    team: string | undefined;
  };
  teams: {
    blue: {
      has_won: boolean | null;
    };
    red: {
      has_won: boolean | null;
    };
  };
};

export type PlayersProp = {
  IsAnonymized: boolean;
  IsBanned: boolean;
  PlayerCardID: string;
  TitleID: string;
  competitiveTier: number;
  gameName: string;
  leaderboardRank: number;
  numberOfWins: number;
  puuid: string;
  rankedRating: number;
  tagLine: string;
};

export type LiProps = {
  IsAnonymized: boolean;
  IsBanned: boolean;
  competitiveTier: number;
  gameName: string;
  leaderboardRank: number;
  numberOfWins: number;
  rankedRating: number;
  tagLine: string;
  region: string;
};

export interface PostType {
    createdAt: string,
    authorName: string,
    authorAvatar: string,
    postText: string,
    postImage: string,
    id: string
}

