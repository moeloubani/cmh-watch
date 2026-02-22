import { CommunityStory } from "@/lib/types";

export function StoryCard({ story }: { story: CommunityStory }) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <time>{story.incidentDateRange}</time>
        {story.department && (
          <>
            <span>·</span>
            <span>{story.department}</span>
          </>
        )}
      </div>
      <p className="mt-3 text-gray-700 leading-relaxed">{story.story}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-500">— {story.attribution}</span>
        <time className="text-gray-400">
          Published{" "}
          {new Date(story.publishedDate).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
    </article>
  );
}
