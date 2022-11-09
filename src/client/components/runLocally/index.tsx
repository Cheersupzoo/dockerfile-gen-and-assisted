import React, { ReactFragment } from "react";
import { FcPackage, FcSettings } from "react-icons/fc";

const Status = ({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string;
  Icon?: React.FC;
}) => {
  return (
    <div className="grid grid-cols-[80px_1fr]">
      <span className="text-gray-500">{title}</span>
      <div>
        {value} {Icon && <Icon />}
      </div>
    </div>
  );
};

export const RunLocally = () => {
  return (
    <div className="flex h-full flex-col items-center mt-24 space-y-8">
      <div className="grid grid-cols-[150px_1fr]">
        <FcPackage className="animate-bounce text-[120px]" />
        <div>
          <div>Building docker image</div>
          <Status
            title="Status"
            value="Done"
            Icon={() => <span className="text-[#3EFD2D]">✓</span>}
          />
        </div>
      </div>

      <div className="grid grid-cols-[150px_1fr]">
        <FcSettings className="animate-spin text-[120px]" />
        <div>
          <div>Running docker image</div>
          <Status
            title="Status"
            value="Running"
            Icon={() => <span className="text-[#3EFD2D] text-xs">●</span>}
          />
          <Status title="Port" value="3000" />
          <Status title="CPU" value="12%" />
          <Status title="RAM" value="5%" />
        </div>
      </div>
    </div>
  );
};
