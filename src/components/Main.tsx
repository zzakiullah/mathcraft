"use client";

import Canvas from "./Canvas";
import Panel from "./Panel";

export default function Main() {
    return (
        <main className="flex flex-row w-screen">
            <Panel />
            <Canvas />
        </main>
    );
}
