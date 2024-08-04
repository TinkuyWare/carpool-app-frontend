import type { Passenger } from "@interfaces/models/passenger.d.ts";
import { Travel, TravelOffer, TravelRequest } from "@interfaces/models/travel";
import { PaginatedResponse } from "@interfaces/paginatedResponse.interface";
import { http } from "@utils/http";
import { getCookie } from "react-use-cookie";

export type InsertTravelRequest = {
  travelDate: string;
  direction: boolean;
  customPoint: string;
  numPassengers: number;
  forSelf: boolean;
};

class PassengerService {
  public static async getPassengerByCode(
    code: Passenger["code"]
  ): Promise<Passenger> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`passenger/user/${code}`, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }

  public static async newRequest(
    data: InsertTravelRequest
  ): Promise<TravelRequest["id"]> {
    const token = getCookie("tkn");
    try {
      const res = await http.post("passenger/new-request", data, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data as TravelRequest["id"];
    } catch (error) {
      throw new Error();
    }
  }

  public static async joinRequest(
    travelId: Travel["id"]
  ): Promise<TravelRequest["id"]> {
    const token = getCookie("tkn");
    try {
      const res = await http.post(
        "passenger/join-request",
        { travelId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!res.success) throw new Error(res.message);
      return res.data as TravelRequest["id"];
    } catch (error) {
      throw new Error();
    }
  }

  public static async acceptOffer(
    travelId: TravelOffer["id"]
  ): Promise<Travel["id"]> {
    const token = getCookie("tkn");
    try {
      const res = await http.post(
        "passenger/accept-offer",
        { travelId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!res.success) throw new Error(res.message);
      return res.data as Travel["id"];
    } catch (error) {
      throw new Error();
    }
  }

  public static async travelHistory({
    pageParam = 1,
  }: {
    pageParam?: number;
  }): Promise<PaginatedResponse<Travel>> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`passenger/history?page=${pageParam}`, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data as PaginatedResponse<Travel>;
    } catch (error) {
      throw new Error();
    }
  }
}

export default PassengerService;
