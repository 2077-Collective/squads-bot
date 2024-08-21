import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import "../main.css";
import React, { useState } from "react";
import SquadList, { Squad } from "../components/SquadList";
import TaskList, { Task } from "../components/TaskList";
import { useLoaderData } from "react-router";

const Board: React.FC = () => {
  const { squads, tasks } = useLoaderData() as {
    squads: Squad[] | undefined;
    tasks: Task[] | undefined;
  };

  const [squadsVisible, setSquadsVisible] = useState(true);
  const [tagsVisible, setTagsVisible] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 pl-2">community.2077.xyz</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div>
              <h2 className="text-xl font-semibold">
                Squads ({squads?.length})
              </h2>
              <Button isIconOnly>+</Button>
            </div>
          </CardHeader>
          <Divider />
          <SquadList squads={squads} />
        </Card>
        <Card className="self-start">
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Open Tasks ({tasks?.length})
            </h2>
          </CardHeader>
          <Divider />
          <div>
            <TaskList tasks={tasks} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Board;
