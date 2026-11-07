"use client";

import { motion } from "framer-motion";
import SocialMediaHandleButton, {
    SocialMedia,
    SocialMediaType,
} from "./SocialMedia";

export default function Member({ member }: { member: TeamMember }) {
    return (
        <motion.div
            className="flex flex-col justify-center items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

            <motion.img
                src={member.imageURL}
                alt={`${member.firstName} ${member.lastName} profile picture`}
                className="w-48 h-48 object-cover rounded-full shadow-lg relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            />

            <span className="flex flex-col mt-6 justify-center items-center relative z-10">
                <motion.p
                    className="font-semibold text-center my-1 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {member.honorifics ? `${member.honorifics} ` : ""}
                    {member.lastName}, {member.firstName}
                </motion.p>
                <motion.p
                    className="text-center font-medium text-gray-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {member.post}
                </motion.p>
                {member.bio && (
                    <motion.p
                        className="text-center text-sm text-gray-500 mt-2 px-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {member.bio}
                    </motion.p>
                )}
                <motion.div
                    className="links-container flex flex-row gap-x-3 mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {member.linkedinURL && (
                        <SocialMediaHandleButton
                            url={member.linkedinURL}
                            socialMedia={
                                new SocialMedia(SocialMediaType.LINKEDIN)
                            }
                        />
                    )}
                    {member.githubURL && (
                        <SocialMediaHandleButton
                            url={member.githubURL}
                            socialMedia={
                                new SocialMedia(SocialMediaType.GITHUB)
                            }
                        />
                    )}
                    {member.leetcodeURL && (
                        <SocialMediaHandleButton
                            url={member.leetcodeURL}
                            socialMedia={
                                new SocialMedia(SocialMediaType.LEETCODE)
                            }
                        />
                    )}
                    {member.twitterURL && (
                        <SocialMediaHandleButton
                            url={member.twitterURL}
                            socialMedia={
                                new SocialMedia(SocialMediaType.TWITTER)
                            }
                        />
                    )}
                </motion.div>
            </span>
        </motion.div>
    );
}
