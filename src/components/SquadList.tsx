import { Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";

export interface Squad {
  name: string;
  lead: string;
  tags: string[];
  id: string;
  desc: string;
  creationDate: Date;
  lastInteractionDate: Date;

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
                  ? "bg-yellow-500 text-black"
                  : x == "Complete"
                  ? "bg-green-500"
                  : x == "Planning"
                  ? "bg-blue-500"
                  : x == "Ephemeral"
                  ? "bg-pink-500"
                  : x == "Permanent"
                  ? "bg-purple-500"
                  : "")
              }
              key={x}
            >
              {x}
            </Chip>
          );
        });

        return (
          <Link
            to={"/squads/" + v.id}
            className={
              "p-4 hover:bg-blue-900 " + (i % 2 == 1 ? "bg-zinc-800" : "")
            }
            key={v.id}
          >
            <h2 className="font-semibold text-lg">{v.name}</h2>
            <p className="text-sm italic">led by {v.lead}</p>
            <div className="mt-2 space-y-2">{tags}</div>
          </Link>
        );
      })
    : "Loading...";
}
