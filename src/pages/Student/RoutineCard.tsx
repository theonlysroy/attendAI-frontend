import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Link } from "react-router-dom";
import { Class } from "./Routine";

export default function RoutineCard({ semClass }) {
  return (
    <CardContainer className="">
      <CardBody className="bg-background relative group/card  dark:hover:shadow-2xl dark:hover:shadow-primary/[0.2] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {semClass.paperCode}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 font-semibold text-md max-w-sm mt-2 dark:text-neutral-300"
        >
          {semClass.paperName}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {semClass.startTime} - {semClass.endTime}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {semClass.teacher}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
