namespace Communication {
    export class Response {
        public status: Status;
        public error: Error;
    }
    export enum Status {
        OK,
        ERROR
    }
 
}
