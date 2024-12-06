'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { useQueryData } from "@/app/hooks/useQueryData";

type Props = {
  activeWorkspaceId: string;
  dehydratedState: unknown; // For passing pre-fetched state
};

const Sidebar = ({ activeWorkspaceId, dehydratedState }: Props) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  const { data, isFetched } = useQueryData(
    ["user-workspaces"],
    true // enabled by default
  );

  console.log({
    "user workspace data from sidebar is: ": data,
    isFetched
  })

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full min-h-screen w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace" className="text-white">
            Select a workspace
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
          </SelectGroup>
        </SelectContent>
      </Select>

      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4 ">Workspaces</p>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <div className="full">
          <div className="md:hidden fixed my-4">
            <Sheet>
              <SheetTrigger asChild className="ml-2">
                <Button variant={"ghost"} className="mt-[2px]">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={"left"}
                className="p-0 w-fit h-full"
              >
                {SidebarSection}
              </SheetContent>
            </Sheet>
          </div>
          <div className="md:block hidden h-full">{SidebarSection}</div>
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default Sidebar;
