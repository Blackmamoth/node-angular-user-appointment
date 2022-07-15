export interface Appointment {
    id?: number,
    country_code: string,
    mobile_num: string,
    alternate_mobile_num: string,
    name: string,
    email: string,
    client_type: string,
    appointment_for: string,
    package_name: string,
    date_of_appointment: Date,
    error?: boolean,
    message?: string,
    npat_id?: number
}