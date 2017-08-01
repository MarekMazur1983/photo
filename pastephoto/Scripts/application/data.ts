namespace Communication {
    export class Response {
        public status: Status;
        public error: Error;
    }
    export enum Status {
        OK,
        ERROR
    }
    export class Settings {
        public guid: string;
        public name: string;
        public gallery: number;
        public isPassword: boolean;
        public password: string;
        public isLifetime: boolean;
        public lifetime: number;
        public isWatermark: boolean;
        public isSelect: boolean;
        public select: number;
        public isComments: boolean;
        public isRatings: boolean;
        public isFb: boolean;
    }
    export class Image {
        public id: number;
        public filename: string;
        public comment: string;
        public selected: number;
        public rate: number;
        public guid: string;
    }
 
}
