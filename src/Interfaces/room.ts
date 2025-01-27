export interface room {
    /* name of the room */
    name: string;
    /*whether the room is the current room shown or not */
    choosen: boolean;
    /*dimensions of the room, so total width and height borders*/
    title: string;
    description: string;
    width: number;
    height: number;
}
