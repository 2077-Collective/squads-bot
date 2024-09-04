import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link as NextuiLink,
} from "@nextui-org/react";
import { useParams, useRouteLoaderData } from "react-router";
import { Squad } from "../components/SquadList";
import TaskList, { Task } from "../components/TaskList";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

function SquadDetails() {
  const { squads, tasks } = useRouteLoaderData("root") as {
    squads: Squad[] | undefined;
    tasks: Task[] | undefined;
  };

  const { squadId } = useParams();

  const squad = useMemo(
    () => squads?.find((v) => v.id == squadId),
    [squadId, squads]
  );

  const squadTasks = useMemo(
    () => tasks?.filter((v) => v.squad == squadId),
    [tasks, squadId]
  );

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 pl-2">2077 Community Dashboard</h1>
      <Breadcrumbs className="pl-2 pb-4">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{squad?.name}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="self-start border-cyan-400 border">
          <CardHeader>
            <div>
              <h1 className="text-2xl font-semibold">{squad?.name}</h1>
              <p>
                {squad?.lead != "Not set" ? (
                  <>This squad is led by {squad?.lead}</>
                ) : (
                  "This squad does not have a lead"
                )}
                .
              </p>
              <p>Created on {squad?.creationDate.toLocaleString()}.</p>
              <p>
                Last interacted with{" "}
                {squad?.lastInteractionDate.toLocaleString()}.
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {/* todo: format it like an actual fucking msg */}
            <Markdown className="prose-invert">{squad?.desc}</Markdown>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              className="max-w-fit"
              as={NextuiLink}
              color="primary"
              showAnchorIcon
              href={
                "https://discord.com/channels/1247647880634695730/" + squadId
              }
            >
              Go to squad
            </Button>
          </CardFooter>
        </Card>{" "}
        <Card className="self-start border-cyan-400 border">
          <CardHeader>
            <h1 className="text-2xl font-semibold">Tasks</h1>
          </CardHeader>
          <Divider />
          <CardBody>
            <TaskList tasks={squadTasks} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SquadDetails;
