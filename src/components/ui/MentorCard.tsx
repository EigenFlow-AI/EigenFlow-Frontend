import { Star, Clock } from "lucide-react";

interface MentorCardProps {
  name: string;
  title: string;
  company: string;
  avatar?: string;
  isTopRated?: boolean;
  isAvailable?: boolean;
  isDiscover?: boolean;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function MentorCard({
  name,
  title,
  company,
  avatar,
  isTopRated = false,
  isAvailable = false,
  isDiscover = false,
  description,
  buttonText,
  onButtonClick,
}: MentorCardProps) {
  if (isDiscover) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white min-w-[240px] sm:min-w-[280px] flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Discover mentors</h3>
          <p className="text-blue-100 text-sm">{description}</p>
        </div>
        <button
          onClick={onButtonClick}
          className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
          {buttonText}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 min-w-[240px] sm:min-w-[280px] relative">
      {isTopRated && (
        <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
          Top rated
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-600 font-medium text-lg">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
      </div>

      {isAvailable && (
        <div className="flex items-center gap-1 mb-3">
          <Clock className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-600 font-medium">
            Available ASAP
          </span>
        </div>
      )}

      <button
        onClick={onButtonClick}
        className="w-full bg-violet-600 text-white py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors">
        Book Session
      </button>
    </div>
  );
}
