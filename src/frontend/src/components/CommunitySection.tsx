import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Users } from "lucide-react";
import type { CommunityMember } from "../backend.d";
import { useGetCommunityMembersByCity } from "../hooks/useBackend";

export interface CommunitySectionProps {
  city: string;
  maxItems?: number;
  accentClass?: string;
}

export default function CommunitySection({
  city,
  maxItems = 10,
  accentClass = "",
}: CommunitySectionProps) {
  const { data: members = [], isLoading } = useGetCommunityMembersByCity(city);
  const displayed = members.slice(0, maxItems);

  return (
    <div className="space-y-3" data-ocid="community.section">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {city ? `Community — ${city}` : "Community"}
          </span>
          {!isLoading && (
            <Badge variant="outline" className="text-xs">
              {members.length}
            </Badge>
          )}
        </div>
        {members.length > maxItems && (
          <Link
            to="/community"
            className="text-xs text-primary hover:underline"
            data-ocid="community.view-all_link"
          >
            View All
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((k) => (
            <Skeleton key={k} className="h-12 rounded-lg" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div
          className="text-center py-6 text-muted-foreground text-sm"
          data-ocid="community.empty_state"
        >
          <Users className="w-6 h-6 mx-auto mb-1 opacity-30" />
          No community members found for this city
        </div>
      ) : (
        <div className="space-y-2">
          {displayed.map((m: CommunityMember, idx: number) => (
            <div
              key={m.phone}
              className={`flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/40 transition-colors ${accentClass}`}
              data-ocid={`community.member.item.${idx + 1}`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">
                  {m.name?.charAt(0)?.toUpperCase() ?? "?"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {m.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <Phone className="w-3 h-3" /> {m.phone}
                  </span>
                  {m.apartmentName && (
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="w-3 h-3" /> {m.apartmentName}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 shrink-0">
                {m.roles.slice(0, 2).map((r) => (
                  <Badge
                    key={r}
                    variant="outline"
                    className="text-[10px] px-1.5 py-0.5"
                  >
                    {r}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
