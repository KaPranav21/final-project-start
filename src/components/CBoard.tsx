/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from "react";
import { useDrop, DragSourceMonitor, DragObjectWithType } from "react-dnd";
import FurnitureItem from "./ItemTransformer";
import type { Tile } from "./card";

import "./styles.css";
import TileItem from "./ItemTransformer";
import { tileBedSquare } from "./data";
import { Button } from "react-bootstrap";
import { RevealAnswer } from "./RevealAnswer";
import { resolveModuleName } from "typescript";

interface BoardContainItems {
    TilePartBoard: Tile[];
    moveTile: (id: string, top: number, left: number) => void;
    addToCalend: (item: Tile, top: number, left: number) => void;
    removeFromCalend: (id: string) => void;
    width: number;
    height: number;
}

const Grid = ({
    TilePartBoard,
    moveTile,
    addToCalend,
    removeFromCalend,
    width,
    height
}: BoardContainItems) => {
    const [, drop] = useDrop({
        accept: "Furniture",
        drop(item: unknown, monitor) {
            const i = item as Tile;
            const delta = monitor.getDifferenceFromInitialOffset() as {
                x: number;
                y: number;
            };

            const left = Math.round(i.left + delta.x);
            const top = Math.round(i.top + delta.y);

            if (i.id.includes("menu")) {
                addToCalend(i, left, top);
            } else {
                moveTile(i.id, left, top);
            }
            return null;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });
    return (
        <>
            <div id="days">
                <p>SUN MON TUE WED THU FRI SAT</p>
            </div>

            <div id="room-board">
                <div ref={drop} id="room">
                    {TilePartBoard.map((f: Tile) => (
                        <>
                            <TileItem
                                deleteTile={removeFromCalend}
                                key={f.id}
                                item={f}
                                width={width}
                                height={height}
                            />
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Grid;
