import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import "../main.css";
import React, { useState } from "react";
import SquadList, { Squad } from "../components/SquadList";
import TaskList, { Task } from "../components/TaskList";
import { useRouteLoaderData } from "react-router";

const Board: React.FC = () => {
  const { squads, tasks } = useRouteLoaderData("/") as {
    squads: Squad[] | undefined;
    tasks: Task[] | undefined;
  };

  const [squadsVisible, setSquadsVisible] = useState(true);
  const [tasksVisible, setTasksVisible] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 pl-2">community.2077.xyz</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="w-full flex items-center">
              <h2 className="text-xl font-semibold inline-block">
                Information
              </h2>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>
              The next onboarding call is on 110 Jarch 2077, or in 12,998 days.
            </p>
            <p>
              The next onboarding call is on 8 Decembruary 2077, or in 13,411
              days.
            </p>
          </CardBody>
        </Card>
        <Card className="self-start">
          <CardHeader>
            <div className="w-full flex items-center">
              <h2 className="text-xl font-semibold inline-block">
                Squads ({squads?.length})
              </h2>
              <Button
                isIconOnly
                onClick={() => setSquadsVisible((v) => !v)}
                className="font-semibold text-2xl ml-auto"
                size="sm"
              >
                {squadsVisible && "-"}
                {!squadsVisible && "+"}
              </Button>
            </div>
          </CardHeader>
          {squadsVisible && (
            <>
              <Divider />
              <SquadList squads={squads} />
            </>
          )}
        </Card>
        <Card className="self-start">
          <CardHeader>
            <div className="flex w-full items-center">
              <h2 className="text-xl font-semibold">
                Open Tasks ({tasks?.length})
              </h2>
              <Button
                isIconOnly
                onClick={() => setTasksVisible((v) => !v)}
                className="font-semibold text-2xl ml-auto"
                size="sm"
              >
                {tasksVisible && "-"}
                {!tasksVisible && "+"}
              </Button>
            </div>
          </CardHeader>
          {tasksVisible && (
            <>
              <Divider />
              <TaskList tasks={tasks} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Board;
