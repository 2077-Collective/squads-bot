import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import "../main.css";
import React, { useMemo, useState } from "react";
import SquadList, { Squad } from "../components/SquadList";
import TaskList, { Task } from "../components/TaskList";
import { useRouteLoaderData } from "react-router";

const Board: React.FC = () => {
  const { squads, tasks } = useRouteLoaderData("root") as {
    squads: Squad[] | undefined;
    tasks: Task[] | undefined;
  };

  const [squadsVisible, setSquadsVisible] = useState(true);
  const [tasksVisible, setTasksVisible] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedKeys, setSelectedKeys] = useState<any>(new Set<string>());

  const displayedSquads = useMemo(() => {
    return squads
      ?.filter((s) => [...selectedKeys].every((v) => s.tags.includes(v)))
      .sort(
        (a, b) => -a.name.localeCompare(b.name, undefined, { numeric: true })
      );
  }, [squads, selectedKeys]);

  const tags = useMemo(() => {
    const x: Set<string> = new Set();
    if (squads) {
      for (const i of squads) {
        for (const y of i.tags) {
          x.add(y);
        }
      }
    }
    return [...x.values()];
  }, [squads]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 pl-2">2077 Community Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="md:col-span-2 border-cyan2077 border">
          <CardHeader>
            <div className="w-full flex items-center">
              <h2 className="text-xl font-semibold inline-block">
                Information
              </h2>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Onboarding calls happen every Monday and Friday.</p>
          </CardBody>
        </Card>
        <Card className="self-start border-cyan2077 border">
          <CardHeader>
            <div className="w-full flex items-center">
              <h2 className="text-xl font-semibold inline-block mr-auto">
                Squads ({squads?.length})
              </h2>
              <Dropdown>
                <Badge
                  color="primary"
                  isInvisible={Array.from(selectedKeys).length == 0}
                  content={Array.from(selectedKeys).length}
                  size="lg"
                >
                  <DropdownTrigger>
                    <Button variant="bordered">Filter</Button>
                  </DropdownTrigger>
                </Badge>
                <DropdownMenu
                  aria-label="Filters"
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  closeOnSelect={false}
                  onSelectionChange={(v) => setSelectedKeys(v)}
                >
                  {tags.map((v) => (
                    <DropdownItem key={v}>{v}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button
                isIconOnly
                onClick={() => setSquadsVisible((v) => !v)}
                className="text-2xl ml-2"
                variant="bordered"
              >
                {squadsVisible && "-"}
                {!squadsVisible && "+"}
              </Button>
            </div>
          </CardHeader>
          {squadsVisible && (
            <>
              <Divider />
              <SquadList squads={displayedSquads} />
            </>
          )}
        </Card>
        <Card className="self-start border-cyan2077 border">
          <CardHeader>
            <div className="flex w-full items-center">
              <h2 className="text-xl font-semibold">
                Open Tasks ({tasks?.length})
              </h2>
              <Button
                isIconOnly
                onClick={() => setTasksVisible((v) => !v)}
                className="text-2xl ml-auto"
                variant="bordered"
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
