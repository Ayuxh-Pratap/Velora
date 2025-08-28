// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {
  // UI-only props
}

const EmptyState = ({}: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-end w-full h-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="relative w-full flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Icon placeholder - you can replace with actual icon */}
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="absolute bottom-4 bg-orange-500 w-10 h-[2px] blur-sm rounded-full mx-auto"></div>
          </div>
          <h2 className="text-2xl font-medium mt-4">
            Hello there!
          </h2>
          <p className="text-muted-foreground mt-2 text-center max-w-md">
            Welcome to your AI assistant. Start a conversation by typing a message below.
          </p>
        </div>
        
        {/* Sample prompts */}
        <div className="grid w-full grid-cols-1 gap-2 mt-10 mb-6 md:grid-cols-2 max-w-2xl">
          {[
            {
              title: "Creative Writing",
              description: "Help me write a story or poem"
            },
            {
              title: "Code Assistant", 
              description: "Debug code or explain programming concepts"
            },
            {
              title: "Research Helper",
              description: "Summarize topics or answer questions"
            },
            {
              title: "Brainstorming",
              description: "Generate ideas for projects"
            }
          ].map((prompt) => (
            <div
              key={prompt.title}
              className="flex flex-col items-start w-full px-4 py-4 bg-transparent border cursor-pointer rounded-2xl border-border hover:bg-muted select-none active:scale-95 transition transform"
            >
              <h3 className="text-base font-medium">
                {prompt.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {prompt.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
