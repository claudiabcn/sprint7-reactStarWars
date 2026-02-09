import { Actor } from "../../config/types";
import { IMAGE_BASE_URL } from "../../config/appData";
import { Card } from "./Card";

interface ActorCardProps {
  actor: Actor;
  onClick?: (actor: Actor) => void;
}

export function ActorCard({ actor, onClick }: ActorCardProps) {
  return (
    <Card onClick={() => onClick?.(actor)}>
      <div className="aspect-[2/3] bg-purple-100 overflow-hidden rounded-lg -m-4 mb-3">
        {actor.profile_path ? (
          <img
            src={`${IMAGE_BASE_URL}${actor.profile_path}`}
            alt={actor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-purple-300">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="font-bold text-purple-900 text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
        {actor.name}
      </h3>
      {actor.character && (
        <p className="text-xs text-gray-500 truncate">
          as {actor.character}
        </p>
      )}
    </Card>
  );
}