import { environment } from "src/environments/environment";

export module Constant {
    export const Endpoint: String =`${environment.url}/films`;
    export const booking: String =`${environment.url}/bookings`;
}