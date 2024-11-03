import { Card, CardDescription, CardTitle } from "@/components/ui/card";

function DashboardOverviewCard({
  title,
  Icon,
  description,
  values,
}: {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  values: number | undefined;
}) {
  return (
    <Card className="rounded-lg w-full border-2 shadow-md p-5 flex flex-col gap-3 ">
      <CardTitle className="flex flex-row justify-between items-center font-medium ">
        <h6 className="leading-4 ">{title}</h6>
        <div className="w-7 h-7 flex items-center justify-center rounded-full">
          <Icon className="mr-3 h-4 w-4" />
        </div>
      </CardTitle>
      <CardDescription className="font-bold text-2xl">
        +{values}
      </CardDescription>
      <CardDescription className="text-base font-medium">
        {description}
      </CardDescription>
    </Card>
  );
}

export default DashboardOverviewCard;
