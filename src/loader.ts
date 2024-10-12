import { Squad } from "./components/SquadList";
import { Task } from "./components/TaskList";

export async function loader() {
  const s = await fetch("https://collective.mrkiter.com/squads");
  const t = await fetch("https://collective.mrkiter.com/tasks");
  const l = await fetch("https://collective.mrkiter.com/leaderboard");

  const squads: {
    name: string;
    leadname: string;
    tags: string;
    threadId: string;
    status: string;
    creationDate: string;
    lastInteractionTimestamp: string;
    firstmessage: string;
  }[] = await s.json();
  const tasks: {
    name: string;
    description: string;
    threadid: string;
    xp: number;
    createdby: string;
    status: "deleted" | "1";
    createdtimestamp: string | number;
    endtimestamp: string | number;
  }[] = await t.json();

  const finalizedSquads: Squad[] = squads
    .filter((v) => v.status == "active" && !v.tags.includes("Completed"))
    .map(
      ({
        name,
        leadname,
        tags,
        threadId,
        creationDate,
        firstmessage,
        lastInteractionTimestamp,
      }) => {
        return {
          name,
          lead: leadname,
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
    .map(
      ({ createdby, description, name, threadid, xp, endtimestamp }, index) => {
        return {
          name,
          description,
          author: createdby,
          dueDate: new Date(endtimestamp),
          id: index,
          squad: threadid,
          xp,
        };
      }
    );

  return {
    tasks: finalizedTasks,
    squads: finalizedSquads,
    leaderboard: await l.json(),
  };
}
