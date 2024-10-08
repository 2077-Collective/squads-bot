import { Link } from "@nextui-org/react";

export interface Task {
  name: string;
  description: string;
  author: string;
  dueDate: Date;
  squad: string;
  //skills: string[];
  id: number;
  xp: number;
}

export interface TaskListProps {
  tasks: Task[] | undefined;
}

export default function TaskList({ tasks }: TaskListProps) {
  return tasks
    ? tasks.map((v, i) => {
        return (
          <div
            className={"p-4 " + (i % 2 == 1 ? "bg-content2" : "")}
            key={v.id}
          >
            <h2 className="font-semibold text-lg">
              #{v.id}: {v.name} ({v.xp} XP)
            </h2>
            <p className="text-sm italic">
              created by {v.author} {v.squad && `for ${v.squad}.`}
            </p>
            <p className="text-sm italic">due {v.dueDate.toLocaleString()}</p>
            <p>{v.description}</p>
            {v.squad && (
              <div className="mt-2">
                <Link
                  href={`https://discord.com/channels/1247647880634695730/${v.squad}`}
                  showAnchorIcon
                  size="sm"
                >
                  Go to squad
                </Link>
              </div>
            )}
          </div>
        );
      })
    : "Loading...";
}
