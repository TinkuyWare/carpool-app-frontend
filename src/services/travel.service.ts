import type { Passenger } from "@interfaces/models/passenger.d.ts";
import { http } from "@utils/http";
import { getCookie } from "react-use-cookie";

class TravelService {
  public static async getTravelList(): Promise<GenericTravel[]> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`travel`, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data as GenericTravel[];
    } catch (error) {
      throw new Error();
    }
  }
  public static async getTravelPassengers(
    travelId: string
  ): Promise<Passenger[]> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`travel/${travelId}/passengers`, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data as Passenger[];
    } catch (error) {
      throw new Error();
    }
  }
}

export default TravelService;
