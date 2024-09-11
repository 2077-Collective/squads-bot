export type XPList = {
  discordid: string;
  username: string;
  xp: number;
}[];

export interface LeaderboardProps {
  list: XPList;
}
export default function Leaderboard({ list }: LeaderboardProps) {
  return list
    .sort((a, b) => a.xp - b.xp)
    .map(({ username, xp }) => {
      //
    });
}
