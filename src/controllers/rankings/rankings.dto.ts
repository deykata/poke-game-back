// RESPONSES
export interface ResponseRankingDto {
    rankings: ResponseRankingItem[];
}

export class ResponseRankingItem {
    position: number;
    player: string;
    points: number;

    constructor(position: number, player: string, points: number) {
        this.position = position;
        this.player = player;
        this.points = points;
    }
}