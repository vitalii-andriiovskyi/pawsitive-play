import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import type { AIHouse } from "@/front-end/features/ai-houses/domain/ai-house.model";
import { Button } from "primereact/button";

interface Props {
  house: AIHouse;
  onLike?: () => void;
  onUnlike?: () => void;
}

const AIHouseCard: React.FC<Props> = ({
  house,
  onLike = () => {},
  onUnlike = () => {},
}) => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const isLiked =
    isLoggedIn && house.likes?.includes(session?.user?.id as string);

  const firstImage = house.images[0];
  const address = [
    house.address.street,
    house.address.city,
    house.address.state,
    house.address.zip,
    house.address.country,
  ]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="border-primary-900/30 rounded-lg border p-4 shadow-md">
      <Image
        src={firstImage?.src || ""}
        alt={firstImage?.alt || house.name || "House Image"}
        className="h-48 w-full rounded object-cover"
        width={500}
        height={300}
      />
      <div className="flex items-center justify-between py-3">
        <h2 className="font-primary text-primary-900 mt-2 text-3xl font-bold">
          {house.name}
        </h2>

        <div className="text-primary-900 font-primary translate-y-0.5 text-5xl font-bold">
          ${house.price}
        </div>
      </div>

      <p>{address}</p>
      <p className="mt-3">
        <strong>Rooms:</strong> {house.rooms}
      </p>
      <p>
        <strong>Area:</strong> {house.area} m²
      </p>
      <p>
        <strong>Rating:</strong> {house.rating}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {house.available ? "Available" : "Not Available"}
      </p>
      <div className="mt-6 flex justify-between gap-2">
        <span> {house.likes?.length || 0} liked</span>
        {isLoggedIn && isLiked && (
          <Button
            tooltip="Unlike"
            rounded
            aria-label="Favorite"
            text
            raised
            className="hover:bg-primary-900/10! bg-primary-900/20! hover:shadow-primary-900/90 -mt-[20px]"
            onClick={onUnlike}
          >
            🤍
          </Button>
        )}
        {isLoggedIn && !isLiked && (
          <Button
            tooltip="Like"
            rounded
            aria-label="Favorite"
            text
            raised
            className="hover:bg-primary-900/0! hover:shadow-primary-900/90 -mt-[20px]"
            onClick={onLike}
          >
            💞
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIHouseCard;
