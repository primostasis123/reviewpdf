"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { CardContent } from "@/components/ui/card";
import { ChevronLeftIcon, SearchIcon } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Support = () => {
  return (
    <MaxWidthWrapper className="mb-8 mt-24 text-center ">
      <div className="grid   dark:bg-gray-900 md:grid-cols-[230px_1fr]">
        <div className="hidden md:flex flex-col border-r border-gray-200 px-2 py-4 gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10" />
            <div className="text-lg font-semibold">Your Name</div>
          </div>
          <Button className="mt-2">Compose</Button>
          <div className="grid gap-1">
            <Link className="font-medium text-base leading-6" href="#">
              Inbox
            </Link>
            <Link className="font-medium text-base leading-6" href="#">
              Sent Items
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <header className="flex items-center h-14 px-4 border-b border-gray-200 dark:border-gray-800">
            <Button className="mr-2 rounded-full">
              <ChevronLeftIcon className="w-6 h-6" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-semibold">Inbox</h1>
            <Button className="ml-auto rounded-full">
              <SearchIcon className="w-6 h-6" />
              <span className="sr-only">Search</span>
            </Button>
          </header>
          <CardContent className="p-0 flex-1">
            <Tabs defaultValue="inbox">
              <TabsContent value="inbox">
                <div className="p-4 grid gap-4">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={undefined}
                  >
                    <Avatar className="w-10 h-10 translate-y-0.5" />
                    <div className="grid gap-1">
                      <h3 className="text-lg font-semibold text-red-900">
                        Support features will soon be available for both Basic
                        and Pro users.
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {/* 5 min ago */}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={undefined}
                  >
                    {/* <Avatar className="w-10 h-10 translate-y-0.5" />
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">
                            You have a new message!
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            1 min ago
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={undefined}
                      >
                        <Avatar className="w-10 h-10 translate-y-0.5" />
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">
                            Your subscription is expiring soon!
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            2 hours ago
                          </p>
                        </div> */}
                  </div>
                </div>
              </TabsContent>
              {/* <TabsContent value="sent">
                    <div className="p-4 grid gap-4">
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={undefined}
                      >
                        <Avatar className="w-10 h-10 translate-y-0.5" />
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">
                            Your call has been confirmed.
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            5 min ago
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={undefined}
                      >
                        <Avatar className="w-10 h-10 translate-y-0.5" />
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">
                            You have a new message!
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            1 min ago
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={undefined}
                      >
                        <Avatar className="w-10 h-10 translate-y-0.5" />
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">
                            Your subscription is expiring soon!
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="create">
                    <div className="p-4 grid gap-4">
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={undefined}
                      >
                        <Avatar className="w-10 h-10 translate-y-0.5" />
                        <div className="grid gap-1">
                          <h3 className="text-lg font-semibold">New Message</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Just now
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent> */}
            </Tabs>
          </CardContent>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Support;
