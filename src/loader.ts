import { Squad } from "./components/SquadList";
import { Task } from "./components/TaskList";

export async function loader() {
  const s = await fetch("https://collective.mrkiter.com/squads");
  const t = await fetch("https://collective.mrkiter.com/tasks");

  const squads: {
    name: string;
    leadName: string;
    tags: string;
    threadId: string;
    status: string;
    creationDate: string;
    lastInteractionTimestamp: string;
    firstmessage: string;
  }[] = await s.json();
  const tasks: {
    id: number;
    name: string;
    description: string;
    threadId: string;
    xp: number;
    createdBy: string;
    status: "deleted" | "1";
    createdTimestamp: string | number;
    endTimestamp: string | number;
  }[] = await t.json();

  const finalizedSquads: Squad[] = squads
    .filter((v) => v.status == "active")
    .map(
      ({
        name,
        leadName,
        tags,
        threadId,
        creationDate,
        firstmessage,
        lastInteractionTimestamp,
      }) => {
        return {
          name,
          lead: leadName,
          tags: tags.split(", "),
          id: threadId,
          creationDate: new Date(Number(creationDate) * 1000),
          lastInteractionDate: new Date(
            Number(lastInteractionTimestamp) * 1000
          ),
          desc: firstmessage,
        };
      }
    );

  console.log(tasks);
  const finalizedTasks: Task[] = tasks
    .filter((v) => v.status != "deleted")
    .map(({ createdBy, description, name, id, threadId, xp, endTimestamp }) => {
      return {
        name,
        description,
        author: createdBy,
        dueDate: new Date(endTimestamp),
        id,
        squad: threadId,
        xp,
      };
    });

  return { tasks: finalizedTasks, squads: finalizedSquads };
}
