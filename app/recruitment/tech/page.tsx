import { TechUrl } from "@/data/recruitmentData";

export default function TechRecruitment() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-sky-800">Tech Team Recruitment</h1>
            <p className="text-gray-700 mb-4">
                Join our Technical team and work on cutting-edge software, web development, ML, and Web3 projects!
            </p>
            <div className="w-full max-w-4xl mx-auto mt-8">
                <div className="mb-4 text-center">
                    <a
                        href={TechUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-800 hover:text-sky-600 underline font-medium"
                    >
                        Click here if the form doesn't load below
                    </a>
                </div>
                <iframe
                    src={TechUrl}
                    width="100%"
                    height="1200"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    className="rounded-lg shadow-lg border-2 border-gray-200"
                >
                    Loading...
                </iframe>
            </div>
        </div>
    );
}

