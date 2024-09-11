export type XPList = {
  discordid: string;
  username: string;
  xp: number;
}[];

export interface LeaderboardProps {
  list?: XPList;
}
export default function Leaderboard({ list }: LeaderboardProps) {
  return list
    ? list
        .sort((a, b) => b.xp - a.xp)
        .map(({ username, xp }, i) => {
          return (
            <div
              key={username}
              className={
                "flex justify-between items-center p-4 " +
                (i % 2 == 1 ? "bg-content2" : "")
              }
            >
              <span>
                <span className="font-semibold text-2xl">#{i + 1}</span>{" "}
                <span>{username}</span>
              </span>
              <span className="font-semibold">{xp} XP</span>
            </div>
          );
        })
    : undefined;
}
