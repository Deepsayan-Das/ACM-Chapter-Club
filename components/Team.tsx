"use client";

import { motion } from "framer-motion";
import { coreTeam } from "../data/CoreTeam";
import { faculty } from "../data/Faculty";
import { mlTeam } from "../data/mlTeam";
import { webDevTeam } from "../data/webDevTeam";
import { web3Team } from "../data/web3Team";
import { contentTeam } from "../data/contentTeam";
import { prTeam } from "../data/prTeam";
import Member from "./Member";
import CoreTeamBackground from "./backgrounds/CoreTeamBackground";
import FacultyBackground from "./backgrounds/FacultyBackground";
import Web3Background from "./backgrounds/Web3Background";
import WebDevBackground from "./backgrounds/WebDevBackground";
import MLBackground from "./backgrounds/MLBackground";
import ContentBackground from "./backgrounds/ContentBackground";
import PRBackground from "./backgrounds/PRBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const teams = [
    {
        id: "core",
        name: "Core Team",
        data: coreTeam,
        background: <CoreTeamBackground />,
        borderColor: "border-gray-200",
    },
    {
        id: "faculty",
        name: "Faculty",
        data: faculty,
        background: <FacultyBackground />,
        borderColor: "border-amber-200",
    },
    {
        id: "web3",
        name: "Web3 Team",
        data: web3Team,
        background: <Web3Background />,
        borderColor: "border-purple-200",
    },
    {
        id: "webdev",
        name: "Web Dev",
        data: webDevTeam,
        background: <WebDevBackground />,
        borderColor: "border-green-200",
    },
    {
        id: "ml",
        name: "ML Team",
        data: mlTeam,
        background: <MLBackground />,
        borderColor: "border-orange-200",
    },
    {
        id: "content",
        name: "Content",
        data: contentTeam,
        background: <ContentBackground />,
        borderColor: "border-rose-200",
    },
    {
        id: "pr",
        name: "PR Team",
        data: prTeam,
        background: <PRBackground />,
        borderColor: "border-cyan-200",
    },
];

export default function Team() {
    return (
        <section id="team" className="p-16 my-10 bg-gray-50">
            <motion.h1
                className="mb-10 text-5xl font-medium drop-shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Our Team
            </motion.h1>

            <Tabs defaultValue="core" className="w-full">
                <TabsList className="flex flex-wrap h-auto gap-2 mb-8 bg-white/80 p-2 rounded-xl shadow-sm">
                    {teams.map((team) => (
                        <TabsTrigger
                            key={team.id}
                            value={team.id}
                            className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                        >
                            {team.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {teams.map((team) => (
                    <TabsContent key={team.id} value={team.id}>
                        <motion.div
                            className={`relative rounded-2xl p-8 overflow-hidden border ${team.borderColor}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {team.background}
                            <h2 className="mb-6 text-3xl font-medium relative z-10">
                                {team.name}
                            </h2>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                                {team.data.map((member, index) => (
                                    <motion.div
                                        key={member.linkedinURL || `${team.id}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Member member={member} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}
