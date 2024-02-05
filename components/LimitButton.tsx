import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const LimitButton = () => {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Monthly Upload Limit Reached",
          description:
            "Oops! It looks like you've hit your monthly limit for PDF uploads. To continue uploading, please consider upgrading your plan or wait until the start of the next month. Thank you for your understanding!",
        })
      }
    >
      Upload PDF
    </Button>
  );
};
