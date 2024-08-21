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
        status,
        creationDate,
        lastInteractionTimestamp,
      }) => {
        return {
          name,
          lead: leadName,
          tags: tags.split(", "),
          link: "https://discord.com/channels/1247647880634695730/" + threadId,
        };
      }
    );

  return { squads: finalizedSquads, tasks };
}
