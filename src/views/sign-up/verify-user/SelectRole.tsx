import { useSelector } from "@hooks";
import { SignUpData } from "@store/signup/types";

import { IconSteeringWheel, IconUser } from "@tabler/icons-react";
import { capitalize } from "@utils/capitalize";

interface Props {
  userId: string;
  name: string;
}

export default function SelectRole({ userId, name }: Props) {
  const { setUserData } = useSelector((state) => state.signUp);
  const handleContinue = (role: "driver" | "passenger") => () => {
    const userData: Partial<SignUpData> = {
      userId,
      role,
    };
    setUserData(userData);
  };
  return (
    <div className=" flex flex-col items-center justify-center">
      <h3 className="font-bold text-center text-2xl">
        ¡Bienvenid@ a Carpool, {capitalize(name)}! 😁
      </h3>
      <h3 className="text-center text-balance">¿Cómo usarás la app?</h3>
      <div className="w-full flex gap-5 h-32 mt-3">
        <button className="flex-grow " onClick={handleContinue("driver")}>
          <div className="card h-full w-full flex flex-col items-center gap-2  shadow-xl">
            <IconSteeringWheel stroke={2} size={64} opacity={0.7} />
            Conductor
          </div>
        </button>
        <button className="flex-grow" onClick={handleContinue("passenger")}>
          <div className="card h-full w-full flex flex-col items-center gap-2 shadow-xl">
            <IconUser stroke={2} size={64} opacity={0.7} />
            <span>Pasajero</span>
          </div>
        </button>
      </div>
      <p className="mt-2 text-center text-pretty text-base-content text-opacity-50">
        Podrás usarla de ambas maneras más adelante
      </p>
    </div>
  );
}
