import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ConfirmationModal, DropdownList } from "@components";
import { useSelector } from "@hooks";
import { TravelState } from "@interfaces/enums/TravelState";
import { mapTravelText } from "../../utils";
import DriverService from "@services/driver.service";
import QueryKeys from "@constants/queryKeys.constants";

interface Props {
  driverCode: string;
}

export default function DriverActions({ driverCode }: Props) {
  const { selectedTravel, setSelectedTravel } = useSelector(
    (state) => state.travel
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newState: TravelState) =>
      DriverService.modifyOffer({
        travelId: selectedTravel?.id!,
        travelState: newState,
      }),
    onMutate: (newState) => {
      const previous = selectedTravel;
      setSelectedTravel({
        ...selectedTravel!,
        state: newState,
      });
      return {
        previousState: previous,
      };
    },
    onSuccess: (_, newState) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MY_TRAVELS],
      });
      setShowConfirmationModal(false);
      if (newState === "CANCELED") toast.success("Oferta cancelada");
      else toast.success("Estado actualizado");
    },
    onError: ({ message }, __, context) => {
      setSelectedTravel(context!.previousState);
      toast.error(message);
    },
  });

  const handleClose = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirm = () => {
    if (selectedTravel) {
      mutate("CANCELED");
    }
  };

  return (
    <div className="flex flex-col w-full">
      {selectedTravel?.ownerCode === driverCode && (
        <DropdownList
          onSelect={(value) => {
            const newState = Object.values(TravelState).find(
              (val) => mapTravelText[val] === value
            ) as TravelState;
            if (newState && selectedTravel) {
              mutate(newState);
            }
          }}
          values={Object.values(TravelState)
            .filter((state) => state !== "CANCELED")
            .map((state) => mapTravelText[state])}
          selectedValue={mapTravelText[selectedTravel?.state!]}
          disabled={selectedTravel?.state === "CANCELED"}
        />
      )}
      {selectedTravel?.state === "CREATED" && (
        <button
          className="btn btn-error col-span-2"
          onClick={() => setShowConfirmationModal(true)}
        >
          Cancelar viaje
        </button>
      )}
      <ConfirmationModal
        visible={showConfirmationModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      >
        <h1 className="text-2xl font-bold text-center">Cancelar viaje</h1>
        <p className="text-center text-pretty">
          ¿Estás segur@ de que deseas cancelar el viaje?
        </p>
      </ConfirmationModal>
    </div>
  );
}
