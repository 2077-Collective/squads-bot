import { Squad } from "./components/SquadList";

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
  const tasks = await t.json();

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

  return { tasks, squads: finalizedSquads };
}
