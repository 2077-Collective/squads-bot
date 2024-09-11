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
  Link,
} from "@nextui-org/react";
import "../main.css";
import React, { useMemo, useState } from "react";
import SquadList, { Squad } from "../components/SquadList";
import TaskList, { Task } from "../components/TaskList";
import { useRouteLoaderData } from "react-router";
import Leaderboard, { XPList } from "../components/Leaderboard";

const Board: React.FC = () => {
  const { squads, tasks, leaderboard } = useRouteLoaderData("root") as {
    squads: Squad[] | undefined;
    tasks: Task[] | undefined;
    leaderboard: XPList | undefined;
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
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4">
        <Card className="border-cyan2077 border col-span-6 md:col-span-7">
          <CardHeader>
            <div className="w-full flex items-center">
              <h2 className="text-xl font-semibold inline-block">
                Information
              </h2>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4">
            <p>
              Welcome to the <b>2077 Community Dashboard</b>, a place to quickly
              view squads and available tasks!
            </p>
            <ul className="list-disc list-inside">
              <li>Onboarding calls happen every Monday and Friday</li>
              <li>
                Join our Discord server at{" "}
                <Link href="https://discord.gg/2077collective">
                  2077collective
                </Link>
                <br /> (onboarding calls happen here)
              </li>
              <li>
                Follow us on Twitter at{" "}
                <Link href="https://x.com/2077Collective" showAnchorIcon>
                  @2077Collective
                </Link>
              </li>
            </ul>
          </CardBody>
        </Card>
        <Card className="border-cyan2077 border h-72 col-span-6 md:col-span-5">
          <CardHeader>
            <div className="w-full flex items-center">
              <h2 className="text-xl font-semibold inline-block">
                XP Leaderboard
              </h2>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Leaderboard list={leaderboard} />
          </CardBody>
        </Card>
        <Card className="self-start border-cyan2077 border col-span-6">
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
        <Card className="self-start border-cyan2077 border col-span-6">
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
