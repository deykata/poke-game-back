// TRANSACTIONS
export interface BattleDataDto {
    user: string;
    type: number;
    damage: number;
}


// RESPONSES
export interface ResponseBattleDto {
    // position: number;
    messageText: string;
}

export interface ResponseTypesDto {
    types: singleResponseType[];
}

export class singleResponseType {
    id: number;
    name: string;
    active: boolean;
    points: number;
    type: string;

    constructor(id: number, name: string, active: boolean, points: number, type: string) {
        this.id = id;
        this.name = name;
        this.active = active;
        this.points = points;
        this.type = type;
    }
}