import { Chip } from "@nextui-org/react";

export interface Squad {
  name: string;
  lead: string;
  tags: string[];
  link: string;
  /*
  status: "Planning" | "In Progress" | "Complete";
  type: "Permanent" | "Ephemeral";
  */
}

export interface SquadListProps {
  squads: Squad[] | undefined;
}

export default function SquadList({ squads }: SquadListProps) {
  return squads
    ? squads.map((v, i) => {
        const tags = v.tags.map((x) => {
          return (
            <Chip
              className={
                "mr-2 " +
                (x == "In Progress"
                  ? "bg-yellow-300"
                  : x == "Complete"
                  ? "bg-green-300"
                  : x == "Planning"
                  ? "bg-blue-300"
                  : x == "Ephemeral"
                  ? "bg-pink-300"
                  : x == "Permanent"
                  ? "bg-purple-300"
                  : "")
              }
            >
              {x}
            </Chip>
          );
        });

        return (
          <a
            href={v.link}
            className={
              "p-4 hover:bg-blue-50 " + (i % 2 == 1 ? "bg-gray-100" : "")
            }
            key={i}
          >
            <h2 className="font-semibold text-lg">{v.name}</h2>
            <p className="text-sm italic">led by {v.lead}</p>
            <div className="mt-2 space-y-2">{tags}</div>
          </a>
        );
      })
    : "Loading...";
}
