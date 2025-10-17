"use client";
import React from "react";
import { useAIHouses } from "@/front-end/features/ai-houses/use-cases/ai-house.usecases";
import AIHouseCard from "@/front-end/features/ai-houses/components/AIHouseCard";

const AIHouses: React.FC = () => {
  const { houses, isLoading, error, like, unlike } = useAIHouses();

  if (isLoading) return <div>Loading houses...</div>;
  if (error) return <div>Error loading houses</div>;
  if (!houses || houses.length === 0) return <div>No houses found.</div>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {houses.map((house) => (
        <AIHouseCard
          key={house._id}
          house={house}
          onLike={() => like(house._id)}
          onUnlike={() => unlike(house._id)}
        />
      ))}
    </div>
  );
};

export default AIHouses;
